import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../components/commonComponents/InputField";
import { SelectField } from "../../components/commonComponents/SelectField";
import { useLocationData } from "../../hooks/useLocationData";

const AddressForm = ({
  stepKey,
  formValues = {}, // Default to an empty object
  setFormValues,
  labels = {}, // Optional: Custom labels for fields
}) => {
  const {
    register,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext();
  
  const {
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
  } = useLocationData();

  const handleChange = (field, value) => {
    setValue(field, value); // Update react-hook-form state
    clearErrors(field); // Clear validation errors
    setFormValues((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value,
      },
    }));
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    handleChange("state", value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    handleChange("city", value);
  };


  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      [stepKey]:  {}, // Initialize if undefined
    }));
  }, [stepKey, setFormValues]);
   // Sync React Hook Form with formValues
   useEffect(() => {
      if (formValues?.[stepKey]) {
        reset(formValues[stepKey]); // Reset form with step values
      }
    }, [formValues, stepKey, reset]);

  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-500 text-sm">
         {errors[field]?.message}
      </p>
    );

  return (
    <div className="grid grid-cols-3 gap-4 w-full ml-8">
      <div className="relative col-span-3 mt-6">
        <InputField
          id="addressLine1"
          name="addressLine1"
          type="text"
          label="Address Line 1"
          {...register("addressLine1")}
          value={formValues?.[stepKey]?.addressLine1 || ""}
          //defaultValue={formValues?.[stepKey]?.addressLine1 || ""}
          onChange={(e) => handleChange("addressLine1", e.target.value)}
          required
        />
        {renderError("addressLine1")}
      </div>

      <div className="relative col-span-3 mt-2">
        <InputField
          id="addressLine2"
          name="addressLine2"
          type="text"
          label="Address Line 2"
          {...register("addressLine2")}
          value={formValues?.[stepKey]?.addressLine2 || ""}
          onChange={(e) => handleChange("addressLine2", e.target.value)}
          required
        />
        {renderError("addressLine2")}
      </div>

      <div className="relative col-span-1 mb-6 mt-2">
        <SelectField
          id="state"
          name="state"
          label={labels.state || "Select State"}
          value={selectedState || formValues?.[stepKey]?.state || ""}
          {...register("state")}
          onChange={(e) => handleStateChange(e.target.value)}
          options={states}
          required
        />
        {renderError("state")}
      </div>

      <div className="relative col-span-1 mb-6 mt-2">
        <SelectField
          id="city"
          name="city"
          label={labels.city || "Select City"}
          value={selectedCity || formValues?.[stepKey]?.city || ""}
          {...register("city")}
          onChange={(e) => handleCityChange(e.target.value)}
          options={cities}
          required
          disabled={!selectedState} // Disable if no state is selected
        />
        {renderError("city")}
      </div>

      <div className="relative col-span-1 mb-6 mt-2">
        <InputField
          id="postalCode"
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder={labels.postalCodePlaceholder || "Enter postal code"}
          {...register("postalCode")}
          value={formValues?.[stepKey]?.postalCode || ""}
          required
          onChange={(e) => handleChange("postalCode", e.target.value)}
        />
        {renderError("postalCode")}
      </div>
    </div>
  );
};

export default AddressForm;
