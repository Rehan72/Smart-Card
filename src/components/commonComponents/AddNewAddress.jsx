
import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogTitle
} from "../../components/ui/dialog";
import { useLocationData } from "../../hooks/useLocationData";
import { getLiveLocation } from "../../lib/geoUtils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { InputField } from "./InputField";
import LocationSearch from "./LocationSearch";
import { SelectField } from "./SelectField";


function AddNewAddress({onLocationChange, showDialog, setShowDialog}) {
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
    // Fetch live location when the component mounts
  useEffect(() => {
   getLiveLocation()
     .then((loc) => setLocation(loc))
     .catch((error) => ("error", error));
 }, []);


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

 useEffect(() => {
   if (showDialog && !googleApi) {
     const loader = new GoogleMapsLoader({
       apiKey: "AIzaSyAWSfp11ay0zsj1xJ5aiNwZcZgz73CHTvs",
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

 const handlePlaceSelected = (newLocation) => {
   setLocation(newLocation);
   console.log(newLocation,"newLocation");
   
 };

 const handleSave = () => {
  // onLocationChange(location);
   onLocationChange({ location, selectedState, selectedCity });
   setShowDialog(false);
 };
// Handler to update the selected state
const handleSelectChange = (field, value) => {
   console.log("Selected State:", value);
   if (field === "selectedState") {
     setSelectedState(value); // Update the selected state
   }
 };

 const handleSelectCity = (field, value) => {
   console.log(value);
   
   setSelectedCity(value);
 };

  return (
   <Dialog open={showDialog} onOpenChange={setShowDialog}>
       <DialogContent className="max-w-4xl w-full h-auto bg-card scrollable-container">
        <DialogTitle>ADD NEW ADDRESS</DialogTitle>
        <div className="border-t border-black my-1"></div>
        {/* Location Search button */}
        <div className="mt-1">
          <LocationSearch onPlaceSelected={handlePlaceSelected} />
        </div>
        <Card className="w-full shadow-md rounded-lg border mt-4">
        <div id="google-map" className="w-full h-96"></div>
        </Card>
        
        {/* <Card className="w-full shadow-md rounded-lg border mt-6">
        <CardContent> */}
                <form className="grid grid-cols-3 gap-4 w-full mt-2">
                  {/* Address Line 1 Field */}
                  <div className="relative col-span-3 mt-6 ">
                    <InputField
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      label={"Address Line 1"}
                      placeholder=" "
                      required={true}
                      tabIndex={1}
                    />
                  </div>

                  {/* Address Line 2 Field */}
                  <div className="relative col-span-3 mt-2">
                    <InputField
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      label={"Address Line 2"}
                      placeholder=" "
                      required={true}
                      tabIndex={2}
                    />
                  </div>

                  {/* City Field */}
                  <div className="relative col-span-1 mb-6 mt-2">
                  <SelectField
                    id="city"
                    name="city"
                    label="Select State"
                    value={selectedCity} 
                    onChange={(e) =>
                      handleSelectCity("selectedCity", e.target.value)
                    } 
                    options={cities} 
                    required={true} 
                  />
                 </div>

                  {/* State Field */}
                  <div className="relative col-span-1 mb-6 mt-2">
                  <SelectField
                    id="state"
                    name="state"
                    label="Select State"
                    value={selectedState} 
                    onChange={(e) =>
                      handleSelectChange("selectedState", e.target.value)
                    } 
                    options={states} 
                    disabled={!selectedState}
                    required={true} 
                  />
                  </div>

                  <div className="relative col-span-1 mb-6 mt-2">
                    <InputField
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      label={"Postal Code"}
                      placeholder=" "
                      required
                    />
                  </div>
                </form>
              {/* </CardContent>
            </Card> */}
            <div className="border-t border-black my-1"></div>
        <div className="flex justify-end mt-6">
          <Button
          variant={"outline"}
            className="btn btn-outline"
            onClick={() => setShowDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="btn ml-4" onClick={handleSave}>
            ADD
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

AddNewAddress.propTypes = {
   initialLocation: PropTypes.shape({
     lat: PropTypes.number.isRequired,
     lng: PropTypes.number.isRequired,
   }),
   onLocationChange: PropTypes.func.isRequired,  // Now expects an object with location, selectedState, and selectedCity
   showDialog: PropTypes.bool.isRequired,
   setShowDialog: PropTypes.func.isRequired,
};

export default AddNewAddress