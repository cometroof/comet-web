"use client";

import FieldInput from "@/components/app/field-input";
import FieldSelect from "@/components/app/field-select";

export default function FormContact() {
  return (
    <div className="mt-20  flex items-start gap-14">
      <div className="w-1/3 space-y-6">
        <FieldInput
          id="name"
          label="Name"
          placeholder="Type your name here..."
          type="text"
        />
        <FieldInput
          id="email"
          label="E-Mail"
          placeholder="Type your email here..."
          type="email"
        />
        <FieldInput
          id="phone"
          label="Phone Number"
          placeholder="Type your phone number here..."
          type="text"
        />
        <FieldSelect
          label="Inquiry"
          id="inquiry"
          placeholder="Select your inquiry"
          options={[
            { label: "General Inquiry", value: "general" },
            { label: "Products", value: "products" },
            {
              label: "Technical Questions",
              value: "technical-questions",
            },
            { label: "Other", value: "other" },
          ]}
          value={""}
          required
        />
      </div>
      <div className="w-full">
        <FieldInput
          type="textarea"
          id="message"
          label="Message"
          value=""
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
}
