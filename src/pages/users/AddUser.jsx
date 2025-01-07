import { motion } from "framer-motion"; // Import framer-motion
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { InputField } from "../../components/commonComponents/InputField";
import { SelectField } from "../../components/commonComponents/SelectField";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { CardContent } from "../../components/ui/card";
import { useLocationData } from "../../hooks/useLocationData";

function AddUser() {
  const {
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
  } = useLocationData();
  const [isPending, setIsPending] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    itsId: "",
    jamiatName: "",
    jamaatName: "",
    age: "",
    mobileNo: "",
    email: "",
    permanentAddressLine1: "",
    permanentAddressLine2: "",
    permanentPostalCode: "",
    currentAddressLine1: "",
    currentAddressLine2: "",
    currentPostalCode: "",
  });
  console.log(cities, "cities");

  // Use a single state object to manage both permanent and current address states and cities
  const [addressData, setAddressData] = useState({
    permanent: { state: "", city: "" },
    current: { state: "", city: "" },
  });

  const handleChange = (e) => {
   debugger
      const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleStateChange = (value) => {
    debugger;
    setSelectedState(value);
    handleChange("state", value);
  };

  const handleCityChange = (value) => {
    debugger;
    setSelectedCity(value);
    handleChange("city", value);
  };
  // Generalized function to handle state and city changes for both Permanent and Current addresses
  const handleAddressChange = (type, field, value) => {
    const updatedAddress = {
      ...addressData[type],
      [field]: value,
    };
    // Clear city if state changes
    if (field === "state") {
      // setSelectedState(value);
      handleStateChange(value);
      updatedAddress.city = ""; // Reset city when state changes
    } else {
      handleCityChange(value);
    }

    setAddressData({
      ...addressData,
      [type]: updatedAddress,
    });
  };

  // Helper function to get filtered cities based on selected state
  const getCitiesForState = (stateId) => {
    return cities.filter((city) => city.stateId === stateId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to API
    console.log(userData);
    setIsPending(false);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/its-smart/user"
              className="uppercase font-bold text-gray-700"
            >
              User
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="uppercase font-bold text-gray-700">
              Add User
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        className="w-full shadow-md rounded-lg border p-6 mt-10 bg-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="ml-4 mt-2 text-xl font-semibold text-gray-800 mb-4">
          User Information
        </p>
        <CardContent className="mt-4 flex">
          {/* Profile Image */}
          {/* <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={userData.image || "default-avatar.jpg"}
              alt="profile icon"
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
          </motion.div> */}

          {/* Form Fields */}
          <motion.form
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 w-full ml-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name Field */}
            <motion.div
              className="relative col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <InputField
                id="name"
                name="name"
                type="text"
                label="Full Name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </motion.div>

            {/* ITS ID Field */}
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <InputField
                id="its-id"
                name="itsId"
                type="text"
                label="ITS-ID"
                value={userData.itsId}
                onChange={handleChange}
                placeholder="Enter ITS ID"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="relative col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email@gmail.com"
                required
              />
            </motion.div>

            {/* Jamiat Name Field */}
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <InputField
                id="jamiatName"
                name="jamiatName"
                type="text"
                label="Jamiat Name"
                value={userData.jamiatName}
                onChange={handleChange}
                placeholder="Enter Jamiat Name"
                required
              />
            </motion.div>

            {/* Jamaat Name Field */}
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <InputField
                id="jamaatName"
                name="jamaatName"
                type="text"
                label="Jamaat Name"
                value={userData.jamaatName}
                onChange={handleChange}
                placeholder="Enter Jamaat Name"
                required
              />
            </motion.div>

            {/* Age Field */}
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <InputField
                id="age"
                name="age"
                type="number"
                label="Age"
                value={userData.age}
                onChange={handleChange}
                placeholder="Enter Age"
                required
              />
            </motion.div>

            {/* Mobile No Field */}
            <motion.div
              className="relative col-span-1 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <InputField
                id="mobileNo"
                name="mobileNo"
                type="text"
                label="Mobile No"
                value={userData.mobileNo}
                onChange={handleChange}
                placeholder="Enter Mobile No"
                required
              />
            </motion.div>

            {/* Permanent Address Fields */}
            <motion.h1
              className="ml-4 mt-2 text-xl font-semibold text-gray-800 mb-4 col-span-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Permanent Address
            </motion.h1>

            <motion.div
              className="relative col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <InputField
                id="permanentAddressLine1"
                name="permanentAddressLine1"
                type="text"
                label="Address Line 1"
                placeholder="Enter Permanent Address"
                value={userData.permanentAddressLine1}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <InputField
                id="permanentAddressLine2"
                name="permanentAddressLine2"
                type="text"
                label="Address Line 2"
                placeholder="Enter Permanent Address"
                value={userData.permanentAddressLine2}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <SelectField
                id="permanent-state"
                name="state"
                label="Select State"
                value={selectedState || addressData.permanent.state}
                onChange={(e) =>
                  handleAddressChange("permanent", "state", e.target.value)
                }
                options={states}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <SelectField
                id="permanent-city"
                name="city"
                label="Select City"
                value={selectedCity || addressData.permanent.city}
                onChange={(e) =>
                  handleAddressChange("permanent", "city", e.target.value)
                }
                options={cities}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <InputField
                id="permanentPostalCode"
                name="permanentPostalCode"
                type="text"
                label="Postal Code"
                placeholder={"Enter postal code"}
                //{...register("postalCode")}
                value={userData.permanentPostalCode || ""}
                required
                onChange={(e) =>
                  handleChange(e)
                }
              />
            </motion.div>

            {/* Current Address Fields */}
            <motion.h1
              className="ml-4 mt-2 text-xl font-semibold text-gray-800 mb-4 col-span-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              Current Address
            </motion.h1>

            <motion.div
              className="relative col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <InputField
                id="currentAddressLine1"
                name="currentAddressLine1"
                type="text"
                label="Address Line 1"
                placeholder="Enter Current Address"
                value={userData.currentAddressLine1}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <InputField
                id="currentAddressLine2"
                name="currentAddressLine2"
                type="text"
                label="Address Line 2"
                placeholder="Enter Current Address"
                value={userData.currentAddressLine2}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              <SelectField
                id="current-state"
                name="state"
                label="Select State"
                value={addressData.current.state}
                onChange={(e) =>
                  handleAddressChange("current", "state", e.target.value)
                }
                options={states}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <SelectField
                id="current-city"
                name="city"
                label="Select City"
                value={addressData.current.city}
                onChange={(e) =>
                  handleAddressChange("current", "city", e.target.value)
                }
                options={cities}
                required
              />
            </motion.div>
            <motion.div
              className="relative col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <InputField
                id="currentPostalCode"
                name="currentPostalCode"
                type="text"
                label="Postal Code"
                placeholder={"Enter postal code"}
                //{...register("postalCode")}
                value={userData.currentPostalCode || ""}
                required
                onChange={(e) =>
                  handleChange(e)
                }
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="col-span-3 mt-4 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.7 }}
            >
              <motion.button
                type="submit"
                className="px-6 py-3 text-white bg-black dark:bg-white dark:text-black rounded-lg focus:outline-none"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#00697C", // Slightly darker blue on hover
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.2 },
                }}
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" size={20} />
                ) : (
                  "Submit"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </CardContent>
      </motion.div>
    </>
  );
}

export default AddUser;
