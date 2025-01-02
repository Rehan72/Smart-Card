// StepTwo.tsx
import { Suspense, useEffect, useState } from "react";
import { InputField } from "../../components/commonComponents/InputField";
import { SelectField } from "../../components/commonComponents/SelectField";
import { Card, CardContent } from "../../components/ui/card";
import { useLocationData } from "../../hooks/useLocationData";
import UserCardSkeleton from "../../skeleton/UserCardSkeleton";

function StepTwo({ formValues, setFormValues, errors }) {
  // const [errors, setErrors] = useState({});
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
    setAddress(formValues); // Update address if formValues change
  }, [formValues]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    setFormValues({ [field]: value });
  };

  // Update the form data whenever state or city is changed
  const handleStateChange = (value) => {
    setSelectedState(value);
    // fetchCities(value); // Update cities when the state changes
    setFormValues({ selectedState: value}); // Reset city when state changes
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setFormValues({ selectedCity: value });
  };

  console.log(errors, "StepTow");

  return (
    <section className="mt-6 overflow-hidden">
      {/* <h1 className="text-black text-xl font-semibold mb-2">USer DETAILS</h1> */}

      <Suspense fallback={<UserCardSkeleton />}>
        <div>
          {/* First Card */}
          <Card className="w-full shadow-md rounded-lg border">
            {/* <p className="ml-4 mt-2 text-1xl mb-4">User Name</p> */}
            <CardContent className="mt-4 flex">
              <div className="grid grid-cols-3 gap-4 w-full ml-8">
                <div className="relative col-span-3 mt-6">
                  <InputField
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    label="Address Line 1"
                    value={address.addressLine1}
                    onChange={(e) =>
                      handleChange("addressLine1", e.target.value)
                    }
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                {/* Address Line 2 Field */}
                <div className="relative col-span-3 mt-2">
                  <InputField
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    label="Address Line 2"
                    value={address.addressLine2}
                    onChange={(e) =>
                      handleChange("addressLine2", e.target.value)
                    }
                  />
                  {errors.addressLine2 && (
                    <p className="text-red-500 text-sm">
                      {errors.addressLine2.message}
                    </p>
                  )}
                </div>

                {/* State Field */}
                <div className="relative col-span-1 mb-6 mt-2">
                  <SelectField
                    id="state"
                    name="state"
                    label="Select State"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    options={states}
                    required
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div className="relative col-span-1 mb-6 mt-2">
                  <SelectField
                    id="city"
                    name="city"
                    label="Select City"
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    options={cities}
                    required
                    disabled={!selectedState} // Disable city selection if no state is selected
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Postal Code Field */}
                <div className="relative col-span-1 mb-4 mt-1">
                  <InputField
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    label={"Postal Code"}
                    placeholder=" "
                    required={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </section>
  );
}

export default StepTwo;
