// ==============================================================================
// [Unit IV: Database Integration - ORM Basics & Database Connectivity]
// [Unit IV: Database Integration - CRUD Operations, Data Validation, Environment Variables]
// ==============================================================================

import fs from "fs";
import path from "path";

// [Unit IV: Database Integration - Environment Variables]
// Reading connection and storage path from process.env
const DB_FILE = path.join(
  process.cwd(),
  process.env.DATABASE_PATH || "./data/scholarships.json"
);

// Initial Seed Data (Verified & Flagged listings)
const INITIAL_SCHOLARSHIPS = [
  {
    id: "sch-1",
    name: "PM-USP Central Sector Scheme of Scholarship",
    url: "https://scholarships.gov.in",
    organizationName: "Ministry of Education, Government of India",
    description: "Central Sector Scheme for college and university students from low-income families.",
    amount: "₹20,000 / year",
    deadline: "2026-12-31",
    eligibility: "Students above 80th percentile in Class XII board exams with family income < ₹4.5L.",
    contactEmail: "helpdesk-nsp@gov.in",
    applicationProcess: "Apply online through the National Scholarship Portal with DBT account details.",
    status: "verified",
    riskScore: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "sch-2",
    name: "NSF Graduate Research Fellowship",
    url: "https://www.nsfgrfp.org",
    organizationName: "National Science Foundation",
    description: "Supports outstanding graduate students pursuing research STEM degrees.",
    amount: "$37,000 / year",
    deadline: "2026-10-24",
    eligibility: "U.S. citizens or permanent residents enrolled in accredited graduate programs.",
    contactEmail: "info@nsfgrfp.org",
    applicationProcess: "Submit online portfolio, reference letters, and research statement.",
    status: "verified",
    riskScore: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "sch-3",
    name: "Global Academic Cash Giveaway (Flagged)",
    url: "http://192.168.1.100/grant.xyz",
    organizationName: "Global Council of Academic Affairs",
    description: "Guaranteed $50,000 grant! No qualifications required, wire transfer fee needed.",
    amount: "$50,000",
    deadline: "Immediate",
    eligibility: "Anyone with a bank account.",
    contactEmail: "awards9941@gmail.com",
    applicationProcess: "Wire $50 fee and provide SSN/PIN to release grant funds.",
    status: "flagged",
    riskScore: 92,
    createdAt: new Date().toISOString(),
  },
];

// Helper: Ensure data directory exists
function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_SCHOLARSHIPS, null, 2), "utf-8");
  }
}

// [Unit IV: Database Integration - Data Validation]
function validateScholarshipData(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 3) {
    errors.push("Scholarship name must be at least 3 characters.");
  }
  if (!data.organizationName || data.organizationName.trim().length < 2) {
    errors.push("Organization name is required.");
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

// [Unit IV: Database Integration - ORM Model / CRUD Operations]
export const ScholarshipDB = {
  // [Unit IV: CRUD Operations - READ (All)]
  async findAll() {
    ensureDb();
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  },

  // [Unit IV: CRUD Operations - READ (By ID)]
  async findById(id) {
    ensureDb();
    const items = await this.findAll();
    return items.find((item) => item.id === id) || null;
  },

  // [Unit IV: CRUD Operations - CREATE]
  async create(data) {
    ensureDb();
    const validation = validateScholarshipData(data);
    if (!validation.valid) {
      throw new Error(validation.errors.join(", "));
    }

    const items = await this.findAll();
    const newRecord = {
      id: `sch-${Date.now()}`,
      name: data.name.trim(),
      url: data.url || "",
      organizationName: data.organizationName.trim(),
      description: data.description || "",
      amount: data.amount || "Varies",
      deadline: data.deadline || "Open",
      eligibility: data.eligibility || "See listing",
      contactEmail: data.contactEmail || "",
      applicationProcess: data.applicationProcess || "",
      status: data.status || "pending_review",
      riskScore: data.riskScore ?? 0,
      createdAt: new Date().toISOString(),
    };

    items.unshift(newRecord);
    fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2), "utf-8");
    return newRecord;
  },

  // [Unit IV: CRUD Operations - UPDATE]
  async update(id, updates) {
    ensureDb();
    const items = await this.findAll();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2), "utf-8");
    return items[index];
  },

  // [Unit IV: CRUD Operations - DELETE]
  async delete(id) {
    ensureDb();
    const items = await this.findAll();
    const filtered = items.filter((i) => i.id !== id);
    if (filtered.length === items.length) return false;

    fs.writeFileSync(DB_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  },
};
