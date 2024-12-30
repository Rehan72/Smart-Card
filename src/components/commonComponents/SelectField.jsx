import { cn } from "../../lib/utils";

export const SelectField = ({
  id,
  name,
  value,
  onChange,
  label,
  required = false,
  className = "",
  options = [],
}) => {
  return (
    <div className="relative col-span-1">
      <select
        id={id}
        name={name}
        value={value ?? ""} // Controlled by the parent component
        onChange={onChange}
        required={required}
        className={cn(
          "peer w-full border-0 border-b-2 border-black bg-transparent px-0 pt-3 text-sm text-black focus:border-black focus:outline-none focus:ring-0",
          className
        )}
      >
        <option disabled value="">{label} {required && <span className="text-red-600">*</span>}</option> 
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-1 peer-focus:text-xs peer-focus:text-black peer-valid:top-1 peer-valid:text-xs peer-valid:text-black"
      >
      </label>
    </div>
  );
};
