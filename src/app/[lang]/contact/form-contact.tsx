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
import { CheckCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

// Dynamic form schema based on dictionary
const createFormSchema = (dictionary: ContactDictionary) =>
  z.object({
    name: z.string().min(2, dictionary.form.validation.name_required),
    email: z.email(dictionary.form.validation.email_invalid),
    phone: z.string().min(10, dictionary.form.validation.phone_min_length),
    inquiry: z.string().min(1, dictionary.form.validation.inquiry_required),
    message: z.string().min(10, dictionary.form.validation.message_min_length),
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

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
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formSchema = createFormSchema(contact);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
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
        setSubmitStatus({
          type: "error",
          message: contact.form.messages.captcha_error,
        });
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: "" });

      try {
        // Generate ReCaptcha token
        const captchaToken = await executeRecaptcha("contact_form_submit");

        if (!captchaToken) {
          return setSubmitStatus({
            type: "error",
            message: contact.form.messages.captcha_failed,
          });
        }

        // Send form data along with recaptcha token to your API
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            captchaToken,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          trackEvent("web_comet_event", {
            screen_name: "Submit Contact Form: Success",
          });
          setSubmitStatus({
            type: "success",
            message: contact.form.messages.success_message,
          });
          reset();
        } else {
          trackEvent("web_comet_event", {
            screen_name: "Submit Contact Form: Error",
          });
          setSubmitStatus({
            type: "error",
            message: result.message || contact.form.messages.error_message,
          });
        }
      } catch {
        setSubmitStatus({
          type: "error",
          message: contact.form.messages.generic_error,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, reset, contact]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-10 lg:mt-20 flex flex-col lg:flex-row items-start gap-6 lg:gap-14"
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
          rows={5}
          required
          className="min-h-[264px]"
          {...register("message")}
          error={errors.message?.message}
        />
        <div className="space-y-4 pb-10">
          {submitStatus.message && (
            <p
              className={`text-sm ${
                submitStatus.type === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {submitStatus.message}
            </p>
          )}
          <BrandButton type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="size-3 mr-1 animate-spin" />}
            {isSubmitting ? "SUBMITTING..." : contact.form.submit}
          </BrandButton>
        </div>
      </div>

      {submitStatus.type === "success" && (
        <div className="absolute z-10 left-0 top-0 size-full bg-white flex flex-col justify-center items-center gap-6 text-sm text-green-700">
          <CheckCircle className="size-10" />
          {submitStatus.message}
        </div>
      )}
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
