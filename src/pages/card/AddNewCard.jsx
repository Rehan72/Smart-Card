import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "../../context/Theme-Provider";
import { showToast } from "../../hooks/useToast";
import stepSchemas from "../../schema/stepSchemas";
import StepOne from "../card/StepOne";
import Stepper from "./Stepper";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { stepOneSchema } from "../../schema/stepOneSchema";
import { z } from "zod";

const steps = [
  { label: "User Details" },
  { label: "Permanent Address" },
  { label: "Delivery Address" },
];

const StepperForm = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    stepTwo: {},
    stepThree: {}
  }); // store form values
const [validateImage ,setValidateImage] = useState(false)
 
  
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
  console.log("formValues:", formValues); // Log errors if validation fails
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
      debugger
      
      
      if(!formValues?.image && isValid){
        showToast("error","Please upload image");
        //showToast("success", "Login Successful!");
        setValidateImage(true)
        console.log("Validation formValues:", formValues); // Log errors if validation fails
        return
      }
    }
    
     // Update form values with the latest data from child components
  setFormValues((prev) => {
    const updatedFormValues = { ...prev, ...getValues() };
console.log(getValues(),"updatedFormValues");

    // Ensure shared fields between stepTwo and stepThree are updated
    if (currentStep === 1) {
      debugger
      updatedFormValues.stepThree = updatedFormValues.stepTwo; // Share data between stepTwo and stepThree
    }

    return updatedFormValues;
  });
    // Move to the next step if not on the last step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final Form Data:", { ...formValues, ...getValues() }); // Final form submission
    }
    // Log which step the call came from
    console.log(`handleNext called from: ${currentStep}`);
  };

  // Handle back step logic
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    reset(formValues); // Reset to previous form values
  };

  // Handle step click
  const handleStepClick = async (index) => {
    debugger
    setFormValues((prev) => ({ ...prev, ...getValues() })); // Save current form values

    const isErrorsEmpty = Object.keys(errors).length === 0;
    if (isErrorsEmpty) {
      setCurrentStep(index);
    } else {
      showToast("error", "Please fill all the mandatory fields");
    }
  };

  return (
    <div className="w-full px-10 py-4">
      {/* Stepper component */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        handleStepClick={handleStepClick}
        isDarkMode={theme}
      />

      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
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
              formValues={formValues.stepTwo}
              setFormValues={(updatedValues) => setFormValues(prev => ({ ...prev, stepTwo: updatedValues }))}
              setError={setError}
              clearErrors={clearErrors}
              />
            )}
            {currentStep === 2 && (
              <StepThree
              errors={errors}
              formValues={formValues.stepThree}
              setFormValues={(updatedValues) => setFormValues(prev => ({ ...prev, stepThree: updatedValues }))}
              setError={setError}
              clearErrors={clearErrors}
              />
            )}
          </div>

          <div className="flex justify-between mt-16">
            <button
              type="button"
              onClick={handleBack}
              className={`select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg ${
                currentStep === 0 ? "hidden" : ""
              }`}
            >
              Prev
            </button>
            <button
              type="submit"
              className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepperForm;
