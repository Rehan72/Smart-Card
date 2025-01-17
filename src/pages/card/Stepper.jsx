import { motion } from "framer-motion";
import { MapPin, Package, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

const Stepper = ({ steps, currentStep, handleStepClick }) => {
  const stepIcons = [User, MapPin, Package];
  const iconSpacing = 48; // Spacing between icons

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/itc-smart/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ADD NEW CARD</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative flex items-center justify-between w-full mb-16 mt-6">
        {/* Background line */}
        <div
          className="absolute h-0.5 dark:bg-gray-600 bg-gray-300"
          style={{
            top: "30%",
            width: `calc(100% - ${iconSpacing}px)`,
            left: `${iconSpacing / 2}px`,
          }}
        ></div>

        {/* Progress line */}
        <motion.div
          className="absolute h-0.5 dark:bg-white bg-gray-600"
          style={{
            top: "30%",
            width: `calc(((100% - ${iconSpacing}px) / (${steps.length - 1})) * ${currentStep})`,
            left: `${iconSpacing / 2}px`,
          }}
          initial={{ width: 0 }}
          animate={{
            width: `calc(((100% - ${iconSpacing}px) / (${steps.length - 1})) * ${currentStep})`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></motion.div>

        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          const isActive = index <= currentStep;

          return (
            <motion.div
              key={index}
              className="relative z-10 flex flex-col items-center cursor-pointer"
              onClick={() => handleStepClick(index)}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step Icon */}
              <motion.div
                className={`grid w-12 h-12 font-bold rounded-full place-items-center transition-all duration-300 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-300 text-gray-900"
                }`}
                style={{
                  top: "30%",
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              {/* Step Text */}
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h6 className="font-sans text-sm font-semibold leading-relaxed text-gray-700 dark:text-white">
                  {step.label}
                </h6>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Stepper;
