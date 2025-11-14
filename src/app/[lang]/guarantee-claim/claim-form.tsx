"use client";

import BrandButton from "@/components/app/brand-button";
import FieldInput from "@/components/app/field-input";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  issues: z.string().min(10, "Issues are required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Guarantee__ClaimForm() {
  const refCaptcha = useRef<ReCAPTCHA>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const captchaToken = refCaptcha.current?.getValue();

    if (!captchaToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/mail-guarantee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, captchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your claim has been submitted successfully.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Failed to submit claim. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
    // >
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-20 flex flex-col lg:flex-row items-stretch gap-10 text-app-white">
        <div className="w-full lg:w-1/2 space-y-4 lg:space-y-8 ">
          <FieldInput
            id="name"
            label="Name"
            placeholder="Type your name here..."
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("name")}
            error={errors.name?.message}
          />
          <FieldInput
            id="email"
            label="Email"
            placeholder="Type your email here..."
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("email")}
            error={errors.email?.message}
          />
          <FieldInput
            id="phone"
            label="Phone Number"
            placeholder="Type your phone here..."
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FieldInput
            id="address"
            label="Address"
            placeholder="Type your address here..."
            classNameWrapper="text-app-white"
            className="border-app-white text-app-white focus:!border-app-white"
            required
            {...register("address")}
            error={errors.address?.message}
          />
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <FieldInput
              id="city"
              label="City"
              placeholder="Type your city here..."
              classNameWrapper="text-app-white"
              className="border-app-white text-app-white focus:!border-app-white"
              required
              {...register("city")}
              error={errors.city?.message}
            />
            <FieldInput
              id="postal_code"
              label="Postal Code"
              placeholder="Type your postal code here..."
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
            label="Issues"
            type="textarea"
            placeholder="Describe the issues here..."
            classNameWrapper="text-app-white flex-1 flex flex-col"
            className="border-app-white focus:!border-app-white bg-app-white flex-1 min-h-[400px]"
            required
            {...register("issues")}
            error={errors.issues?.message}
          />
        </div>
      </div>
      <div className="mt-4 lg:mt-8 space-y-4 lg:space-y-8">
        <ReCAPTCHA
          ref={refCaptcha}
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY_V2!}
        />
        <BrandButton className="btn-fill" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}{" "}
          &nbsp;&nbsp;&nbsp;SUBMIT&nbsp;&nbsp;&nbsp;
        </BrandButton>
      </div>
    </form>
    // </GoogleReCaptchaProvider>
  );
}
