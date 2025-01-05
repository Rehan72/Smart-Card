import { z } from "zod";
export const stepOneSchema = z.object({
  image: z
    .instanceof(File, "Image is required")
    .refine((file) => file.size > 0, "Please select a valid image file"),
  name: z.string().trim().min(1, "Name is required"),
  itsid: z.string().trim().min(1, "ITSID is required"),
  jamiatName: z.string().trim().min(1, "Jamiat Name is required"),
  jamaatName: z.string().trim().min(1, "Jamaat Name is required"),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than 100"),
  mobileNo: z.string().regex(/^\d{10}$/, "Mobile No must be 10 digits long"),
});
