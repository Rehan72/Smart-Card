import { Edit, Trash } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../components/commonComponents/InputField";
import { SelectField } from "../components/commonComponents/SelectField";
// import TopWidgetCard from "../components/commonComponents/TopWidgetCard";
import AddNewAddress from "../components/commonComponents/AddNewAddress";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import TopWidgetCardSkeleton from "../skeleton/TopCardSkeleton";
import UserCardSkeleton from "../skeleton/UserCardSkeleton";

const TopWidgetCard = lazy(() => import('../components/commonComponents/TopWidgetCard'))
function Dashboard() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectCity] = useState("");
  const [selectNewAddress,setSelectNewAddress]=useState('')
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState(null);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null); // Stores the address being edited
  const [editIndex, setEditIndex] = useState(null); // Stores the index of the address being edited

  // Function to handle card selection
  const handleCardSelect = (card) => {
    setSelectedCardDetails(card); // Update the selected card details
  };

  const [cards, setCards] = useState([
    { id: 1, selectedState: "", selectedCity: "" },
    { id: 2, selectedState: "", selectedCity: "" },
  ]);
  const user = {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    bio: "Software Engineer with 5 years of experience in web development.",
    skills: ["React", "JavaScript", "CSS"],
  };

  const fetchData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          { title: "Card 1", value: "100", icon: "/path/to/icon1.png" },
          { title: "Card 2", value: "200", icon: "/path/to/icon2.png" },
          { title: "Card 3", value: "300", icon: "/path/to/icon3.png" },
          { title: "Card 4", value: "100", icon: "/path/to/icon1.png" },
          { title: "Card 5", value: "200", icon: "/path/to/icon2.png" },
          { title: "Card 6", value: "300", icon: "/path/to/icon3.png" },
          { title: "Card 7", value: "100", icon: "/path/to/icon1.png" },
          { title: "Card 8", value: "200", icon: "/path/to/icon2.png" },
        ]);
      }, 2000)
    );
  
  const resource = {
    read: async () => {
      const data = await fetchData();
      return data;
    },
  };
 
  
  useEffect(() => {
    // Simulate data fetching delay
    resource.read().then((data) => {
      setData(data);
      
    });
     
  }, []);
 

  const stateData = [
    { value: "California", label: "California" },
    { value: "Texas", label: "Texas" },
    { value: "Florida", label: "Florida" },
    { value: "New York", label: "New York" },
    { value: "Illinois", label: "Illinois" },
  
  ];
  const cityData = [
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "San Diego", label: "San Diego" },
    { value: "Sacramento", label: "Sacramento" },
    { value: "Fresno", label: "Fresno" },
  
  ];
  // Handler to update the selected state
  const handleSelectChange = (field, value) => {
    console.log("Selected State:", value);
    if (field === "selectedState") {
      setSelectedState(value); // Update the selected state
    }
  };

  const handleSelectCity = (field, value) => {
    setSelectCity(value);
  };

  const handleChangeAddress=()=>{

setSelectNewAddress(true)
setIsDialogOpen(true)

  }


