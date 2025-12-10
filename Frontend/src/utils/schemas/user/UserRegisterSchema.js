import z from "zod";

// user register schema 

export const userRegisterSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters"), 
    cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format"),
    email: z.string().email("Invalid Email Address")
})   