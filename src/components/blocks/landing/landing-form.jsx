"use client";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/typography";
import SuccessModal from "./success-modal";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  place: z.string().min(1, "Place is required"),
  message: z.string().optional(),
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white/60 w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[12px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export default function LandingForm({ onClose, slug }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      place: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    if (!executeRecaptcha) return;
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("landing_page_enquiry");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("place", data.place);
      formData.append("message", data.message || "");
      formData.append("captcha_key", recaptchaToken);
      formData.append("landing_page_slug", slug || "");

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/landing-page-enquiry`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const responseData = await res.json();
        throw new Error("Failed to submit enquiry");
      }

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full h-full p-[30px_20px] lg:p-[40px_30px] xl:p-[50px_40px] 2xl:p-[60px_50px] relative z-0 flex flex-col justify-center overflow-y-auto no-scrollbar bg-[#212121]">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 lg:top-8 lg:right-8 text-gray-500 hover:text-white transition-all p-2 z-50 bg-[#121212]/80 backdrop-blur-sm rounded-lg block lg:hidden"
        aria-label="Close form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 lg:h-8 lg:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <Heading
        as="h2"
        size="h2"
        className="text-white mb-[20px] lg:mb-[30px] xl:mb-[40px] 2xl:mb-[45px] 3xl:mb-[60px] max-w-[400px]"
      >
        Want to Learn More? Share Your info and we&apos;ll be in touch!
      </Heading>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-[10px] 2xl:gap-[15px]"
      >
        {[
          { name: "name", placeholder: "Name*" },
          { name: "phone", placeholder: "Phone*" },
          { name: "email", placeholder: "Email*", type: "email" },
          { name: "place", placeholder: "Place*" },
        ].map((item) => (
          <FormBlock
            key={item.name}
            item={item}
            form={form}
            isSubmitting={isSubmitting}
          />
        ))}

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel className="sr-only">Message</FieldLabel>
              <Textarea
                {...field}
                placeholder="Message"
                className={cn(
                  inputClasses,
                  "h-[85px] 2xl:h-[100px] 3xl:h-[125px] py-4 resize-none",
                )}
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className={errorClass}
                />
              )}
            </Field>
          )}
        />
        <div className="flex justify-end mt-4 xl:mt-6 2xl:mt-8 3xl:mt-10">
          <Button
            type="submit"
            size="lg"
            variant="outline"
            className="3xl:text-[22px] text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[135px] 3xl:min-w-[185px] pl-7"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
            <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-[35px] aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
              <Image
                src={"/images/icon-arrow-right-white.svg"}
                alt={"icon-arrow-right-white"}
                width={18}
                height={13}
                className="w-1/2"
                unoptimized
              />
            </span>
          </Button>
        </div>
      </form>
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          if (onClose) onClose();
        }}
      />
    </div>
  );
}

function FormBlock({ item, form, isSubmitting }) {
  return (
    <Controller
      name={item.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel className="sr-only">{item.placeholder}</FieldLabel>
          <Input
            {...field}
            type={item.type || "text"}
            placeholder={item.placeholder}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className={errorClass} />
          )}
        </Field>
      )}
    />
  );
}