//   const handleLocationChange = (newAddress) => {
//   // Add new address to the previous addresses list
//   setDeliveryAddresses((prevAddresses) => [...prevAddresses, newAddress]);
//    console.log("Updated Location:", newAddress);
//    // Handle updated location in state or API calls
//  };

 // Handle Edit Icon Click
 const handleEditAddress = (index) => {
   setCurrentAddress(deliveryAddresses[index]);
   setEditIndex(index);
   setIsDialogOpen(true); // Open the dialog for editing
 };

 // Handle Delete Icon Click
 const handleDeleteAddress = (index) => {
   const updatedAddresses = [...deliveryAddresses];
   updatedAddresses.splice(index, 1);
   setDeliveryAddresses(updatedAddresses);
 };

  // Save Address (for both Add and Edit)
  const handleLocationChange = (newAddress) => {
   const updatedAddresses = [...deliveryAddresses];

   if (editIndex !== null) {
     // Update existing address
     updatedAddresses[editIndex] = newAddress;
   } else {
     // Add new address
     updatedAddresses.push(newAddress);
   }

   setDeliveryAddresses(updatedAddresses);
   setCurrentAddress(null);
   setEditIndex(null);
 };
 
  return (
    <>
      <div className="flex items-center justify-center ml-4 mr-4">
      {
         data?  <TopWidgetCard data={data} onCardSelect={handleCardSelect} />: <TopWidgetCardSkeleton />
      }
      {/* <Suspense fallback={<TopWidgetCardSkeleton />}>
  <TopWidgetCard data={data} onCardSelect={handleCardSelect} />
</Suspense> */}
        
      </div>
<div>
<Link to={"new-card"}>
   <Button className="mt-9 flex ">Add New Card</Button>
   </Link>
</div>
      <section className="mt-6 overflow-hidden ">
        <h1 className="text-black text-xl font-semibold mb-2">CARD DETAILS</h1>

        <Suspense fallback={<UserCardSkeleton/>}>
          <div className="">
            {/* First Card */}
            <Card className="w-full shadow-md rounded-lg border">
              <p className="ml-4 mt-2 text-1xl mb-4">User Name</p>
              <CardContent className="mt-4 flex">
                {/* Profile Image */}

                <img
                  src={user.image}
                  alt="icon"
                  className="w-50 h-50 p-4 mt-2 mr-6 rounded-lg  border-2 border-black ml-8"
                />

                {/* ITS ID and Name */}
                <form className="grid grid-cols-3 gap-4 w-full">
                  {/* Name Field */}
                  <div className="relative col-span-2">
                    <InputField
                      id="name"
                      type="text"
                      label="Name"
                      placeholder=" "
                      required
                      //className="peer w-full border-0 border-b-2 border-black bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* ITS ID Field */}
                  <div className="relative col-span-1">
                    <InputField
                      id="its-id"
                      type="text"
                      label="ITS-ID"
                      placeholder=" "
                      required
                    />
                  </div>

                  {/* Jamiat Name Field */}
                  <div className="relative col-span-1">
                    <InputField
                      id="jamiatName"
                      type="text"
                      label="Jamiat Name"
                      placeholder=" "
                      required
                    />
                  </div>

                  {/* Jamaat Name Field */}
                  <div className="relative col-span-1">
                    <InputField
                      id="jamaatName"
                      type="text"
                      label={"Jamaat Name"}
                      placeholder=" "
                      required
                    />
                  </div>

                  {/* Age Field */}
                  <div className="relative col-span-1">
                    <InputField
                      id="age"
                      type="text"
                      label={"Age"}
                      placeholder=" "
                      required
                    />
                  </div>

                  {/* Mobile No Field */}
                  <div className="relative col-span-1 mb-6">
                    <InputField
                      id="mobileNo"
                      type="text"
                      label={"Mobile No"}
                      placeholder=" "
                      required
                    />
                  </div>
                </form>
              </CardContent>
             
            </Card>

            {/* Second Card */}
            <Card className="w-full shadow-md rounded-lg border mt-6">
              <h1 className="text-black text-xl font-semibold mb-2 mt-4 ml-4">
                Permanent Address
              </h1>
              <CardContent>
                <form className="grid grid-cols-3 gap-4 w-full">
                  {/* Address Line 1 Field */}
                  <div className="relative col-span-3">
                    <InputField
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      label={"Address Line 1"}
                      placeholder=" "
                      required
                    />
                  </div>

                  {/* Address Line 2 Field */}
                  <div className="relative col-span-3">
                    <InputField
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      label={"Address Line 2"}
                      placeholder=" "
                      required={true} 
                    />
                  </div>

                  {/* City Field */}
                  <div className="relative col-span-1">
                    <SelectField
                      id="city"
                      name="city"
                      label="Select State"
                      value={selectedCity} // Controlled value
                      onChange={(e) =>
                        handleSelectCity("selectedCity", e.target.value)
                      } // On change handler
                      options={cityData} // Options to populate the select field
                      required={true}
                    />
                  </div>

                  {/* State Field */}
                  <div className="relative col-span-1">
                    <SelectField
                      id="state"
                      name="state"
                      label="Select State"
                      value={selectedState} // Controlled value
                      onChange={(e) =>
                        handleSelectChange("selectedState", e.target.value)
                      } // On change handler
                      options={stateData} // Options to populate the select field
                      required={true} // If required
                    />
                  </div>

                  {/* Postal Code Field */}
                  <div className="relative col-span-1">
                    <InputField
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      label={"Postal Code"}
                      placeholder=" "
                      required={true}
                    />
                  </div>
                  {/* Checkbox for Permanent Address */}
                  <div className="relative col-span-1 mt-4">
                    <Checkbox id="sameAsBilling" className="peer">
                      <span>Permanent address is same as billing address</span>
                      <Label
                        htmlFor="sameAsBilling"
                        className="text-sm text-black"
                      ></Label>
                    </Checkbox>
                  </div>
                  <div className="relative col-span-1 mt-4">
                    <Link>
                      <span className="text-sm text-black">
                        Hand Delivery From ITS Office
                      </span>
                    </Link>
                  </div>
                  <div className="relative col-span-1 mb-6 mt-4">
                    <div onClick={handleChangeAddress}>
                      <span  className="text-sm text-red-600 cursor-pointer">
                        Add New Address For Delivery
                      </span>
                      </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="w-full shadow-md rounded-lg border mt-6">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-black text-xl font-semibold">
                  Delivery Details
                </h2>
                <div className="flex space-x-4">
                  <Edit className="cursor-pointer text-blue-500" size={20} />
                  <Trash className="cursor-pointer text-red-500" size={20} />
                </div>
              </div>
              <CardContent>
                <form className="grid grid-cols-3 gap-4 w-full">
                  {/* Address Line 1 Field */}
                  <div className="relative col-span-3">
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
                  <div className="relative col-span-3">
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
                  <SelectField
                    id="city"
                    name="city"
                    label="Select State"
                    value={selectedCity} // Controlled value
                    onChange={(e) =>
                      handleSelectCity("selectedCity", e.target.value)
                    } // On change handler
                    options={cityData} // Options to populate the select field
                    required={true} // If required
                  />
                 

                  {/* State Field */}

                  <SelectField
                    id="state"
                    name="state"
                    label="Select State"
                    value={selectedState} // Controlled value
                    onChange={(e) =>
                      handleSelectChange("selectedState", e.target.value)
                    } // On change handler
                    options={stateData} // Options to populate the select field
                    required={true} // If required
                  />
                  

                  <div className="relative col-span-1 mb-6">
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
              </CardContent>
            </Card>

           {/* Render the list of Address Cards */}
<div className="mt-4 flex flex-wrap gap-4 justify-start">
  {deliveryAddresses.length > 0 ? (
    deliveryAddresses.map((address, index) => (
      <div key={index} className="flex items-center justify-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <Card key={index} className="cursor-pointer shadow-lg rounded-lg border-2 border-lightgray w-full">
          <CardContent key={index} className="flex items-center p-4 h-auto min-h-[200px]">
            <div className="flex flex-col w-full">
              {/* Title Section with Icons */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Delivery Address {index + 1}</h3>
                <div className="flex gap-4">
                  <Edit 
                    size={20} 
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditAddress(index)} // handleEditAddress function
                  />
                  <Trash 
                    size={20} 
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAddress(index)} // handleDeleteAddress function
                  />
                </div>
              </div>

              {/* Address Information */}
              <p className="text-sm"><strong>Address Line 1:</strong> {address.addressLine1}</p>
              <p className="text-sm"><strong>Address Line 2:</strong> {address.addressLine2}</p>
              <p className="text-sm"><strong>Postal Code:</strong> {address.postalCode}</p>
              <p className="text-sm"><strong>State:</strong> {address.state}</p>
              <p className="text-sm"><strong>City:</strong> {address.city}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    ))
  ) : (
    <p className="text-center text-lg text-gray-500">No addresses added yet.</p>
  )}
</div>

          </div>
        </Suspense>
      </section>

      {
         isDialogOpen? <AddNewAddress  onLocationChange={handleLocationChange}
          showDialog={isDialogOpen}
          setShowDialog={setIsDialogOpen} initialAddress={currentAddress} />:""
      }
    </>
  );
}

export default Dashboard;
