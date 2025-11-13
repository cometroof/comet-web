import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
  required?: boolean;
};

type InputProps = BaseProps & {
  type?: HTMLInputElement["type"];
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

type TextareaProps = BaseProps & {
  type: "textarea";
  rows?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows">;

type FieldInputProps = InputProps | TextareaProps;

export default function FieldInput({
  label,
  id,
  error,
  helperText,
  required = false,
  type = "text",
  className = "",
  classNameWrapper = "",
  fullHeight = false,
  ...props
}: FieldInputProps & { classNameWrapper?: string; fullHeight?: boolean }) {
  return (
    <div
      className={`flex flex-col w-full gap-3 text-app-gray ${classNameWrapper}`}
    >
      <Label htmlFor={id} className="gap-0.5">
        {label}
        {required && <span className="text-app-red">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={id}
          className={
            "rounded-none py-4 px-3 text-caption text-app-gray active:border-black focus-visible:ring-0 focus-visible:border-app-gray resize-none " +
            className
          }
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          type={type}
          id={id}
          className={
            "rounded-none py-4 px-3 text-caption text-app-gray h-[50px] active:border-black active:ring-0 focus-visible:ring-0 focus-visible:border-app-gray " +
            className
          }
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

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

// Contoh penggunaan Input:
// <FieldInput
//   label="Email"
//   id="email"
//   type="email"
//   placeholder="Email"
//   required
// />

// <FieldInput
//   label="Password"
//   id="password"
//   type="password"
//   placeholder="Password"
// />

// Contoh penggunaan Textarea:
// <FieldInput
//   type="textarea"
//   label="Deskripsi"
//   id="description"
//   placeholder="Tulis deskripsi..."
//   rows={4}
//   required
//   helperText="Minimal 10 karakter"
// />

// Dengan error:
// <FieldInput
//   type="textarea"
//   label="Pesan"
//   id="message"
//   placeholder="Tulis pesan..."
//   error="Pesan tidak boleh kosong"
// />
