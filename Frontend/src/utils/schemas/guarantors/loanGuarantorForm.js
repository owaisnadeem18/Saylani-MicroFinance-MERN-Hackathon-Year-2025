import { z } from "zod";

// Guarantor schema for each individual guarantor
const guarantorSchema = z.object({
  Name: z.string().min(2, "Name is required"),
  CNIC: z
    .string()
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in 42201-1234567-1 format"),
  Email: z.string().email("Invalid email address"),
  Address: z.string().min(5, "Address is required"),
  Phone: z
    .string()
    .regex(/^03\d{9}$/, "Phone must be a valid Pakistani number, e.g., 03XXXXXXXXX"),
});

// Main form schema

export const userLoanGuarantorFormSchema = z.object({
  guarantors: z
    .array(guarantorSchema)
    .length(2, "Exactly two guarantors are required"),
});
