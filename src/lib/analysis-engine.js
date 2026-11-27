// ============================================================
// Scholarship Verification – Analysis Engine (JavaScript)
// ============================================================
// Context-aware heuristic engine that evaluates scholarship
// listings for common scam patterns while distinguishing legitimate
// disbursement requests (e.g., DBT, direct deposit) from fraudulent
// payment demands and data harvesting.
// ============================================================

let flagCounter = 0;
function nextId() {
  return `flag-${++flagCounter}-${Date.now()}`;
}

function flag(category, severity, title, description, evidence) {
  return { id: nextId(), category, severity, title, description, evidence };
}

// ── 1. Domain Analysis ──────────────────────────────────────

const TRUSTED_DOMAINS_AND_TLDS = [
  ".edu", ".gov", ".org", ".ac.",
  ".nic.in", ".gov.in", ".edu.in", ".ac.in", ".org.in", ".res.in",
  "scholarships.gov.in", "nsp.gov.in", "ugc.ac.in", "aicte-india.org",
];

const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".click", ".link", ".buzz", ".win", ".club",
  ".info", ".biz", ".tk", ".ml", ".ga", ".cf",
];

const TYPOSQUAT_TARGETS = [
  "scholarship", "scholarships", "fastweb", "collegeboard",
  "finaid", "unigo", "cappex", "chegg", "niche", "nspgov",
];

function analyzeDomain(url) {
  const flags = [];
  if (!url) return flags;

  let hostname = "";
  try {
    hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.toLowerCase();
  } catch {
    flags.push(
      flag("misleading_domain", "high", "Invalid URL",
        "The provided URL cannot be parsed as a valid web address.",
        `URL: ${url}`)
    );
    return flags;
  }

  // Check for suspicious TLDs
  if (SUSPICIOUS_TLDS.some((tld) => hostname.endsWith(tld))) {
    flags.push(
      flag("misleading_domain", "high", "Suspicious top-level domain",
        "The website uses a TLD commonly associated with low-cost, disposable domains used in scam campaigns.",
        `Domain: ${hostname}`)
    );
  }

  // Check if on a recognized institutional domain
  const isTrustedDomain = TRUSTED_DOMAINS_AND_TLDS.some((tld) => hostname.includes(tld));
  if (!isTrustedDomain) {
    flags.push(
      flag("misleading_domain", "low", "Non-institutional domain",
        "Legitimate scholarships are usually hosted on official institutional domains (.gov, .gov.in, .edu, .edu.in, .ac.in, .nic.in, or verified .org).",
        `Domain: ${hostname}`)
    );
  }

  // Typosquatting detection
  for (const target of TYPOSQUAT_TARGETS) {
    if (hostname.includes(target.slice(0, -1)) && !hostname.includes(target)) {
      flags.push(
        flag("misleading_domain", "critical", "Possible typosquatting",
          `The domain looks like a deliberate misspelling of "${target}", a recognized educational or scholarship portal.`,
          `Domain: ${hostname}`)
      );
    }
  }

  // Excessive subdomains
  const parts = hostname.split(".");
  if (parts.length > 3 && !hostname.endsWith(".gov.in") && !hostname.endsWith(".nic.in") && !hostname.endsWith(".ac.in")) {
    flags.push(
      flag("misleading_domain", "medium", "Excessive subdomains",
        "Multiple subdomains can be used to disguise the authentic hosting origin.",
        `Domain: ${hostname}`)
    );
  }

  // IP-based URL
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    flags.push(
      flag("misleading_domain", "critical", "IP-based URL",
        "The URL points to a raw IP address instead of an authenticated domain name – a severe phishing indicator.",
        `Host: ${hostname}`)
    );
  }

  // HTTP (no SSL)
  if (url.startsWith("http://")) {
    flags.push(
      flag("misleading_domain", "medium", "No HTTPS encryption",
        "The site does not use HTTPS, meaning submitted data is unencrypted.",
        `URL begins with http://`)
    );
  }

  return flags;
}

// ── 2. Payment / Fee Detection (with Disbursement Context Awareness) ──

