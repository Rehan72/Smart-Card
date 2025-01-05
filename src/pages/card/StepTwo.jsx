import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { useLocationData } from "../../hooks/useLocationData";
import AddressForm from "./AddressForm";

function StepTwo({ formValues, setFormValues, errors, }) {
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
  }, [formValues]);

 

  const handleStateChange = (value) => {
    setSelectedState(value);
    setFormValues({ state: value });
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setFormValues({ city: value });
  };

  return (
    <section className="mt-6 overflow-hidden">
      <Card className="w-full shadow-md rounded-lg border">
        <CardContent className="mt-4 flex">
          <AddressForm
          stepKey="stepTwo"
          formValues={formValues}
          setFormValues={setFormValues}
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
}

export default StepTwo;
