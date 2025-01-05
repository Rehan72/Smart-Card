import React, { useEffect } from "react";
import { InputField } from "../../components/commonComponents/InputField";
import { SelectField } from "../../components/commonComponents/SelectField";
import { useFormContext } from "react-hook-form";

const AddressForm = ({
  stepKey,
  formValues = {}, // Default to an empty object if undefined
  states = [],
  cities = [],
  selectedState = "",
  selectedCity = "",
  setFormValues,
  handleStateChange,
  handleCityChange,
  labels = {}, // Optional: Custom labels for fields
}) => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  
console.log(stepKey,"stepKey");

  const handleChange = (field, value) => {
    setValue(field, value); // Update react-hook-form state
    clearErrors(field); // Clear validation errors for the field
    setFormValues((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    setValue("state", selectedState); // Sync selected state
    setValue("city", selectedCity); // Sync selected city
  }, [selectedState, selectedCity, setValue]);
console.log(states,cities,"++++");

  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-500 text-sm">{errors[field]?.message}</p>
    );

  return (
    <div className="grid grid-cols-3 gap-4 w-full ml-8">
      <div className="relative col-span-3 mt-6">
        <InputField
          id="addressLine1"
          name="addressLine1"
          type="text"
          label="Address Line 1"
          {...register("addressLine1")} // Register field with react-hook-form
          defaultValue={formValues?.addressLine1 || ""} // Use defaultValue for controlled input
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
          defaultValue={formValues?.addressLine2 || ""} // Use defaultValue for controlled input
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
          value={selectedState || formValues?.state || ""}
          {...register("state")}
          onChange={(e) => {
            handleStateChange(e.target.value);
            handleChange("state", e.target.value);
          }}
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
          value={selectedCity || formValues?.city || ""}
          {...register("city")}
          onChange={(e) => {
            handleCityChange(e.target.value);
            handleChange("city", e.target.value);
          }}
          options={cities}
          required
          //disabled={!selectedState} // Disable city selection if no state is selected
        />
        {renderError("city")}
      </div>

      <div className="relative col-span-1 mb-6 mt-2">
        <InputField
          id="postalCode"
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder={labels.postalCodePlaceholder || " "}
          {...register("postalCode")}
          defaultValue={formValues?.postalCode || ""} // Use defaultValue for controlled input
          required
          onChange={(e) => handleChange("postalCode", e.target.value)}
        />
        {renderError("postalCode")}
      </div>
    </div>
  );
};

export default AddressForm;
