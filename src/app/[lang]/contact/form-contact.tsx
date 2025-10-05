"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FieldInput from "@/components/app/field-input";
import FieldSelect from "@/components/app/field-select";
import { Dictionary } from "@/types/dictionary";
import { Button } from "@/components/ui/button";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  inquiry: z.string().min(1, { message: "Please select an inquiry type." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormContact({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission logic here
  };

  const handleRecaptchaChange = (token: string | null) => {
    // Store the token in state or a variable to send to the server
    console.log("reCAPTCHA token:", token);
  };
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-20 flex flex-col lg:flex-row items-start gap-14"
      >
        <div className="w-full lg:w-2/3 lg:max-w-[363px] space-y-6">
          <FieldInput
            id="name"
            label="Name"
            placeholder="Type your name here..."
            type="text"
            required
            {...register("name")}
            error={errors.name?.message}
          />
          <FieldInput
            id="email"
            label="E-Mail"
            placeholder="Type your email here..."
            type="email"
            required
            {...register("email")}
            error={errors.email?.message}
          />
          <FieldInput
            id="phone"
            label="Phone Number"
            placeholder="Type your phone number here..."
            type="text"
            required
            {...register("phone")}
            error={errors.phone?.message}
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
            label="Message"
            placeholder="Type your message here..."
            rows={1000}
            required
            className="min-h-[264px]"
            {...register("message")}
            error={errors.message?.message}
          />
          <div>
            <Button variant="app-secondary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </GoogleReCaptchaProvider>
  );
}
