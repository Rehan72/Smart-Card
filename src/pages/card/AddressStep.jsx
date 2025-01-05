import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { useLocationData } from "../../hooks/useLocationData";
import AddressForm from "./AddressForm";

const AddressStep = ({ stepKey, formValues, setFormValues }) => {
  const [address, setAddress] = useState(formValues);
  const {
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
  } = useLocationData();


  useEffect(() => {
    setAddress(formValues); // Sync address with formValues
    console.log(states, cities, selectedState, selectedCity,"!!!!!!");
  }, [formValues]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    setFormValues((prev) => ({ ...prev, [stepKey]: { ...prev[stepKey], [field]: value } }));
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setFormValues((prev) => ({ ...prev, [stepKey]: { ...prev[stepKey], state: value } }));
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setFormValues((prev) => ({ ...prev, [stepKey]: { ...prev[stepKey], city: value } }));
  };

  return (
    <section className="mt-6 overflow-hidden">
      <Card className="w-full shadow-md rounded-lg border">
        <CardContent className="mt-4 flex">
          <AddressForm
            formValues={formValues[stepKey] || {}}
            setFormValues={(updatedValues) =>
              setFormValues((prev) => ({ ...prev, [stepKey]: updatedValues }))
            }
            states={states}
            cities={cities}
            selectedState={selectedState || ""} // Default to an empty string if null
            selectedCity={selectedCity || ""}
            handleStateChange={handleStateChange}
            handleCityChange={handleCityChange}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default AddressStep;
