import { z } from "zod";
export const stepOneSchema = z.object({
 
  name: z.string().min(1, { message: "Name is required" }),  // Custom error message
   itsId: z.string().min(1, { message: "ITSID is required" }),
   jamiatName: z.string().min(1, { message: "Jamiat Name is required" }),
   jamaatName: z.string().min(1, { message: "Jamaat Name is required" }),
   age: z
     .number()
     .min(18, { message: "Age must be at least 18" })
     .max(100, { message: "Age must be less than 100" }),
   mobileNo: z
     .string()
     .regex(/^\d{10}$/, { message: "Mobile No must be 10 digits long" }),
   image: z
     .instanceof(File, { message: "Image is required" })
     .refine(file => file.size > 0, { message: "Please select a valid image file" }),
});

 // Step Two Schema (e.g., email validation)
const stepTwoSchema = z.object({
  addressLine1: z.string().min(1, "Address Line 1 is required"),
   addressLine2: z.string().min(1, "Address Line 2 is required"),
   city: z.string().min(1, "City is required"),
   state: z.string().min(1, "State is required"),
   postalCode: z.string().min(1, "Postal Code is required"),
 });
 
 // Step Three Schema (e.g., password validation)
 const stepThreeSchema = z.object({
   password: z.string().min(6, "Password must be at least 6 characters"),
 });
 
 // Combine all schemas in an array
 const stepSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
 
 export default stepSchemas;