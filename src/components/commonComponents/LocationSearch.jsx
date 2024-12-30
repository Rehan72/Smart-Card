import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const LocationSearch = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); // State to manage input value

  useEffect(() => {
    let autocomplete;

    // Check if Google Maps and Places are loaded
    if (window.google && window.google.maps) {
      // Initialize Google Places Autocomplete
      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // Restrict to address types
      });

      // Event listener for place change (both keyboard and mouse)
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected place:", place); // Log selected place for debugging

        if (place.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          const formattedAddress = place.formatted_address || place.name;

          // Manually update input value after place selection
          setInputValue(formattedAddress);

          // Callback with the selected location
          onPlaceSelected(location);
        }
      });

      // Optional: Handle focus or click events to reset bounds for new search
      inputRef.current.addEventListener("focus", () => {
        autocomplete.setBounds(new window.google.maps.LatLngBounds()); // Reset bounds to allow suggestion retrieval
      });

      // Manually trigger a mouse click event to reset bounds
      inputRef.current.addEventListener("click", () => {
        autocomplete.setBounds(new window.google.maps.LatLngBounds());
      });
    }

    // Clean up listener when component unmounts
    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onPlaceSelected]);

  // Handle manual input changes in the field
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for a location"
      value={inputValue} // Bind input value to the state
      onChange={handleInputChange} // Update state on input change
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring"
    />
  );
};

LocationSearch.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
};

export default LocationSearch;