const EXPLICIT_FEE_PATTERNS = [
  /\bapplication\s+fee\b/i,
  /\bprocessing\s+fee\b/i,
  /\bregistration\s+fee\b/i,
  /\bhandling\s+(?:fee|charge)\b/i,
  /\b(?:one[- ]?time|small|nominal|refundable)\s+fee\b/i,
  /\brequires?\s+(?:a\s+)?payment\b/i,
  /\bpay\s+(?:to\s+)?(?:apply|register|enroll|claim|receive|unlock)\b/i,
  /\bcredit\s+card\b/i,
  /\bdebit\s+card\b/i,
  /\bwire\s+transfer\b/i,
  /\bpaypal\b/i,
  /\bcrypto(?:currency)?\b/i,
  /\bbitcoin\b/i,
  /\b(?:send|remit)\s+\$?\d+/i,
  /\bmoney\s+order\b/i,
  /\bdeposit\s+(?:money|funds?|fee|fees?|amount)\s+(?:in|into|to)\s*(?:our|the|this)?\s*account/i,
  /\btransfer\s+(?:fee|charge|advance\s+payment)\b/i,
];

function isDisbursementContext(corpus) {
  const disbursementIndicators = [
    /bank\s+details?\s*(?:to|for)\s*(?:credit|transfer|receive|disbursement|direct\s+benefit\s+transfer|dbt|direct\s+deposit)/i,
    /(?:transfer|disburse|credit|deposit)\s+(?:the\s+)?(?:scholarship|amount|funds?|award|stipend)\s*(?:to|into|through)\s*(?:the\s+)?(?:student'?s?|applicant'?s?|your)?\s*bank\s*account/i,
    /academic,?\s*(?:and\s+)?personal\s*(?:and|,)\s*bank\s+details/i,
    /personal,?\s*academic\s*(?:and|,)\s*bank\s+details/i,
    /bank\s+(?:account|passbook|details)\s+of\s+the\s+(?:student|applicant|candidate)/i,
    /upload\s+(?:the\s+)?(?:bank\s+passbook|cancelled\s+cheque|bank\s+account\s+details)/i,
    /direct\s+benefit\s+transfer\b/i,
    /\bdbt\b/i,
    /one[- ]time\s+registration\s*\(?otr\)?/i,
    /national\s+scholarship\s+portal/i,
    /pm-usp/i,
    /central\s+sector\s+scheme/i,
  ];

  return disbursementIndicators.some((regex) => regex.test(corpus));
}

