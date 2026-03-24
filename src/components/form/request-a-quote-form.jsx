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
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  email: commonValidations.email,
  phone: commonValidations.phone("Phone Number"),
  city: commonValidations.requiredString("City"),
  state: commonValidations.dropDown("State"),
  district: commonValidations.dropDown("District"),
  pincode: commonValidations.postalCode,
  productCategory: commonValidations.dropDown("Product Category"),
  productModel: commonValidations.dropDown("Product Model"),
  quantityRequired: commonValidations.requiredString("Quantity Required"),
  productPurpose: commonValidations.dropDown("Product Purpose"),
  productPowerRequirement: commonValidations.optionalString,
  installationSupport: z.string().optional(),
  projectSiteDetails: commonValidations.optionalString,
  preferredTime: commonValidations.optionalString,
  comments: commonValidations.optionalString,
  images: z.any().optional(),
});

const headingClasses =
  "text-[16px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-normal font-normal text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5";

const labelClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white";
const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function RequestAQuoteForm({ activeTab, page, onClose }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => apiClient("/get-categories").then((r) => r.data),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      apiClient(`/get-catgeory-wise-product?slug=${selectedCategory}`).then(
        (r) => r.data,
      ),
    enabled: !!selectedCategory,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => apiClient("/states?slug=india").then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const { data: districts = [], isLoading: districtsLoading } = useQuery({
    queryKey: ["districts", selectedState],
    queryFn: () =>
      apiClient(`/districts?state_slug=${selectedState}`).then((r) => r.data),
    enabled: !!selectedState,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const { data: useCases = [], isLoading: useCasesLoading } = useQuery({
    queryKey: ["use-cases"],
    queryFn: () => apiClient("/get-use-case").then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      district: "",
      pincode: "",
      productCategory: "",
      productModel: "",
      quantityRequired: "",
      productPurpose: "",
      productPowerRequirement: "",
      installationSupport: "Yes",
      projectSiteDetails: "",
      preferredTime: "",
      comments: "",
      images: null,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("images", file);
      form.clearErrors("images");
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("images", null);
  };

  async function onSubmit(data) {
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("request_quote");

      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("city", data.city);
      formData.append("state_slug", data.state);
      formData.append("district_slug", data.district);
      formData.append("pincode", data.pincode);
      formData.append("product_category_slug", data.productCategory);
      formData.append("product_slug", data.productModel);
      formData.append("quantity", data.quantityRequired);
      formData.append("use_case_slug", data.productPurpose);
      formData.append(
        "loading_power",
        data.productPowerRequirement || "",
      );
      formData.append(
        "installation_support",
        data.installationSupport || "Yes",
      );
      formData.append("site_details", data.projectSiteDetails || "");
      formData.append("time_for_call", data.preferredTime || "");
      formData.append("message", data.comments || "");

      if (data.images instanceof File) {
        formData.append("file", data.images);
      }
      formData.append("recaptcha_token", recaptchaToken);

      const url = `${API_URL}/get-a-quote`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setIsSuccess(true);
      form.reset();

      setUploadedFile(null);
      setSelectedCategory(null);
      setSelectedState(null);
      toast.success("Quote request submitted successfully");
    } catch (error) {
      toast.error("Failed to submit quote request");
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
        description="Thank you for requesting a quote. Our team will verify the details and get back to you with the right solution shortly."
        onClose={onClose}
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      {/* Personal Details */}
      <div className="mb-6 xl:mb-8.5 2xl:mb-10 3xl:mb-12.5">
        <div className={headingClasses}>Personal Details</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          {[
            { name: "fullName", placeholder: "Full Name*" },
            { name: "email", placeholder: "Email Address*", type: "email" },
            { name: "phone", placeholder: "Phone Number*" },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      </div>

      {/* Location Details */}
      <div className="mb-6 xl:mb-8.5 2xl:mb-10 3xl:mb-12.5">
        <div className={headingClasses}>Location Details</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          {[
            {
              name: "city",
              placeholder: "City / Town*",
            },
            {
              name: "state",
              placeholder: "State*",
              type: "select",
              options: states,
              isLoading: statesLoading,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedState(value);
                form.setValue("district", "");
              },
            },
            {
              name: "district",
              placeholder: "District*",
              type: "select",
              options: districts,
              isLoading: districtsLoading,
              disabled: !selectedState || districtsLoading,
            },
            {
              name: "pincode",
              placeholder: "Pincode*",
            },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6 xl:mb-8.5 2xl:mb-10 3xl:mb-12.5">
        <div className={headingClasses}>Product / Requirement Details</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          {[
            {
              name: "productCategory",
              placeholder: "Product Category*",
              type: "select",
              options: categories,
              isLoading: categoriesLoading,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedCategory(value);
                form.setValue("productModel", "");
              },
            },
            {
              name: "productModel",
              placeholder: "Product Model*",
              type: "select",
              options: products,
              isLoading: productsLoading,
              disabled: !selectedCategory || productsLoading,
            },
            {
              name: "quantityRequired",
              placeholder: "Quantity Required*",
              type: "number",
            },
            {
              name: "productPurpose",
              placeholder: "Product Purpose*",
              type: "select",
              options: useCases,
              isLoading: useCasesLoading,
              note: "Home, Commercial, Industrial, Institutional, EV, etc.",
            },
            {
              name: "productPowerRequirement",
              placeholder: "Expected Load / Power Requirement",
              note: "If known—e.g., 1kW, 5kW, 10kW. etc",
            },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      </div>

      {/* Installation Requirement */}
      <div className="mb-6 xl:mb-8.5 2xl:mb-10 3xl:mb-12.5">
        <div className={headingClasses}>Installation Requirement</div>
        <FieldGroup>
          <Controller
            name="installationSupport"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full min-h-[35px] xl:min-h-[40px] 2xl:min-h-[45px] 3xl:min-h-[55px] bg-[#252525] border border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] selection:bg-primary-800 p-4 flex flex-wrap flex-row"
              >
                <FieldLabel
                  className={cn(
                    labelClasses,
                    "max-w-full sm:max-w-1/2 md:max-w-1/3 mb-0",
                  )}
                >
                  Need Installation Support?
                </FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex-1 flex flex-wrap gap-x-9 xl:gap-x-10 2xl:gap-x-12 3xl:gap-x-14"
                >
                  {["Yes", "No", "Not Sure"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={item}
                        id={`install-${item}`}
                        className="text-[#008dd2] border-2 [&_svg]:fill-white hover:scale-100"
                      />
                      <Label
                        htmlFor={`install-${item}`}
                        className={labelClasses}
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className={errorClass}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      {/* Additional Information */}
      <div className="mb-6 xl:mb-8.5 2xl:mb-10 3xl:mb-12.5">
        <div className={headingClasses}>Additional Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          {[
            {
              name: "projectSiteDetails",
              placeholder: "Project / Site Details",
            },
            {
              name: "preferredTime",
              placeholder: "Preferred Time to Contact",
            },
            {
              name: "comments",
              placeholder: "Comments / Requirements",
            },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}

          <div className="sm:col-span-2 md:col-span-3">
            {/* Product Image Upload */}
            <div className="relative flex flex-col gap-3">
              {!uploadedFile ? (
                <label className="flex flex-col items-center justify-center w-full h-[50px] xl:h-[75px] 2xl:h-[90px] 3xl:h-[110px] bg-[#252525] border border-dashed border-[#676767] rounded-[6px] 3xl:rounded-[9px] cursor-pointer hover:border-white transition-colors px-4">
                  <div className="text-[10px] lg:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-tight font-normal text-white flex items-center gap-3">
                    <Image
                      src="/images/icon-upload.svg"
                      alt="Upload"
                      width={20}
                      height={20}
                      className="w-[16px] xl:w-[20px] 2xl:w-[23px] 3xl:w-[28px] object-contain"
                    />
                    <span>
                      Upload Documents
                      <br />
                      <small>
                        (Upload Site Plan / Requirement Document (PDF/JPG))
                        (Maximum size: 5 MB)
                      </small>
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between w-full h-[50px] xl:h-[75px] 2xl:h-[90px] 3xl:h-[110px] bg-[#252525] border border-dashed border-white rounded-[6px] 3xl:rounded-[9px] px-6">
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
              {form.formState.errors.images && (
                <div className={errorClass}>
                  {form.formState.errors.images.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
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
          {item.type === "select" ? (
            <Select
              onValueChange={(value) =>
                item.onValueChange
                  ? item.onValueChange(value, field.onChange)
                  : field.onChange(value)
              }
              value={field.value}
              disabled={isSubmitting || item.disabled || extraDisabled}
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
                  {item?.options?.map((opt) => (
                    <SelectItem key={opt?.slug} value={opt?.slug}>
                      {opt?.title || opt?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : item.type === "date" ? (
            <Input
              {...field}
              type="date"
              placeholder={item.placeholder}
              className={cn(inputClasses, "date-input [color-scheme:dark]")}
              disabled={isSubmitting || extraDisabled}
            />
          ) : (
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
          )}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className={errorClass} />
          )}
        </Field>
      )}
    />
  );
}
