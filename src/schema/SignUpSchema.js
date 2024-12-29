import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().nonempty("Name is required"),
  
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
  
  password: z
    .string()
    .superRefine((value, ctx) => {
      // Custom password validations
      if (!value.trim()) {
        
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
        });
        return;
      }
      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters.",
        });
      }
      if (!/[0-9]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 number.",
        });
      }
      if (!/[a-z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 lowercase letter.",
        });
      }
      if (!/[A-Z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 uppercase letter.",
        });
      }
    }),
});
