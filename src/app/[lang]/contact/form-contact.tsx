"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FieldInput from "@/components/app/field-input";
import FieldSelect from "@/components/app/field-select";
import { ContactDictionary, CommonDictionary } from "@/types/dictionary";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useCallback, useState } from "react";
import BrandButton from "@/components/app/brand-button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  inquiry: z.string().min(1, { message: "Please select an inquiry type." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

function ContactForm({
  dictionary: { contact },
}: {
  dictionary: {
    contact: ContactDictionary;
    common: CommonDictionary;
  };
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      setIsSubmitting(true);

      try {
        // Generate ReCaptcha token
        const token = await executeRecaptcha("contact_form_submit");

        // Send form data along with recaptcha token to your API
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            recaptchaToken: token,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // Handle success
          console.log("Form submitted successfully", result);
          // Reset form or show success message
        } else {
          // Handle error
          console.error("Form submission failed", result);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-20 flex flex-col lg:flex-row items-start gap-14"
    >
      <div className="w-full lg:w-2/3 lg:max-w-[363px] space-y-6">
        <FieldInput
          id="name"
          label={contact.form.name}
          placeholder={contact.form.namePlaceholder}
          type="text"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <FieldInput
          id="email"
          label={contact.form.email}
          placeholder={contact.form.emailPlaceholder}
          type="email"
          required
          {...register("email")}
          error={errors.email?.message}
        />
        <FieldInput
          id="phone"
          label={contact.form.phone}
          placeholder={contact.form.phonePlaceholder}
          type="text"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
        <FieldSelect
          id="inquiry"
          label={contact.form.selectInquiry}
          placeholder={contact.form.selectInquiry}
          options={[
            { label: contact.form.inquiryOptions.general, value: "general" },
            { label: contact.form.inquiryOptions.product, value: "products" },
            {
              label: contact.form.inquiryOptions.support,
              value: "technical-questions",
            },
            { label: contact.form.inquiryOptions.other, value: "other" },
          ]}
          value={watch("inquiry")}
          onValueChange={(value) =>
            setValue("inquiry", value, { shouldValidate: true })
          }
          required
          error={errors.inquiry?.message}
        />
      </div>
      <div className="w-full space-y-8">
        <FieldInput
          type="textarea"
          id="message"
          label={contact.form.message}
          placeholder={contact.form.messagePlaceholder}
          rows={1000}
          required
          className="min-h-[264px]"
          {...register("message")}
          error={errors.message?.message}
        />
        <div>
          <BrandButton type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="size-3 mr-1" />}
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </BrandButton>
        </div>
      </div>
    </form>
  );
}

export default function FormContact(props: {
  dictionary: {
    contact: ContactDictionary;
    common: CommonDictionary;
  };
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
    >
      <ContactForm {...props} />
    </GoogleReCaptchaProvider>
  );
}
