import { Suspense, useEffect, useState } from 'react';
import { InputField } from "../../components/commonComponents/InputField"; // Assuming your InputField component is set up like this
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card'; // You can replace with your own Card and CardContent components

const UserCardSkeleton = () => (
  <div>Loading...</div>
);
const user = {
   name: "John Doe",
   image: "https://via.placeholder.com/400",
   bio: "Software Engineer with 5 years of experience in web development.",
   skills: ["React", "JavaScript", "CSS"],
 }

function StepOne ({ formValues, setFormValues, errors }){
   const [userDetails, setUserDetails] = useState(formValues);
    useEffect(() => {
      setUserDetails(formValues); // Update address if formValues change
     }, [formValues]);
   
     const handleChange = (field, value) => {
      setUserDetails((prev) => ({ ...prev, [field]: value }));
      setFormValues({ [field]: value });
    };  
   return (
<section className="mt-6 overflow-hidden">
    {/* <h1 className="text-black text-xl font-semibold mb-2">USer DETAILS</h1> */}

    <Suspense fallback={<UserCardSkeleton />}>
      <div>
        {/* First Card */}
        <Card className="w-full shadow-md rounded-lg border">
          {/* <p className="ml-4 mt-2 text-1xl mb-4">User Name</p> */}
          <CardContent className="mt-4 flex">
         
            {/* Profile Image */}
            <div className="flex-shrink-0 mt-4">
            
                <img
                  src={ user.image}
                  alt="icon"
                  className="w-40 h-40 rounded-lg border-2 border-black"
                />
                 <Button className="mt-4 ml-3">Upload Image</Button>
              </div>

            {/* Form Fields */}
            <form className="grid grid-cols-3 gap-4 w-full ml-8">
            
              {/* Name Field */}
              <div className="relative col-span-2">
                <InputField
                  id="name"
                  name={"name"}
                  type="text"
                  label="Name"
                  placeholder=" "
                  value={userDetails.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                  required
                />
                {errors.name && (
  <p className="text-red-500 text-xs">{errors.name?.message}</p>
)}
              </div>

              {/* ITS ID Field */}
              <div className="relative col-span-1">
                <InputField
                  id="itsId"
                  type="text"
                  name={"itsId"}
                  label="ITS-ID"
                  value={userDetails.itsId}
                    onChange={(e) =>
                      handleChange("itsId", e.target.value)
                    }
                  placeholder=" "
                  required
                />
                {errors.itsId && (
                  <p className="text-red-500 text-xs">{errors.itsId.message}</p>
                )}
              </div>

              {/* Jamiat Name Field */}
              <div className="relative col-span-1">
                <InputField
                  id="jamiatName"
                  type="text"
                  name={"jamiatName"}
                  label="Jamiat Name"
                  value={userDetails.jamiatName}
                    onChange={(e) =>
                      handleChange("jamiatName", e.target.value)
                    }
                  placeholder=" "
                  required
                />
                {errors.jamiatName && (
                  <p className="text-red-500 text-xs">{errors.jamiatName.message}</p>
                )}
              </div>

              {/* Jamaat Name Field */}
              <div className="relative col-span-1">
                <InputField
                  id="jamaatName"
                  type="text"
                  name={"jamaatName"}
                  label="Jamaat Name"
                  value={userDetails.jamaatName}
                    onChange={(e) =>
                      handleChange("jamaatName", e.target.value)
                    }
                  placeholder=" "
                  required
                />
                {errors.jamaatName && (
                  <p className="text-red-500 text-xs">{errors.jamaatName.message}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="relative col-span-1">
                <InputField
                  id="age"
                  type="text"
                  name={"age"}
                  label="Age"
                  value={userDetails.age}
                    onChange={(e) =>
                      handleChange("age", e.target.value)
                    }
                  placeholder=" "
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-xs">{errors.age.message}</p>
                )}
              </div>

              {/* Mobile No Field */}
              <div className="relative col-span-1 mb-6">
                <InputField
                  id="mobileNo"
                  type="text"
                  name={"mobileNo"}
                  label="Mobile No"
                  value={userDetails.mobileNo}
                    onChange={(e) =>
                      handleChange("mobileNo", e.target.value)
                    }
                  placeholder=" "
                  required
                  
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  </section>
   )
}


   
  


export default StepOne;
