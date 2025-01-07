import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const InputField = React.forwardRef(
  ({ id, name, value, onChange, label, required, className = "",placeholder }, ref) => {
    return (
      <div className="relative">
        <Input
          id={id}
          name={name}
          type="text"
          value={value}
          //placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={cn(
    "peer w-full border-0 border-b-2 bg-transparent px-0 pt-3 text-black dark:text-white border-black dark:border-white focus:border-black dark:focus:border-white focus:outline-none focus:ring-0",
    className
  )}
          ref={ref} // Forward ref to the Input component
        />
        <Label
          htmlFor={id}
          className={cn(
            "absolute left-0 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-sm transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black dark:peer-placeholder-shown:text-white",
            "peer-focus:top-1 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white",
            "peer-valid:top-1 peer-valid:text-xs peer-valid:text-black dark:peer-valid:text-white"
          )}
        >
          {label} {required && <span className="text-red-600">*</span>}
        </Label>
      </div>
    );
  }
);

InputField.displayName = "InputField"; // Set display name for easier debugging
