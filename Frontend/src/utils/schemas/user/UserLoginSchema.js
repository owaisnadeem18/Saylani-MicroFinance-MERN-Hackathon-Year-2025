import z from "zod"

export const userLoginSchema = z.object({
  email : z.string().email("Invalid Email Address") ,
  password: z.string().min(1 , "Password is Required") 
})