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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { API_URL, apiClient } from "@/lib/api/client";

const formSchema = z.object({
  vendorName: commonValidations.name("Vendor Name"),
  contactPerson: commonValidations.name("Contact Person"),
  phone: commonValidations.phone("Phone Number"),
  mobileNumber: commonValidations.phone("Mobile Number"),
  emailAddress: commonValidations.email,
  street: commonValidations.dropDown("Street"),
  city: commonValidations.dropDown("City"),
  country: commonValidations.dropDown("Country"),
  state: commonValidations.dropDown("State"),
  postalCode: commonValidations.postalCode,
  website: commonValidations.optionalString,
  materialType: commonValidations.optionalString,
  gstin: commonValidations.requiredString("GSTIN"),
  annualTurnover: commonValidations.number,
  companyProfile: commonValidations.pdfUpload("Company Profile"),
  additionalComments: commonValidations.optionalString,
  referredBy: commonValidations.optionalString,
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function VendorRegistrationForm() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { data: countries = [], isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      apiClient("/country", { cache: "force-cache" }).then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24 * 30, // 24 hours — countries rarely change
    gcTime: 1000 * 60 * 60 * 24 * 30,
  });

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states", selectedCountry],
    queryFn: () =>
      apiClient(`/states?slug=${selectedCountry}`).then((res) => {
        return res.data;
      }),
    enabled: !!selectedCountry,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorName: "",
      contactPerson: "",
      phone: "",
      mobileNumber: "",
      emailAddress: "",
      street: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
      website: "",
      materialType: "",
      gstin: "",
      annualTurnover: "",
      companyProfile: null,
      additionalComments: "",
      referredBy: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("companyProfile", file);
      form.clearErrors("companyProfile");
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("companyProfile", null);
  };

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      const formData = new FormData();
      formData.append("name", data.vendorName);
      formData.append("contact_person_name", data.contactPerson);
      formData.append("phone", data.phone);
      formData.append("mobile", data.mobileNumber);
      formData.append("email", data.emailAddress);
      formData.append("street", data.street);
      formData.append("city", data.city);
      formData.append("country_id", data.country);
      formData.append("state_id", data.state);
      formData.append("pincode", data.postalCode);
      formData.append("website", data.website);
      formData.append("material_type", data.materialType);
      formData.append("gst", data.gstin);
      formData.append("annual_trun_over", data.annualTurnover);
      formData.append("comments", data.additionalComments);
      formData.append("referred_by", data.referredBy);

      if (data.companyProfile) {
        formData.append("file", data.companyProfile);
      }
      const res = await fetch(`${API_URL}/vendor-registration`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setIsSuccess(true);
      form.reset();
      setUploadedFile(null);
      setSelectedCountry(null);
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <FormSubmitResponse
        imagePath="/images/form-submitted-success.svg"
        title="Registration Successful"
        description="Thank you for your interest in becoming a Hykon vendor. Our team will review your profile and contact you if there's a requirement matching your services."
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-8 sm:mb-6 xl:mb-9.5 2xl:mb-11 3xl:mb-14">
        {[
          { name: "vendorName", placeholder: "Vendor Name*" },
          { name: "contactPerson", placeholder: "Contact Person*" },
          { name: "phone", placeholder: "Phone*" },
          { name: "mobileNumber", placeholder: "Mobile Number*" },
          {
            name: "emailAddress",
            placeholder: "Email Address*",
            type: "email",
          },
          { name: "street", placeholder: "Street*" },
          { name: "city", placeholder: "City*" },
          {
            name: "country",
            placeholder: "Country*",
            type: "select",
            options: countries,
            isLoading: countriesLoading,
            onValueChange: (value, fieldOnChange) => {
              fieldOnChange(value);
              setSelectedCountry(value);
              form.setValue("state", "");
            },
          },
          {
            name: "state",
            placeholder: "State/Provision/ Region*",
            type: "select",
            options: states,
            isLoading: statesLoading,
            disabled: !selectedCountry || statesLoading,
          },
        ].map((item) => (
          <FormBlock
            key={item.name}
            item={item}
            form={form}
            isSubmitting={isSubmitting}
          />
        ))}

        <div className="md:col-span-1">
          <FormBlock
            item={{ name: "postalCode", placeholder: "Postal/Zip Code*" }}
            form={form}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="md:col-span-2">
          <FormBlock
            item={{ name: "website", placeholder: "Website" }}
            form={form}
            isSubmitting={isSubmitting}
          />
        </div>

        {[
          { name: "materialType", placeholder: "Material Type" },
          { name: "gstin", placeholder: "GSTIN" },
          { name: "annualTurnover", placeholder: "Annual TurnOver In Rs Cr.*" },
        ].map((item) => (
          <FormBlock
            key={item.name}
            item={item}
            form={form}
            isSubmitting={isSubmitting}
          />
        ))}

        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <div className="relative flex flex-col gap-3">
            {!uploadedFile ? (
              <label className="flex flex-col items-center justify-center w-full h-[60px] xl:h-[110px] 2xl:h-[135px] 3xl:h-[160px] bg-[#252525] border border-dashed border-[#676767] rounded-[6px] 3xl:rounded-[9px] cursor-pointer hover:border-white transition-colors px-4">
                <div className="text-[10px] lg:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-tight font-normal text-white flex items-center gap-3">
                  <Image
                    src="/images/icon-upload.svg"
                    alt="Upload"
                    width={20}
                    height={20}
                    className="w-[16px] xl:w-[20px] 2xl:w-[23px] 3xl:w-[28px] object-contain"
                  />
                  <span>
                    Attach Company Profile
                    <br />
                    <small>
                      Kindly upload clear front view image/images of the
                      installed product (Maximum size: 5 MB)
                    </small>
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,application/pdf,application/msword"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between w-full h-[60px] xl:h-[110px] 2xl:h-[135px] 3xl:h-[160px] bg-[#252525] border border-dashed border-white rounded-[6px] 3xl:rounded-[9px] px-6">
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
            {form.formState.errors.companyProfile && (
              <div className={errorClass}>
                {form.formState.errors.companyProfile.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <FormBlock
            item={{
              name: "additionalComments",
              placeholder: "Additional Comments",
            }}
            form={form}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <FormBlock
            item={{ name: "referredBy", placeholder: "Referred By" }}
            form={form}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Register Button */}
      <div className="flex justify-end mt-4 xl:mt-6 2xl:mt-8 3xl:mt-10">
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

function FormBlock({ item, form, isSubmitting }) {
  return (
    <Controller
      name={item.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel className="sr-only">{item.placeholder}</FieldLabel>
          {item.type === "select" ? (
            <Select
              onValueChange={(value) =>
                item.onValueChange
                  ? item.onValueChange(value, field.onChange)
                  : field.onChange(value)
              }
              value={field.value}
              disabled={isSubmitting || item.disabled}
            >
              <SelectTrigger
                className={cn(
                  inputClasses,
                  "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                )}
              >
                <SelectValue
                  placeholder={item.placeholder}
                  disabled={isSubmitting || item.isLoading}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {item.options.map((opt) => (
                    <SelectItem key={opt.slug} value={opt.slug}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Input
              {...field}
              type={item.type || "text"}
              placeholder={item.placeholder}
              className={inputClasses}
              disabled={isSubmitting}
            />
          )}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className={errorClass} />
          )}
        </Field>
      )}
    />
  );
}
