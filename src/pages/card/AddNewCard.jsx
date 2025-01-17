import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useTheme } from "../../context/Theme-Provider";
import { showToast } from "../../hooks/useToast";
import stepSchemas from "../../schema/stepSchemas";
import StepOne from "../card/StepOne";
import Stepper from "./Stepper";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const steps = [
  { label: "User Details" },
  { label: "Permanent Address" },
  { label: "Delivery Address" },
];

const StepperForm = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    stepTwo: {
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    postalCode: "",
  },
  stepThree: {
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    postalCode: "",
  },
  }); // store form values
const [validateImage ,setValidateImage] = useState(false)
const [isPending, setIsPending] = useState();
  
  // Initialize React Hook Form
  const methods = useForm({
    defaultValues: formValues, // Use formValues as default
    resolver: zodResolver(stepSchemas[currentStep]), // Set schema for validation
    mode: "onChange", // Validate on change
  });

  const {
    handleSubmit,
    trigger,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  console.log(errors, "errors in stepper form");
  
  // Handle next step logic
  const handleNext = async () => {
   debugger
    // Trigger validation for current step
    const isValid = await trigger(); 
    if (!isValid) {
      console.log("Validation errors:", errors); // Log errors if validation fails
      return;
    }
    if(currentStep===0){
      if(!formValues?.image && isValid){
        showToast("error","Please upload image");
        setValidateImage(true)
        console.log("Validation formValues:", formValues); // Log errors if validation fails
        return
      }
    }
    
 console.log(formValues,"Get all value");
 
    // Move to the next step if not on the last step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final Form Data:", { ...formValues, ...getValues() }); // Final form submission
      setIsPending(false)
    }
    // Log which step the call came from
    console.log(`handleNext called from: ${currentStep}`);
  };

  // Handle back step logic
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
   // reset(formValues); // Reset to previous form values
  };

  // Handle step click
  const handleStepClick = async (index) => {
    
    setFormValues((prev) => ({ ...prev, ...getValues() })); // Save current form values

    const isErrorsEmpty = Object.keys(errors).length === 0;
    if (isErrorsEmpty) {
      setCurrentStep(index);
    } else {
      showToast("error", "Please fill all the mandatory fields");
    }
  };

  console.log("formValues:", formValues); // Log errors if validation fails

  return (
    <div className="w-full px-10 py-4">
      {/* Stepper component */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        handleStepClick={handleStepClick}
        isDarkMode={theme}
      />

      <h2 className="text-2xl font-semibold text-gray-700 mb-6 dark:text-white">
        {steps[currentStep].label}
      </h2>

      {/* Form Provider */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleNext)} noValidate>
          <div>
            {currentStep === 0 && (
              <StepOne
                errors={errors}
                formValues={formValues}
                setFormValues={setFormValues}
                setError={setError} // Pass setError to StepOne
                clearErrors={clearErrors} // Pass clearErrors to StepOne
                validateImage={validateImage}
                
              />
            )}
            {currentStep === 1 && (
              <StepTwo
              errors={errors}
              formValues={formValues}
              setFormValues={setFormValues}
             // setFormValues={(updatedValues) => setFormValues(prev => ({ ...prev, stepTwo: updatedValues }))}
              setError={setError}
              clearErrors={clearErrors}
              />
            )}
            {currentStep === 2 && (
              <StepThree
              errors={errors}
              formValues={formValues}
              setFormValues={setFormValues}
             // setFormValues={(updatedValues) => setFormValues(prev => ({ ...prev, stepThree: updatedValues }))}
              setError={setError}
              clearErrors={clearErrors}
              />
            )}
          </div>

          <div className="flex justify-between mt-16">
            <Button
              type="button"
              onClick={handleBack}
              className={`select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg ${
                currentStep === 0 ? "hidden" : ""
              }`}
            >
              Prev
            </Button>
            <Button
              type="submit"
              className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
            >
              {isPending && <LoaderCircle className="animate-spin mr-2" />}
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepperForm;
