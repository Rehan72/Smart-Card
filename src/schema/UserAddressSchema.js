import { z } from "zod";

export const UserAddressSchema = z.object({
   addressLine1: z.string().min(1, "Address Line 1 is required"),
   addressLine2: z.string().min(1, "Address Line 2 is required"),
   city: z.string().min(1, "City is required"),
   state: z.string().min(1, "State is required"),
   postalCode: z.string().min(1, "Postal Code is required"),
 });
 