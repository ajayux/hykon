"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormSubmitResponse from "../common/form-submitted-success";
import { commonValidations } from "@/lib/validtions";
import { API_URL } from "@/lib/api/client";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  email: commonValidations.email,
  phone: commonValidations.phone("Phone Number"),
  message: commonValidations.optionalString,
});

const labelClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white";

const inputClasses =
  "text-[15px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white/80 w-full h-[50px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-none dark:bg-none border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function BusinessContactForm({ activeTab, page }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("business_contact");

      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message || "");
      formData.append("recaptcha_token", recaptchaToken);

      const url = `${API_URL}/business-contact`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setIsSuccess(true);
      form.reset();
      toast.success("Contact request submitted successfully");
    } catch (error) {
      toast.error("Failed to submit contact request");
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <FormSubmitResponse
        imagePath="/images/form-submitted-success.svg"
        title="Request Submitted"
        description="Thank you for contacting us. Our team will get back to you shortly."
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5">
        {[
          { name: "fullName", placeholder: "Name" },
          { name: "phone", placeholder: "Phone" },
          { name: "email", placeholder: "Email", type: "email" },
        ].map((item) => (
          <FormBlock
            key={item.name}
            item={item}
            form={form}
            isSubmitting={isSubmitting}
          />
        ))}
        {/* Message */}
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">Message</FieldLabel>
              <Textarea
                {...field}
                placeholder="Message"
                className={cn(
                  inputClasses,
                  "min-h-[120px] xl:min-h-[140px] 2xl:min-h-[160px] 3xl:min-h-[180px] py-3",
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6 xl:mt-5 2xl:mt-6 3xl:mt-8">
        <Button
          type="submit"
          size="none"
          variant="outline"
          className="text-[16px] leading-none font-normal h-10 text-white min-w-[120px] px-2 pl-4 has-[>svg]:px-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
          <span className="w-7.5 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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
  );
}

function FormBlock({ item, form, isSubmitting, extraDisabled }) {
  return (
    <Controller
      name={item.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel className={cn(labelClasses, "sr-only")}>
            {item.placeholder}
          </FieldLabel>
          <div className="flex flex-col">
            <Input
              {...field}
              type={item.type || "text"}
              placeholder={item.placeholder}
              className={inputClasses}
              disabled={isSubmitting || extraDisabled}
            />
            {item.note && (
              <span className="text-[9px] xl:text-[10px] 3xl:text-[11px] text-white/50 mt-1.5 ml-1 inline-block">
                {item.note}
              </span>
            )}
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className={errorClass} />
          )}
        </Field>
      )}
    />
  );
}
