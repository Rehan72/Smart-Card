import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "../../context/Theme-Provider";
import { showToast } from "../../hooks/useToast";
import stepSchemas from "../../schema/stepSchemas";
import StepOne from "./StepOne";
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
  const [formValues, setFormValues] = useState({}); // store form values

  // Initialize React Hook Form
  const methods = useForm({
    defaultValues: formValues, // Use formValues as default
    resolver: zodResolver(stepSchemas[currentStep]), // Set schema for validation
    mode: "onChange",
  });

  const { handleSubmit, trigger, reset, getValues, formState: { errors } } = methods;

  // Handle next step logic
  const handleNext = async () => {
    const isValid = await trigger(); // Trigger validation
    if (!isValid) return;

    setFormValues((prev) => ({ ...prev, ...getValues() })); // Update form values in parent

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final Form Data:", { ...formValues, ...getValues() }); // Final submission
    }
  };

  // Handle back step logic
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    reset(formValues); // Reset to previous form values
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
        <form onSubmit={handleSubmit(handleNext)}>
          <div>
            {currentStep === 0 && <StepOne errors={errors} formValues={formValues} setFormValues={setFormValues}/>}
            {currentStep === 1 && <StepTwo errors={errors} formValues={formValues} setFormValues={setFormValues} />}
            {currentStep === 2 && <StepThree errors={errors} formValues={formValues} setFormValues={setFormValues} />}
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
