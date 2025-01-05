import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";

// Use React.forwardRef to forward the ref to the Input component
export const InputField = React.forwardRef(
  ({ id, name, value, onChange, label, required, className = "" }, ref) => {
    return (
      <div>
        <Input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          required={required}
          className={cn(
            "peer w-full border-0 border-b-2 border-black bg-transparent px-0 pt-3 text-black focus:border-black focus:outline-none focus:ring-0",
            className
          )}
          ref={ref} // Forward ref to the Input component
        />
        <Label
          htmlFor={id}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-1 peer-focus:text-xs peer-focus:text-black peer-valid:top-1 peer-valid:text-xs peer-valid:text-black"
        >
          {label} {required && <span className="text-red-600">*</span>}
        </Label>
      </div>
    );
  }
);

InputField.displayName = "InputField"; // Set display name for the component for easier debugging


