// ============================================================
// Scholarship Verification Portal – Core Types
// ============================================================

/** Raw scholarship data submitted by the user for verification. */
export interface ScholarshipInput {
  name: string;
  url: string;
  organizationName: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string;
  contactEmail: string;
  applicationProcess: string;
}

/** Individual red-flag detected by the analysis engine. */
export interface RedFlag {
  id: string;
  category: RedFlagCategory;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  evidence: string;
}

export type RedFlagCategory =
  | "misleading_domain"
  | "payment_demand"
  | "fake_organization"
  | "copied_content"
  | "suspicious_language"
  | "urgency_pressure"
  | "data_harvesting"
  | "unrealistic_promise";

/** Aggregate verification report returned by the API. */
export interface VerificationReport {
  id: string;
  scholarship: ScholarshipInput;
  overallRiskScore: number;          // 0-100 (100 = maximum risk)
  riskLevel: "safe" | "caution" | "suspicious" | "dangerous";
  redFlags: RedFlag[];
  categoryScores: Record<RedFlagCategory, number>;
  summary: string;
  recommendations: string[];
  verifiedAt: string;                // ISO date-time
}
