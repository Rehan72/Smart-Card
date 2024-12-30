import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
   Dialog,
   DialogContent,
   DialogTitle
} from "../../components/ui/dialog";
import { useLocationData } from "../../hooks/useLocationData";
import { getLiveLocation } from "../../lib/geoUtils";
import { UserAddressSchema } from "../../schema/UserAddressSchema";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { InputField } from "./InputField";
import LocationSearch from "./LocationSearch";
import { SelectField } from "./SelectField";

function AddNewAddress({ onLocationChange, showDialog, setShowDialog,initialAddress }) {
  const {
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
  } = useLocationData();

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [googleApi, setGoogleApi] = useState(null);
  const [errors, setErrors] = useState({});
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Fetch live location
  useEffect(() => {
    getLiveLocation()
      .then((loc) => setLocation(loc))
      .catch((error) => console.error("error", error));
  }, []);

  // Google Maps API setup
  useEffect(() => {
    if (showDialog && googleApi) {
      const mapElement = document.getElementById("google-map");
      if (!mapElement) return;

      const map = new googleApi.maps.Map(mapElement, {
        center: location,
        zoom: 15,
      });

      const marker = new googleApi.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });

      const handleDragEnd = (event) => {
        const newLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setLocation(newLocation);
      };

      marker.addListener("dragend", handleDragEnd);

      return () => {
        googleApi.maps.event.clearListeners(marker, "dragend");
      };
    }
  }, [showDialog, googleApi, location]);

  // Loading Google Maps API
  useEffect(() => {
    if (showDialog && !googleApi) {
      const loader = new GoogleMapsLoader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        version: "weekly",
      });

      loader
        .load()
        .then((google) => {
          setGoogleApi(google);
        })
        .catch((error) => console.error("Error loading map:", error));
    }
  }, [showDialog, googleApi]);

  // Field validation
  const validateField = (field, value) => {
    try {
      UserAddressSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  // Populate fields when editing
  useEffect(() => {
   if (initialAddress) {
     setAddressLine1(initialAddress.addressLine1 || "");
     setAddressLine2(initialAddress.addressLine2 || "");
     setPostalCode(initialAddress.postalCode || "");
     setSelectedState(initialAddress.state || "");
     setSelectedCity(initialAddress.city || "");
   }
 }, [initialAddress]);
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      addressLine1,
      addressLine2,
      postalCode,
      city: selectedCity,
      state: selectedState,
    };

    try {
      UserAddressSchema.parse(formData); // Validate all form data

      onLocationChange({
        location,
        addressLine1,
        addressLine2,
        postalCode,
        state: selectedState,
      city: selectedCity,
      });

      setShowDialog(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors); // Update the errors state
      }
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-4xl w-full h-auto bg-card scrollable-container" onInteractOutside={(event) => {
          // Prevent closing when clicking the overlay
          event.preventDefault();
        }}>
        <DialogTitle>ADD NEW ADDRESS</DialogTitle>
        <div className="border-t border-black my-1"></div>
        <LocationSearch onPlaceSelected={(newLocation) => setLocation(newLocation)} />
        <Card className="w-full shadow-md rounded-lg border mt-4">
          <div id="google-map" className="w-full h-96"></div>
        </Card>

        <form className="grid grid-cols-3 gap-4 w-full mt-2" onSubmit={handleSubmit} noValidate>
          {/* Address Line 1 */}
          <div className="relative col-span-3 mt-6">
            <InputField
              id="addressLine1"
              name="addressLine1"
              type="text"
              label="Address Line 1"
              value={addressLine1}
              onChange={(e) => {
                setAddressLine1(e.target.value);
                validateField("addressLine1", e.target.value);
              }}
              required
            />
            {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
          </div>

          {/* Address Line 2 */}
          <div className="relative col-span-3 mt-2">
            <InputField
              id="addressLine2"
              name="addressLine2"
              type="text"
              label="Address Line 2"
              value={addressLine2}
              onChange={(e) => {
                setAddressLine2(e.target.value);
                validateField("addressLine2", e.target.value);
              }}
              required
            />
            {errors.addressLine2 && <p className="text-red-500 text-sm">{errors.addressLine2}</p>}
          </div>

          {/* City Field */}
          <div className="relative col-span-1 mb-6 mt-2">
            <SelectField
              id="city"
              name="city"
              label="Select City"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                validateField("city", e.target.value);
              }}
              options={cities}
              required
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* State Field */}
          <div className="relative col-span-1 mb-6 mt-2">
            <SelectField
              id="state"
              name="state"
              label="Select State"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                validateField("state", e.target.value);
              }}
              options={states}
              disabled={!selectedState}
              required
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          {/* Postal Code */}
          <div className="relative col-span-1 mb-6 mt-2">
            <InputField
              id="postalCode"
              name="postalCode"
              type="text"
              label="Postal Code"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                validateField("postalCode", e.target.value);
              }}
              required
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
          </div>
        </form>

        <div className="border-t border-black my-1"></div>
         <div className="flex justify-end mt-6">
           <Button
             variant={"outline"}
             className="btn btn-outline"
             onClick={() => setShowDialog(false)}
           >
             Cancel
           </Button>
           <Button type="submit" className="btn ml-4" onClick={handleSubmit}>
             ADD
           </Button>
         </div>
      </DialogContent>
    </Dialog>
  );
}

AddNewAddress.propTypes = {
  onLocationChange: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  initialAddress:PropTypes.any
};

export default AddNewAddress;
