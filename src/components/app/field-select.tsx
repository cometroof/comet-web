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

export default function FieldSelectOri({
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
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-app-red ml-1">*</span>}
      </Label>

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={
            "w-full rounded-none !py-3 !px-4 !h-[50px] focus-visible:ring-0 focus-visible:border-app-gray " +
            className
          }
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
        >
          <SelectValue className="h-[50px]" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-app-white border-foreground rounded-none !p-0 text-app-gray">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="p-4 rounded-none hover:!bg-app-red hover:!text-app-white"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
