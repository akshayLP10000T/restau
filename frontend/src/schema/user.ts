import { z } from 'zod';

export const userRegisterSchema = z.object({
    fullName: z.string().min(1, "Full name required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least six characters"),
    contactNumber: z.string().min(10, "Contact number must be 10 digits"),
});

export type FormDataRegister = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least six characters"),
});

export type FormDataLogin = z.infer<typeof userLoginSchema>;