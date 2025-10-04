import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  label?: string;
  id?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function CustomSelect({
  label,
  id,
  placeholder = "Select your inquiry",
  options,
  value,
  onChange,
  error,
  helperText,
  required = false,
  className = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled || disabled) return;

    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-app-red ml-1">*</span>}
        </label>
      )}

      <div ref={selectRef} className={`relative w-full ${className}`}>
        {/* Trigger */}
        <button
          type="button"
          id={id}
          onClick={toggleDropdown}
          disabled={disabled}
          // aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={`
          w-full px-4 py-3 text-left bg-white border border-app-gray
           flex items-center justify-between
          transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-app-gray  shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value, option.disabled)}
                className={`
                px-4 py-3 cursor-pointer transition-colors
                ${option.value === selectedValue ? "bg-app-red text-white" : "bg-white text-gray-700"}
                ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-app-red hover:text-white"}
              `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-sm text-app-red">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}

// Contoh penggunaan:
// const inquiryOptions = [
//   { value: "general", label: "General Inquiry" },
//   { value: "products", label: "Products" },
//   { value: "technical", label: "Technical Questions" },
//   { value: "other", label: "Other" },
// ];
//
// function App() {
//   const [inquiry, setInquiry] = useState("");
//
//   return (
//     <div className="p-8">
//       <CustomSelect
//         placeholder="Select your inquiry"
//         options={inquiryOptions}
//         value={inquiry}
//         onChange={setInquiry}
//       />
//     </div>
//   );
// }
