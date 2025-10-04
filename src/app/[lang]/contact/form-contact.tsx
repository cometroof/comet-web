"use client";

import FieldInput from "@/components/app/field-input";
import FieldSelect from "@/components/app/field-select";
import { Dictionary } from "@/types/dictionary";

export default function FormContact({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  return (
    <div className="mt-20  flex items-start gap-14">
      <div className="w-2/3 lg:max-w-[363px] space-y-6">
        <FieldInput
          id="name"
          label="Name"
          placeholder="Type your name here..."
          type="text"
          required
        />
        <FieldInput
          id="email"
          label="E-Mail"
          placeholder="Type your email here..."
          type="email"
          required
        />
        <FieldInput
          id="phone"
          label="Phone Number"
          placeholder="Type your phone number here..."
          type="text"
          required
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
          defaultValue=""
          placeholder="Type your message here..."
          rows={1000}
          required
          className="min-h-[264px]"
        />
      </div>
    </div>
  );
}
