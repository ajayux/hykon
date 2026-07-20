"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormSubmitResponse from "../common/form-submitted-success";
import { commonValidations } from "@/lib/validtions";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useQuery } from "@tanstack/react-query";
import { API_URL, apiClient } from "@/lib/api/client";

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  phone: commonValidations.phone("Phone Number"),
  email: commonValidations.email,
  state: commonValidations.textBox("state"),
  place: commonValidations.textBox("place"),
  message: commonValidations.message,
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none";
const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 ";

export function GetInTouchForm({ slug, onClose }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const pageUrl = window.location.href;

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => apiClient("/states?slug=india").then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      state: "",
      place: "",
      message: "",
    },
  });
  async function onSubmit(data) {
    if (!executeRecaptcha) {
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("get_in_touch");
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("state", data.state);
      formData.append("place", data.place);
      formData.append("message", data.message || "");
      formData.append("captcha_key", recaptchaToken);
      formData.append("page_url", pageUrl);

      const res = await fetch(`${API_URL}/get-in-touch`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <FormSubmitResponse
        imagePath="/images/form-submitted-success.svg"
        title="Thank you for your message"
        description="Our team will get back to you as soon as possible."
        onClose={onClose}
      />
    );
  }

  return (
    <form
      id="career-app-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name" className="sr-only">
                Name*
              </FieldLabel>
              <Input
                {...field}
                placeholder="Name*"
                className={inputClasses}
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
        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">Phone*</FieldLabel>
              <Input
                {...field}
                placeholder="Phone*"
                className={inputClasses}
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
        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">Email*</FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="Email*"
                className={inputClasses}
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
        {/* State */}
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">State*</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting || statesLoading}
              >
                <SelectTrigger
                  className={cn(
                    inputClasses,
                    "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                  )}
                >
                  <SelectValue placeholder="State*" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {states?.map((opt) => (
                      <SelectItem key={opt?.slug} value={opt?.slug}>
                        {opt?.title || opt?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className={errorClass}
                />
              )}
            </Field>
          )}
        />

        {/* Place */}
        <div className="md:col-span-2">
          <Controller
            name="place"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="sr-only">Place*</FieldLabel>
                <Input
                  {...field}
                  placeholder="Place*"
                  className={inputClasses}
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

        {/* Message */}
        <div className="md:col-span-2">
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="sr-only">Message</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Message"
                  className={cn(
                    inputClasses,
                    "min-h-[60px] xl:min-h-[76px] 2xl:min-h-[90px] 3xl:min-h-[110px]",
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4 xl:mt-6 2xl:mt-8 3xl:mt-10">
        <Button
          type="submit"
          size="lg"
          variant="outline"
          className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[135px] 3xl:min-w-[160px] pl-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
          <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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
