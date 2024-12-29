import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().superRefine((value, ctx) => {
      if (!value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required.",
        });
        return;
      }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format.",
        });
      }
    }),
    password: z.string().superRefine((value, ctx) => {
      if (!value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
        });
        return;
      }
      if (value.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 6 characters.",
        });
      }
      if (value.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must not exceed 20 characters.",
        });
      }
    }),
  });
  
