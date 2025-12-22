import z from "zod";

export const changePasswordSchema = (mustChangePassword = false) => z.object({
  currentPassword: mustChangePassword ? z.string().optional() : z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Minimum 08 characters password is required"),
  confirmNewPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Both passwords should match",
  path: ["confirmNewPassword"], // error will show under confirm password field
});

