import * as z from "zod"

const stepOneSchema = z.object({
  name: z.string().nonempty("Name is required"),
  itsId: z.string().nonempty("ITS-ID is required"),
  jamiatName: z.string().nonempty("Jamiat Name is required"),
  jamaatName: z.string().nonempty("Jamaat Name is required"),
  age: z.string().nonempty("Age is required").transform(Number),
  mobileNo: z.string().nonempty("Mobile Number is required").min(10, "Mobile number must be at least 10 digits"),
})

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().min(1, "Address Line 2 is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1,"postalCode is required"),
})
const addressSchema2 = z.object({
   addressLine1: z.string().min(1, "Address Line 1 is required"),
   addressLine2: z.string().min(1, "Address Line 2 is required"),
   state: z.string().min(1, "State is required"),
   city: z.string().min(1, "City is required"),
   postalCode: z.string().min(1,"postalCode is required"),
 })

 const stepSchemas = [
  stepOneSchema,
  addressSchema,
  addressSchema2,
]

export default stepSchemas;