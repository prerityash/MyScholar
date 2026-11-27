import { z } from "zod";

/**
 * Schema for User Registration
 */
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .max(60, "Name must not exceed 60 characters.")
    .optional()
    .default(""),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

/**
 * Schema for User Login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required."),
});

/**
 * Schema for Scholarship Verification Payload
 */
export const scholarshipInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Scholarship name must be at least 2 characters."),
  url: z
    .string()
    .trim()
    .optional()
    .default(""),
  organizationName: z
    .string()
    .trim()
    .optional()
    .default(""),
  description: z
    .string()
    .trim()
    .optional()
    .default(""),
  amount: z
    .string()
    .trim()
    .optional()
    .default(""),
  deadline: z
    .string()
    .trim()
    .optional()
    .default(""),
  eligibility: z
    .string()
    .trim()
    .optional()
    .default(""),
  contactEmail: z
    .string()
    .trim()
    .optional()
    .default(""),
  applicationProcess: z
    .string()
    .trim()
    .optional()
    .default(""),
});

/**
 * Helper to extract first readable error message from a ZodError
 */
export function formatZodError(error) {
  if (error && error.issues && error.issues.length > 0) {
    return error.issues[0].message;
  }
  return "Invalid submission data.";
}