function analyzePayment(input) {
  const flags = [];
  const corpus = `${input.description || ""} ${input.applicationProcess || ""} ${input.eligibility || ""}`.toLowerCase();

  for (const pattern of EXPLICIT_FEE_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("payment_demand", "critical", "Payment or fee demand detected",
          "Legitimate scholarships never charge application, registration, or processing fees. Requiring payment to apply or claim an award is a primary scam indicator.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  return flags;
}

// ── 3. Fake Organization Detection ──────────────────────────

const KNOWN_LEGITIMATE_ORGS = [
  "national merit scholarship", "gates millennium", "fulbright",
  "rhodes scholarship", "pell grant", "national science foundation",
  "jack kent cooke", "coca-cola scholars", "elks national foundation",
  "rotary foundation", "united negro college fund", "chevening",
  "daad", "erasmus", "commonwealth scholarship",
  "national scholarship portal", "nsp", "pm-usp", "central sector scheme",
  "ministry of education", "department of higher education",
  "university grants commission", "ugc", "aicte",
  "inspire scholarship", "post matric scholarship", "pre matric scholarship",
  "national overseas scholarship", "ishan uday",
];

const FAKE_ORG_PATTERNS = [
  /\b(?:national|international|american|world|global|united)\s+(?:foundation|council|board|institute|academy|association)\s+(?:of|for)\s+\w+/i,
  /\bfederal\s+(?:scholarship|grant)\s+(?:board|commission|agency)\b/i,
];

const VAGUE_ORG_SIGNALS = [
  /\bour\s+organization\b/i,
  /\ba\s+group\s+of\s+(?:concerned|dedicated)\b/i,
  /\bwe\s+are\s+a\s+(?:non[- ]?profit|charity)\b/i,
  /\b(?:anonymous|unnamed)\s+(?:donor|benefactor)\b/i,
];

function analyzeOrganization(input) {
  const flags = [];
  const orgName = (input.organizationName || "").toLowerCase().trim();
  const corpus = `${input.name || ""} ${input.organizationName || ""} ${input.description || ""} ${input.applicationProcess || ""}`.toLowerCase();

  const isRecognizedLegitimate = KNOWN_LEGITIMATE_ORGS.some((o) => corpus.includes(o));

  if (orgName.length > 0 && !isRecognizedLegitimate) {
    for (const pattern of FAKE_ORG_PATTERNS) {
      if (pattern.test(orgName)) {
        flags.push(
          flag("fake_organization", "high", "Suspicious official-sounding organization name",
            "The organization name follows a pattern frequently used by fraudulent entities to mimic official authorities.",
            `Organization: "${input.organizationName}"`)
        );
        break;
      }
    }
  }

  if (!isRecognizedLegitimate) {
    for (const pattern of VAGUE_ORG_SIGNALS) {
      const match = corpus.match(pattern);
      if (match) {
        flags.push(
          flag("fake_organization", "medium", "Vague organization description",
            "The scholarship listing uses vague language about the awarding organization, which can indicate an unverified or fictitious entity.",
            `Matched: "${match[0]}"`)
        );
        break;
      }
    }
  }

  if (!orgName && !isRecognizedLegitimate) {
    flags.push(
      flag("fake_organization", "high", "No organization name provided",
        "Legitimate scholarships always clearly identify the sponsoring institution or government department.",
        "Organization name is empty")
    );
  }

  return flags;
}

// ── 4. Copied / Generic Content Detection ───────────────────

const GENERIC_PHRASES = [
  "this scholarship is open to all students",
  "we are giving away",
  "you have been selected",
  "congratulations you have won",
  "you are a winner",
  "this is not a scam",
  "100% legitimate",
  "guaranteed scholarship",
  "everyone qualifies",
  "no gpa requirement",
  "no essay required",
  "just fill out this simple form",
];

const PLACEHOLDER_PATTERNS = [
  /\blorem ipsum\b/i,
  /\binsert\s+(?:name|text|content)\s+here\b/i,
  /\bxxxxxxx/i,
  /\bcompany\s+name\b/i,
  /\b\[your\s+\w+\]/i,
  /\{(?:name|organization|amount|date)\}/i,
];

function analyzeContent(input) {
  const flags = [];
  const corpus = `${input.description || ""} ${input.applicationProcess || ""} ${input.eligibility || ""}`.toLowerCase();

  for (const phrase of GENERIC_PHRASES) {
    if (corpus.includes(phrase)) {
      flags.push(
        flag("copied_content", "high", "Generic scam phrase detected",
          "The description contains a boilerplate phrase commonly found in copy-pasted scam messages.",
          `Phrase: "${phrase}"`)
      );
    }
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("copied_content", "critical", "Placeholder / template text found",
          "The listing contains template placeholder text, indicating unverified or hastily generated content.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  const descTrim = (input.description || "").trim();
  if (descTrim.length > 0 && descTrim.length < 50) {
    flags.push(
      flag("copied_content", "medium", "Extremely short description",
        "The scholarship description is unusually brief, which is atypical of thorough educational programs.",
        `Description length: ${descTrim.length} characters`)
    );
  }

  return flags;
}

// ── 5. Suspicious Language & Data Harvesting Analysis ───────

const URGENCY_PATTERNS = [
  /\bact\s+(?:now|fast|quickly|immediately)\b/i,
  /\blimited\s+(?:spots?|slots?|seats?|openings?)\b/i,
  /\bhurry\b/i,
  /\bdon'?t\s+miss\s+(?:out|this)\b/i,
  /\b(?:last|final)\s+chance\b/i,
  /\bexpires?\s+(?:soon|today|tonight)\b/i,
  /\bonly\s+\d+\s+(?:spots?|slots?|positions?)\s+(?:left|remaining)\b/i,
  /\b(?:today|tonight)\s+only\b/i,
  /\bdeadline\s+(?:is\s+)?(?:today|tonight|tomorrow)\b/i,
  /\bonce\s+in\s+a\s+lifetime\b/i,
];

const PRESSURE_PATTERNS = [
  /\bguaranteed?\s+(?:award|approval|scholarship|grant)\b/i,
  /\bno\s+(?:strings?\s+)?attached\b/i,
  /\bfree\s+money\b/i,
  /\brisk[- ]?free\b/i,
  /\b100\s*%\s*guaranteed\b/i,
  /\bexclusive\s+(?:cash\s+)?offer\b/i,
];

const MALICIOUS_CREDENTIAL_PATTERNS = [
  /\b(?:bank|net\s*banking|online\s*banking|portal)\s+password\b/i,
  /\b(?:atm|card|transaction)\s+pin\b/i,
  /\bcvv\b/i,
  /\botp\b/i,
  /\b(?:mother'?s?|father'?s?)\s+maiden\s+name\b/i,
];

const SENSITIVE_ID_PATTERNS = [
  /\bsocial\s+security\s+(?:number|#|no\.?)\b/i,
  /\bssn\b/i,
];

function analyzeLanguage(input) {
  const flags = [];
  const corpus = `${input.description || ""} ${input.applicationProcess || ""} ${input.eligibility || ""}`.toLowerCase();
  const disbursementSafe = isDisbursementContext(corpus);

  for (const pattern of URGENCY_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("urgency_pressure", "high", "Urgency / pressure tactics",
          "The listing uses high-pressure language to rush applicants into acting without proper verification.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  for (const pattern of PRESSURE_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("suspicious_language", "high", "Too-good-to-be-true claims",
          "Phrases promising guaranteed awards or 'free money' are common hallmarks of fraudulent schemes.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  for (const pattern of MALICIOUS_CREDENTIAL_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("data_harvesting", "critical", "Sensitive banking credentials requested",
          "Legitimate scholarships NEVER request bank passwords, ATM PINs, CVVs, or OTPs. This indicates an active credential harvesting or phishing attempt.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  for (const pattern of SENSITIVE_ID_PATTERNS) {
    const match = corpus.match(pattern);
    if (match) {
      flags.push(
        flag("data_harvesting", "high", "Sensitive personal identifier requested",
          "The application requests sensitive identity numbers (e.g., SSN). While some official loan/aid portals require tax IDs, unfamiliar third-party portals should be verified cautiously.",
          `Matched: "${match[0]}"`)
      );
      break;
    }
  }

  if (!disbursementSafe) {
    const suspiciousBankMatch = corpus.match(/\b(?:provide|enter|submit)\s+(?:your\s+)?bank\s+(?:account|routing|details)\b/i);
    if (suspiciousBankMatch) {
      flags.push(
        flag("data_harvesting", "medium", "Bank details requested without disbursement context",
          "The listing asks for bank details without clearly defining direct benefit transfer or disbursement terms.",
          `Matched: "${suspiciousBankMatch[0]}"`)
      );
    }
  }

  const desc = input.description || "";
  const lettersOnly = desc.replace(/[^A-Za-z]/g, "");
  if (lettersOnly.length > 30) {
    const capsRatio = desc.replace(/[^A-Z]/g, "").length / lettersOnly.length;
    if (capsRatio > 0.5) {
      flags.push(
        flag("suspicious_language", "medium", "Excessive capitalization",
          "More than half the text is in ALL CAPS, a tactic frequently used to manufacture artificial urgency.",
          `CAPS ratio: ${(capsRatio * 100).toFixed(0)}%`)
      );
    }
  }

  const exclamationCount = (desc.match(/!/g) || []).length;
  if (exclamationCount > 4) {
    flags.push(
      flag("suspicious_language", "low", "Excessive exclamation marks",
        "An abnormally high number of exclamation marks can indicate sensationalized or scam-like communication.",
        `Count: ${exclamationCount} exclamation marks`)
    );
  }

  return flags;
}

// ── 6. Unrealistic Promises ─────────────────────────────────

function analyzeAmount(input) {
  const flags = [];
  const amountStr = (input.amount || "").replace(/[$,₹]/g, "").trim();
  const amount = parseFloat(amountStr);

  if (!isNaN(amount)) {
    if (amount > 200000) {
      flags.push(
        flag("unrealistic_promise", "high", "Unusually large scholarship amount",
          "While some international fellowships award large stipends, excessive lump sums from unknown organizations warrant extra scrutiny.",
          `Amount: ${input.amount}`)
      );
    }
  }

  const corpus = `${input.description || ""} ${input.amount || ""}`.toLowerCase();
  if (/\bunlimited\s+(?:funds?|money|grants?)\b/i.test(corpus) || /\bmillions?\s+in\s+cash\b/i.test(corpus)) {
    flags.push(
      flag("unrealistic_promise", "critical", "Unrealistic financial claims",
        "Claims of 'unlimited funds' or 'millions in free cash' are typical features of fraudulent lottery or grant schemes.",
        `Found in amount/description`)
    );
  }

  return flags;
}

// ── 7. Email Analysis ───────────────────────────────────────

function analyzeEmail(email) {
  const flags = [];
  if (!email) return flags;

  const lowerEmail = email.toLowerCase().trim();
  const freeProviders = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
    "aol.com", "mail.com", "protonmail.com", "yandex.com",
    "inbox.com", "zoho.com",
  ];
  const domain = lowerEmail.split("@")[1];
  if (domain && freeProviders.includes(domain)) {
    flags.push(
      flag("fake_organization", "medium", "Free email provider used",
        "Legitimate educational organizations and government portals use official institutional domains rather than free webmail providers (Gmail, Yahoo, etc.).",
        `Email domain: @${domain}`)
    );
  }

  if (/\d{4,}/.test(lowerEmail.split("@")[0])) {
    flags.push(
      flag("fake_organization", "low", "Randomized numeric email handle",
        "Email addresses with long numeric sequences are frequently auto-generated throwaway accounts.",
        `Email: ${email}`)
    );
  }

  return flags;
}

// ── Scoring & Report Assembly ───────────────────────────────

const SEVERITY_WEIGHTS = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 3,
};

/**
 * Computes risk / trust level based on score out of 100 (where 100 is cleanest).
 */
function computeRiskLevel(score) {
  if (score >= 85) return "safe";
  if (score >= 60) return "caution";
  if (score >= 35) return "suspicious";
  return "dangerous";
}

function buildSummary(level, flags, score) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  flags.forEach((f) => counts[f.severity]++);

  switch (level) {
    case "safe":
      return `Trust Score: ${score}/100. This scholarship listing appears legitimate. No significant red flags or predatory patterns were detected. Applicants should always confirm details on the official awarding portal.`;
    case "caution":
      return `Trust Score: ${score}/100. Minor concerns detected (${flags.length} flag${flags.length > 1 ? "s" : ""}). The listing may be genuine but has deductions for non-standard elements (such as third-party hosting or webmail contact) worth reviewing.`;
    case "suspicious":
      return `Trust Score: ${score}/100. Multiple fraud indicators detected (${flags.length} red flags, ${counts.critical + counts.high} high/critical). Substantial points were deducted due to suspicious domain, language, or vague credentials. Exercise heightened caution.`;
    case "dangerous":
      return `Trust Score: ${score}/100 (HIGH RISK). Severe fraud detected (${flags.length} red flags, ${counts.critical} critical). Critical scam indicators such as advance-fee demands, credential harvesting, or predatory guarantees caused heavy point deductions. Do NOT send money or account passwords.`;
  }
}

function buildRecommendations(level, flags) {
  const recs = [];
  const categories = new Set(flags.map((f) => f.category));

  if (categories.has("payment_demand")) {
    recs.push("Never pay any application, processing, or registration fee. Genuine scholarships are always free to apply.");
  }
  if (categories.has("data_harvesting")) {
    recs.push("Never disclose online banking passwords, ATM PINs, CVV, or OTPs. Real portals only need your account number and IFSC/routing code for disbursement.");
  }
  if (categories.has("misleading_domain")) {
    recs.push("Always verify the web domain. Look for official government (.gov, .gov.in, .nic.in) or university (.edu, .ac.in) URLs.");
  }
  if (categories.has("fake_organization")) {
    recs.push("Independently verify the sponsoring organization through government registers or official university financial aid directories.");
  }
  if (categories.has("urgency_pressure")) {
    recs.push("Be cautious of aggressive countdowns or demands to act immediately. Official schemes maintain structured application timelines.");
  }
  if (categories.has("copied_content")) {
    recs.push("Search the scholarship description online to check if the wording has been duplicated across known scam templates.");
  }

  recs.push("Verify unfamiliar schemes with your university financial aid office or official student welfare cell.");
  recs.push("Report fraudulent scholarship offers to national consumer protection agencies or cybercrime portals (e.g. cybercrime.gov.in or FTC).");

  return recs;
}

// ── Public API ──────────────────────────────────────────────

export function analyzeScholarship(input) {
  flagCounter = 0;

  const allFlags = [
    ...analyzeDomain(input.url),
    ...analyzePayment(input),
    ...analyzeOrganization(input),
    ...analyzeContent(input),
    ...analyzeLanguage(input),
    ...analyzeAmount(input),
    ...analyzeEmail(input.contactEmail),
  ];

  const categoryScores = {
    misleading_domain: 0,
    payment_demand: 0,
    fake_organization: 0,
    copied_content: 0,
    suspicious_language: 0,
    urgency_pressure: 0,
    data_harvesting: 0,
    unrealistic_promise: 0,
  };

  for (const f of allFlags) {
    categoryScores[f.category] = (categoryScores[f.category] || 0) + SEVERITY_WEIGHTS[f.severity];
  }

  // Base score starts at 100 points, deducting penalties for detected fraud patterns
  const rawPenalty = allFlags.reduce((sum, f) => sum + SEVERITY_WEIGHTS[f.severity], 0);
  const totalDeduction = Math.min(100, rawPenalty);
  const overallRiskScore = Math.max(0, 100 - totalDeduction);
  const riskLevel = computeRiskLevel(overallRiskScore);

  return {
    id: `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    scholarship: input,
    overallRiskScore,
    deductions: totalDeduction,
    riskLevel,
    redFlags: allFlags,
    categoryScores,
    summary: buildSummary(riskLevel, allFlags, overallRiskScore),
    recommendations: buildRecommendations(riskLevel, allFlags),
    verifiedAt: new Date().toISOString(),
  };
}
