import { z } from "zod";

export const userApplyLoanForm = z.object({
  category: z.string().min(1, "Loan category is required"),
  subcategory: z.string().min(1, "Loan subcategory is required"),
  loanAmount: z
  .string()
  .nonempty("Loan amount is required") // agar field empty ho
  .refine((val) => !isNaN(Number(val)), { message: "Loan amount must be a number" })
  .transform((val) => Number(val))
  .refine((val) => val >= 50000, { message: "Loan amount must be at least 50,000" }) ,
  loanPeriod: z
    .number({ invalid_type_error: "Loan period must be a number" })
    .positive("Loan period must be greater than 0")
});