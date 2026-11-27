// ==============================================================================
// [Unit III: Forms and Server Actions - Server Actions ("use server")]
// [Unit III: Forms and Server Actions - Form Handling, Form Validation & Data Mutations]
// [Unit IV: Authentication and Authorization - Session Actions]
// ==============================================================================

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ScholarshipDB } from "@/lib/db";
import { authenticateUser, createSession, destroySession } from "@/lib/auth";

// [Unit III: Server Actions - User Login Form Action]
// [Unit IV: Authentication Concepts & Session Management]
export async function loginAction(prevState, formData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  // [Unit III: Form Validation]
  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  const user = await authenticateUser(username, password);
  if (!user) {
    return { error: "Invalid username or password. (Hint: admin / admin123 or student / student123)" };
  }

  await createSession(user);

  // [Unit I: Navigation - Server-side redirect after login]
  if (user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/scholarships");
  }
}

// [Unit III: Server Actions - User Logout Action]
export async function logoutAction() {
  await destroySession();
  redirect("/");
}

// [Unit III: Server Actions - Data Mutations (Add Scholarship Listing)]
// [Unit IV: Database Integration - CRUD Operations (Create)]
export async function createScholarshipAction(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const organizationName = formData.get("organizationName")?.toString().trim();
  const amount = formData.get("amount")?.toString().trim();
  const deadline = formData.get("deadline")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const eligibility = formData.get("eligibility")?.toString().trim();

  // [Unit III: Form Handling & Validation]
  if (!name || name.length < 3) {
    return { error: "Scholarship name must be at least 3 characters." };
  }
  if (!organizationName || organizationName.length < 2) {
    return { error: "Organization name is required." };
  }

  try {
    // [Unit IV: CRUD Operations - Create]
    await ScholarshipDB.create({
      name,
      organizationName,
      amount: amount || "₹10,000",
      deadline: deadline || "Ongoing",
      url: url || "",
      description: description || "No description provided.",
      eligibility: eligibility || "All qualified students.",
      status: "verified",
      riskScore: 0,
    });

    // [Unit II: Data Fetching - Caching and Revalidation]
    // Revalidate paths so fresh data displays immediately
    revalidatePath("/scholarships");
    revalidatePath("/admin");

    return { success: true, message: `Successfully added "${name}"!` };
  } catch (err) {
    return { error: err.message || "Failed to create scholarship." };
  }
}

// [Unit III: Server Actions - Data Mutations (Delete Scholarship Listing)]
// [Unit IV: Database Integration - CRUD Operations (Delete)]
export async function deleteScholarshipAction(id) {
  await ScholarshipDB.delete(id);
  // [Unit II: Caching and Revalidation]
  revalidatePath("/scholarships");
  revalidatePath("/admin");
}
