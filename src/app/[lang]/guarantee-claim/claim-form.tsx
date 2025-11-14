"use client";

import BrandButton from "@/components/app/brand-button";
import FieldInput from "@/components/app/field-input";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { ParamsLang } from "../types-general";
import { GuaranteeDictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";

// Dynamic form schema based on dictionary
const createFormSchema = (dictionary: GuaranteeDictionary) =>
  z.object({
    name: z.string().min(1, dictionary.claim_form.validation.name_required),
    email: z.email(dictionary.claim_form.validation.email_invalid),
    phone: z.string().min(1, dictionary.claim_form.validation.phone_required),
    address: z
      .string()
      .min(1, dictionary.claim_form.validation.address_required),
    city: z.string().min(1, dictionary.claim_form.validation.city_required),
    postal_code: z
      .string()
      .min(1, dictionary.claim_form.validation.postal_code_required),
    issues: z
      .string()
      .min(10, dictionary.claim_form.validation.issues_min_length),
  });

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

interface ClaimFormProps {
  lang: ParamsLang["lang"];
  dictionary: GuaranteeDictionary;
}

function ClaimForm({ lang, dictionary }: ClaimFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formSchema = createFormSchema(dictionary);
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!executeRecaptcha) {
        setSubmitStatus({
          type: "error",
          message: dictionary.claim_form.captcha_error,
        });
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: "" });

      try {
        // Generate ReCaptcha token
        const captchaToken = await executeRecaptcha("guarantee_claim_submit");
        if (!captchaToken) {
          return setSubmitStatus({
            type: "error",
            message: dictionary.claim_form.captcha_error,
          });
        }
        const response = await fetch("/api/mail-guarantee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            captchaToken,
            currentPath: pathname,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus({
            type: "success",
            message: dictionary.claim_form.success_message,
          });
          reset();
        } else {
          setSubmitStatus({
            type: "error",
            message: result.message || dictionary.claim_form.error_message,
          });
        }
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message: dictionary.claim_form.generic_error,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, reset, dictionary],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="mt-20 flex flex-col lg:flex-row items-stretch gap-10 text-app-white">
        <div className="w-full lg:w-1/2 space-y-4 lg:space-y-8 ">
          <FieldInput
            id="name"
            label={dictionary.claim_form.name}
            placeholder={dictionary.claim_form.name_placeholder}
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("name")}
            error={errors.name?.message}
          />
          <FieldInput
            id="email"
            label={dictionary.claim_form.email}
            placeholder={dictionary.claim_form.email_placeholder}
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("email")}
            error={errors.email?.message}
          />
          <FieldInput
            id="phone"
            label={dictionary.claim_form.phone}
            placeholder={dictionary.claim_form.phone_placeholder}
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FieldInput
            id="address"
            label={dictionary.claim_form.address}
            placeholder={dictionary.claim_form.address_placeholder}
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("address")}
            error={errors.address?.message}
          />
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <FieldInput
              id="city"
              label={dictionary.claim_form.city}
              placeholder={dictionary.claim_form.city_placeholder}
              classNameWrapper="text-app-white"
              className="border-app-white text-app-white focus:!border-app-white"
              required
              {...register("city")}
              error={errors.city?.message}
            />
            <FieldInput
              id="postal_code"
              label={dictionary.claim_form.postal_code}
              placeholder={dictionary.claim_form.postal_code_placeholder}
              classNameWrapper="text-app-white"
              className="border-app-white text-app-white focus:!border-app-white"
              required
              {...register("postal_code")}
              error={errors.postal_code?.message}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex">
          <FieldInput
            id="issues"
            label={dictionary.claim_form.issues}
            type="textarea"
            placeholder={dictionary.claim_form.issues_placeholder}
            classNameWrapper="text-app-white flex-1 flex flex-col"
            className="border-app-white focus:!border-app-white bg-app-white flex-1 min-h-[400px]"
            required
            {...register("issues")}
            error={errors.issues?.message}
          />
        </div>
      </div>
      <div className="mt-4 lg:mt-8 space-y-4 lg:space-y-8">
        <p
          className={`text-sm ${
            submitStatus.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {submitStatus.message}
        </p>
        <BrandButton className="btn-fill" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}{" "}
          &nbsp;&nbsp;&nbsp;{dictionary.claim_form.submit_button}
          &nbsp;&nbsp;&nbsp;
        </BrandButton>
      </div>

      {submitStatus.type === "success" && (
        <div
          className={`absolute z-10 left-0 top-0 size-full bg-app-black text-app-white flex flex-col justify-center items-center gap-6 text-sm ${
            submitStatus.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          <CheckCircle className="size-10" />
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}

export default function Guarantee__ClaimForm({
  dictionary,
  lang,
}: {
  dictionary: GuaranteeDictionary;
  lang: ParamsLang["lang"];
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
    >
      <ClaimForm lang={lang} dictionary={dictionary} />
    </GoogleReCaptchaProvider>
  );
}
