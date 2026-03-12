"use client";

import * as React from "react";
import { useState } from "react";
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
import { Heading, Text } from "../utils/typography";
import Link from "next/link";
import FormSubmitResponse from "../common/form-submitted-success";
import { commonValidations } from "@/lib/validtions";
import { useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  phone: commonValidations.phone("Phone Number"),
  email: commonValidations.email,
  productCategory: commonValidations.dropDown("Product Category"),
  requirement: commonValidations.dropDown("Requirement"),
  attachment: commonValidations.file("pdf"),
  message: commonValidations.message,
});

const inputClasses =
  "text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] border-[#676767] rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none";
const errorClass =
  "text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 ";

export function ContactEnquiryForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [productCategory, setProductCategory] = useState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      productCategory: "",
      requirement: "",
      attachment: null,
      message: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("attachment", file);
      form.clearErrors("attachment");
    }
  };


  useEffect(()=>{
    fetchProductCategories()
  },[])

  const fetchProductCategories = async()=>{
    try {

     const {data} = await apiClient(`/get-product-category`)
      setProductCategory(data)
      } catch (error) {
      console.log(error)
    }
  }

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("attachment", null);
  };

  async function onSubmit(data) {
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("contact_enquiry");
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("product_category_id", data.productCategory || "");
      formData.append("requirement", data.requirement || "");
      formData.append("file", data.attachment);
      formData.append("message", data.message || "");
      formData.append("recaptcha_token", recaptchaToken);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/contact-enquiry`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
        toast.error("Failed to submit enquiry")
      }

      setIsSuccess(true);
      toast.success("Enquiry submitted successfully")
      form.reset();
      setUploadedFile(null);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to submit enquiry")
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <FormSubmitResponse
        imagePath="/images/form-submitted-success.svg"
        title="Registration Successful"
        description="Thank you for registering your product warranty. Our team will verify
            the details and update your warranty status shortly."
      />
    );
  }

  return (
    <form
      id="contact-enquiry-form"
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
        {/* Product Category */}
        <Controller
          name="productCategory"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">Product Category*</FieldLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className={cn(
                    inputClasses,
                    "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                  )}
                >
                  <SelectValue placeholder="Product Category*" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {
                      productCategory?.map(item =>(
                        <SelectItem key={item?.slug} value={item?.slug}>{item?.title}</SelectItem>
                      ))
                    }
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
        {/* Requirement */}
        <div className="md:col-span-2">
          <Controller
            name="requirement"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="sr-only">Requirement*</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={cn(
                      inputClasses,
                      "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                    )}
                  >
                    <SelectValue placeholder="Requirement*" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
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
      </div>

      {/* File Upload */}
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
              <span>Upload Your File (PDF, DOC, DOCX, JPG, PNG)</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between w-full h-[50px] xl:h-[75px] 2xl:h-[90px] 3xl:h-[110px] border-1 border-dashed border-white rounded-[6px] 3xl:rounded-[9px] px-6">
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
        {form.formState.errors.attachment && (
          <div className={errorClass}>
            {form.formState.errors.attachment.message}
          </div>
        )}
      </div>

      {/* Message */}
      <Controller
        name="message"
        control={form.control}
        render={({ field }) => (
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
          </Field>
        )}
      />

      {/* Submit Button */}
      <div className="flex justify-end mt-4 xl:mt-8 2xl:mt-10 3xl:mt-12">
        <Button
          type="submit"
          size="lg"
          variant="outline"
          className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[135px] 3xl:min-w-[160px] pl-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
          <span className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
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
