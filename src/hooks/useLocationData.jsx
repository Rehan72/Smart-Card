import { useEffect, useState } from "react";

// Custom hook to fetch states and cities data
export const useLocationData = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);


  useEffect(() => {
   // Simulate fetching data (you can replace this with an API call)
   const fetchedStates = [
     { value: "CA", label: "California" },
     { value: "NY", label: "New York" },
     { value: "TX", label: "Texas" },
   ];
   setStates(fetchedStates);

   if (selectedState) {
    
     // Fetch cities based on selected state
     const fetchedCities = getCitiesForState(selectedState);
     setCities(fetchedCities);
   }
 }, [selectedState]);

 const getCitiesForState = (stateCode) => {
   // Return mock data for cities based on the selected state
   const citiesByState = {
     CA: [
       { value: "LA", label: "Los Angeles" },
       { value: "SF", label: "San Francisco" },
     ],
     NY: [
       { value: "NYC", label: "New York City" },
       { value: "BUF", label: "Buffalo" },
     ],
     TX: [
       { value: "DAL", label: "Dallas" },
       { value: "HOU", label: "Houston" },
     ],
   };

   return citiesByState[stateCode] || [];
 };
  // Fetch states data on component mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await fetch('/api/states'); // Replace with your actual API endpoint
//         const data = await response.json();
//         setStates(data);
//         setLoadingStates(false);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//         setLoadingStates(false);
//       }
//     };

//     fetchStates();
//   }, []);

//   // Fetch cities data based on selected state
//   useEffect(() => {
//     if (selectedState) {
//       const fetchCities = async () => {
//         setLoadingCities(true);
//         try {
//           const response = await fetch(`/api/cities?stateCode=${selectedState.value}`); // Replace with your actual API endpoint
//           const data = await response.json();
//           setCities(data);
//           setLoadingCities(false);
//         } catch (error) {
//           console.error("Error fetching cities:", error);
//           setLoadingCities(false);
//         }
//       };

//       fetchCities();
//     } else {
//       setCities([]); // Clear cities if no state is selected
//     }
//   }, [selectedState]);

  return {
   states,
   cities,
   selectedState,
   selectedCity,
   setSelectedState,
   setSelectedCity,
  };
};
