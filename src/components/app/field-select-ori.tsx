import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FieldSelectProps {
  label: string;
  id: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FieldSelect({
  label,
  id,
  placeholder = "Pilih opsi...",
  options,
  value,
  onValueChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className,
}: FieldSelectProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={className}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
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
// const countryOptions = [
//   { value: "id", label: "Indonesia" },
//   { value: "my", label: "Malaysia" },
//   { value: "sg", label: "Singapore" },
//   { value: "th", label: "Thailand", disabled: true },
// ];
//
// <FieldSelect
//   label="Negara"
//   id="country"
//   placeholder="Pilih negara..."
//   options={countryOptions}
//   value={selectedCountry}
//   onValueChange={setSelectedCountry}
//   required
//   helperText="Pilih negara tempat tinggal"
// />
//
// Dengan error:
// <FieldSelect
//   label="Kota"
//   id="city"
//   placeholder="Pilih kota..."
//   options={cityOptions}
//   error="Kota wajib dipilih"
// />
