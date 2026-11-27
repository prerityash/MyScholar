// ============================================================
// In-memory database for scholarship verification reports
// ============================================================

import { analyzeScholarship } from "./analysis-engine";
import { DashboardStats, RedFlagCategory, ScholarshipRecord, VerificationReport } from "./types";

const store: ScholarshipRecord[] = [];

// Seed sample records so portal has data out-of-the-box
function seedDatabase() {
  if (store.length > 0) return;

  const samples = [
    {
      name: "Global Youth Leadership Financial Grant",
      url: "http://192.168.1.105/grant-claim.xyz",
      organizationName: "International Council of Global Students",
      description: "ACT NOW! YOU ARE A WINNER! We are giving away $50,000 to selected students! THIS IS NOT A SCAM! 100% GUARANTEED SCHOLARSHIP. Limited spots left! Don't miss out on this once in a lifetime free money opportunity!",
      amount: "$50,000",
      deadline: "Tonight at midnight",
      eligibility: "No GPA requirement, everyone qualifies! Open to all students.",
      contactEmail: "scholarshipawards99382@gmail.com",
      applicationProcess: "A small nominal processing fee of $49 is required via wire transfer or cryptocurrency to release your guaranteed grant funds. Please provide your Social Security number and bank account routing details for direct deposit.",
    },
    {
      name: "FastWebb Premier Collegiate Award",
      url: "https://apply.fastwebb-grants.buzz/entry",
      organizationName: "Federal Scholarship Board",
      description: "Exclusive offer for college students! Win guaranteed scholarship funds with no essay required. Hurry, deadline is tomorrow! Only 3 spots left.",
      amount: "$15,000",
      deadline: "Tomorrow",
      eligibility: "Any college student under 25",
      contactEmail: "grants-dept@yahoo.com",
      applicationProcess: "Pay a one-time registration fee of $25 via credit card. Provide full date of birth, driver's license number, and mother's maiden name for eligibility check.",
    },
    {
      name: "Pacific Regional Engineering Grant",
      url: "https://pacific-stem-fund.club/apply",
      organizationName: "A group of concerned engineers and anonymous donors",
      description: "STEM students may qualify for engineering support. Insert text here for guidelines. The foundation will allocate funds based on academic interests.",
      amount: "$150,000",
      deadline: "July 15, 2026",
      eligibility: "Engineering undergraduates",
      contactEmail: "admin@pacific-stem-fund.club",
      applicationProcess: "Submit application form online along with handling charge.",
    },
    {
      name: "Fulbright Foreign Student Program",
      url: "https://foreign.fulbrightonline.org/about/foreign-student-program",
      organizationName: "Fulbright Program / U.S. Department of State",
      description: "The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.",
      amount: "$30,000",
      deadline: "October 15, 2026",
      eligibility: "Completed undergraduate degree, strong academic standing, English proficiency",
      contactEmail: "fulbright@state.gov",
      applicationProcess: "Submit transcripts, letters of recommendation, and research statement through the official online portal. No fee required.",
    },
    {
      name: "National Science Foundation Graduate Fellowship",
      url: "https://www.nsfgrfp.org",
      organizationName: "National Science Foundation",
      description: "The NSF Graduate Research Fellowship Program recognizes and supports outstanding graduate students in NSF-supported STEM disciplines pursuing research-based master's and doctoral degrees.",
      amount: "$37,000",
      deadline: "October 24, 2026",
      eligibility: "U.S. citizens, nationals, or permanent residents pursuing research master's or PhD in STEM",
      contactEmail: "info@nsfgrfp.org",
      applicationProcess: "Online application submission including personal background statement, graduate research plan statement, and 3 reference letters via Research.gov. Free to apply.",
    },
  ];

  for (const s of samples) {
    const report = analyzeScholarship(s);
    store.push({
      id: report.id,
      input: s,
      report,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 5)).toISOString(),
    });
  }
}

seedDatabase();

/** Save a report and return its record. */
export function saveReport(report: VerificationReport): ScholarshipRecord {
  const record: ScholarshipRecord = {
    id: report.id,
    input: report.scholarship,
    report,
    createdAt: new Date().toISOString(),
  };
  store.unshift(record); // newest first
  return record;
}

/** Get all saved reports, newest first. */
export function getAllReports(): ScholarshipRecord[] {
  return [...store];
}

/** Get a single report by ID. */
export function getReportById(id: string): ScholarshipRecord | undefined {
  return store.find((r) => r.id === id);
}

/** Compute dashboard statistics. */
export function getDashboardStats(): DashboardStats {
  const totals = { safe: 0, caution: 0, suspicious: 0, dangerous: 0 };
  const flagCounts: Record<string, number> = {};

  for (const rec of store) {
    totals[rec.report.riskLevel]++;
    for (const f of rec.report.redFlags) {
      flagCounts[f.category] = (flagCounts[f.category] || 0) + 1;
    }
  }

  const topRedFlags = Object.entries(flagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({
      category: category as RedFlagCategory,
      count,
    }));

  return {
    totalAnalyzed: store.length,
    ...totals,
    recentReports: store.slice(0, 10).map((r) => r.report),
    topRedFlags,
  };
}
