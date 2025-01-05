import { Suspense, useEffect, useState } from "react";
import { InputField } from "../../components/commonComponents/InputField";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useFormContext } from "react-hook-form";
import ImageUploader from "./ImageUploader";

const UserCardSkeleton = () => <div>Loading...</div>;

function StepOne({ formValues, setFormValues,validateImage }) {
  const { register, setValue, clearErrors, formState: { errors } } = useFormContext();
console.log(validateImage,"validateImage");
 const [showUploadImage, setShowUploadImage] = useState(false);
 const [uploadImage, setUploadedImage] = useState(null);
  const handleChange = (field, value) => {
    setValue(field, value); // Update react-hook-form state
    clearErrors(field); // Clear validation errors for the field
    setFormValues((prev) => ({ ...prev, [field]: value })); // Update parent form state
  };

  const handleUploadImage = () => {
    setShowUploadImage(true);
  }

  const handleImageUpload = (image) => {
    setUploadedImage(image); // Update the parent state with the uploaded image
    setFormValues((prev) => ({ ...prev, image: image }));
    console.log("Uploaded Image:", image.file.name);
  }
  useEffect(() => {
    if (formValues.image && !uploadImage) {
      setUploadedImage( formValues.image); // Restore image from formValues
    }
  }, [formValues.image]);

  return (
    <>
    
    <section className="mt-6 overflow-hidden">
      <Suspense fallback={<UserCardSkeleton />}>
        <div>
          <Card className="w-full shadow-md rounded-lg border">
            <CardContent className="mt-4 flex">
              <div className="flex-shrink-0 mt-4">
                <img
                  src={uploadImage?.preview || "https://via.placeholder.com/400"}
                  alt="Full Preview"
                  width={160}
                  height={160}
                 //  className="rounded-lg border-2 border-gray-300"
                 className={validateImage?"rounded-lg border-2 border-red-500":"rounded-lg border-2 border-gray-300 max-w-full max-h-screen"}
                />
                <Button onClick={handleUploadImage} className="mt-4 ml-3">Upload Image</Button>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full ml-8">
                {/* Name Field */}
                <div className="relative col-span-2">
                  <InputField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    {...register("name")}
                    value={formValues.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                  )}
                </div>

                {/* ITS ID Field */}
                <div className="relative col-span-1">
                  <InputField
                    id="itsId"
                    name="itsId"
                    type="text"
                    label="ITS-ID"
                    {...register("itsId")}
                    value={formValues.itsId || ""}
                    onChange={(e) => handleChange("itsId", e.target.value)}
                    required
                  />
                  {errors.itsId && (
                    <p className="text-red-500 text-xs">{errors.itsId.message}</p>
                  )}
                </div>

                {/* Jamiat Name Field */}
                <div className="relative col-span-1">
                  <InputField
                    id="jamiatName"
                    name="jamiatName"
                    type="text"
                    label="Jamiat Name"
                    {...register("jamiatName")}
                    value={formValues.jamiatName || ""}
                    onChange={(e) => handleChange("jamiatName", e.target.value)}
                    required
                  />
                  {errors.jamiatName && (
                    <p className="text-red-500 text-xs">{errors.jamiatName.message}</p>
                  )}
                </div>

                {/* Jamaat Name Field */}
                <div className="relative col-span-1">
                  <InputField
                    id="jamaatName"
                    name="jamaatName"
                    type="text"
                    label="Jamaat Name"
                    {...register("jamaatName")}
                    value={formValues.jamaatName || ""}
                    onChange={(e) => handleChange("jamaatName", e.target.value)}
                    required
                  />
                  {errors.jamaatName && (
                    <p className="text-red-500 text-xs">{errors.jamaatName.message}</p>
                  )}
                </div>

                {/* Age Field */}
                <div className="relative col-span-1">
                  <InputField
                    id="age"
                    name="age"
                    type="text"
                    label="Age"
                    {...register("age")}
                    value={formValues.age || ""}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs">{errors.age.message}</p>
                  )}
                </div>

                {/* Mobile No Field */}
                <div className="relative col-span-1 mb-6">
                  <InputField
                    id="mobileNo"
                    name="mobileNo"
                    type="text"
                    label="Mobile No"
                    {...register("mobileNo")}
                    value={formValues.mobileNo || ""}
                    onChange={(e) => handleChange("mobileNo", e.target.value)}
                    required
                  />
                  {errors.mobileNo && (
                    <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </section>

    {
      showUploadImage ? <ImageUploader
      onImageChange={handleImageUpload}
      showDialog={setShowUploadImage}
      setShowDialog={setShowUploadImage}
    />:''
    }
    </>
  );
}

export default StepOne;
