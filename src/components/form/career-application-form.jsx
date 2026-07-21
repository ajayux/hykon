"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { X } from "lucide-react";
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
import { apiClient } from "@/lib/api/client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  phone: commonValidations.phone("Phone Number"),
  email: commonValidations.email,
  state: commonValidations.dropDown("State"),
  place: commonValidations.textBox("place"),
  experience: commonValidations.dropDown("Experience"),
  cv: commonValidations.cvUpload("cv"),
  coverLetter: commonValidations.optionalString,
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none";
const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 ";

export function CareerApplicationForm({ slug, onClose, onStatusChange }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => apiClient("/states?slug=india").then((r) => r.data),
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      state: "",
      place: "",
      experience: "",
      cv: null,
      coverLetter: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("cv", file);
      form.clearErrors("cv");
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("cv", null);
  };

  async function onSubmit(data) {
    if (!executeRecaptcha) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const recaptchaToken = await executeRecaptcha("career_application");
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("state", data.state);
      formData.append("place", data.place);
      formData.append("experience", data.experience);
      formData.append("resume", data.cv);
      formData.append("cover_letter", data.coverLetter || "");
      formData.append("career_slug", slug);
      formData.append("captcha_key", recaptchaToken);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/career-enquiry`, {
        method: "POST",
        body: formData,
      });


      const result = await res.json();

      if (!res.ok || !result.success) {
        setSubmitError(
          result?.message || "Failed to submit application. Please try again.",
        );
        if (onStatusChange) onStatusChange();
        return;
      }

      setIsSuccess(true);
      if (onStatusChange) onStatusChange();
      form.reset();
      setUploadedFile(null);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError("Failed to submit application. Please try again.");
      if (onStatusChange) onStatusChange();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <FormSubmitResponse
        imagePath="/images/form-submitted-success.svg"
        title="Your Application is Submitted"
        description="Thank you for applying. Our team will get in touch with you if your
        profile matches our requirements."
        onClose={onClose}
      />
    );
  }

  if (submitError) {
    return <FormSubmitResponse title={submitError} onClose={onClose} />;
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
                    {states.map((opt) => (
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
        {/* Experience */}
        <Controller
          name="experience"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">Experience*</FieldLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className={cn(
                    inputClasses,
                    "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                  )}
                >
                  <SelectValue placeholder="Experience*" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="0-1">0-1 Years</SelectItem>
                    <SelectItem value="1-3">1-3 Years</SelectItem>
                    <SelectItem value="3-5">3-5 Years</SelectItem>
                    <SelectItem value="5+">5+ Years</SelectItem>
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
      </div>

      {/* CV Upload */}
      <div className="relative flex flex-col gap-3">
        {!uploadedFile ? (
          <label className="flex flex-col items-center justify-center w-full h-[50px] xl:h-[75px] 2xl:h-[90px] 3xl:h-[110px] border border-dashed border-[#676767] rounded-[6px] 3xl:rounded-[9px] cursor-pointer hover:border-white transition-colors">
            <div className="text-[10px] lg:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-normal font-normal text-white flex items-center gap-3">
              <Image
                src="/images/icon-upload.svg"
                alt="Upload"
                width={20}
                height={20}
                className="w-[16px] xl:w-[20px] 2xl:w-[23px] 3xl:w-[28px] object-contain"
              />
              <span>Upload Your CV (PDF, DOC, DOCX)</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between w-full h-[50px] xl:h-[75px] 2xl:h-[90px] 3xl:h-[110px] border-1 border-dashed border-white/50 rounded-[6px] 3xl:rounded-[9px] px-6">
            <div className="text-[10px] lg:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-normal font-normal text-white truncate max-w-[80%]">
              {uploadedFile.name}
            </div>
            <button
              type="button"
              onClick={handleFileRemove}
              className="text-red-500 hover:text-red-400"
              disabled={isSubmitting}
            >
              <X className="size-4 xl:size-5" />
            </button>
          </div>
        )}
        {form.formState.errors.cv && (
          <div className={errorClass}>{form.formState.errors.cv.message}</div>
        )}
      </div>

      {/* Cover Letter */}
      <Controller
        name="coverLetter"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="sr-only">Cover Letter</FieldLabel>
            <Textarea
              {...field}
              placeholder="Cover Letter"
              className={cn(
                inputClasses,
                "min-h-[60px] xl:min-h-[76px] 2xl:min-h-[90px] 3xl:min-h-[110px]",
              )}
              disabled={isSubmitting}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className={errorClass} />
            )}
          </Field>
        )}
      />

      {/* Submit Button */}
      <div className="flex justify-end mt-4 xl:mt-6 2xl:mt-8 3xl:mt-10">
        <Button
          type="submit"
          size="lg"
          variant="outline"
          className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[135px] 3xl:min-w-[160px]"
          disabled={isSubmitting}
        >
          <span className="flex-1 text-center">
            {isSubmitting ? "Submitting..." : "Submit"}
          </span>
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
