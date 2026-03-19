"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading, Text } from "../utils/typography";
import FormSubmitResponse from "../common/form-submitted-success";
import { commonValidations } from "@/lib/validtions";
import { API_URL, apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const formSchema = z
  .object({
    fullName: commonValidations.name("Name"),
    phone: commonValidations.phone("Phone Number"),
    email: commonValidations.email,
    category: commonValidations.dropDown("Category"),
    product: commonValidations.dropDown("Product"),
    productVariant: commonValidations.optionalDropdown,
    serialNumber: commonValidations.requiredString("Serial Number"),
    invoiceDate: z
      .string()
      .min(1, "Invoice Date is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
    invoiceNumber: commonValidations.requiredString("Invoice Number"),
    dealerName: commonValidations.name("Dealer Name"),
    // Billing Address
    billingAddressBuilding: commonValidations.requiredString(
      "Building/Apartment Name",
    ),
    billingAddressBlock: commonValidations.requiredString("Block/Flat No"),
    billingAddressStreet: commonValidations.requiredString("Street/Road Name"),
    billingAddressPincode: commonValidations.postalCode,
    billingAddressState: commonValidations.requiredString("State"),
    billingAddressDistrict: commonValidations.requiredString("District"),
    // Installation Address — optional at schema level; conditionally required via superRefine
    installationAddressBuilding: commonValidations.optionalString,
    installationAddressBlock: commonValidations.optionalString,
    installationAddressStreet: commonValidations.optionalString,
    installationAddressPincode: commonValidations.optionalString,
    installationAddressState: commonValidations.optionalString,
    installationAddressDistrict: commonValidations.optionalString,
    sameAsBillingAddress: z.boolean().optional(),
    images: commonValidations.file("Product image"),
  })
  .superRefine((data, ctx) => {
    if (!data.sameAsBillingAddress) {
      const installationFields = [
        {
          key: "installationAddressBuilding",
          label: "Building/Apartment Name",
        },
        { key: "installationAddressBlock", label: "Block/Flat No" },
        { key: "installationAddressStreet", label: "Street/Road Name" },
        { key: "installationAddressPincode", label: "Pincode" },
        { key: "installationAddressState", label: "State" },
        { key: "installationAddressDistrict", label: "District" },
      ];
      for (const { key, label } of installationFields) {
        if (!data[key] || data[key].trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${label} is required`,
            path: [key],
          });
        } else if (
          key === "installationAddressPincode" &&
          !/^[1-9][0-9]{5}$/.test(data[key])
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Invalid PIN code: must be 6 digits and cannot start with 0",
            path: [key],
          });
        }
      }
    }
  });

const labelClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white";

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function RequestAQuoteForm({ activeTab, page }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBillingState, setSelectedBillingState] = useState(null);
  const [selectedInstallationState, setSelectedInstallationState] =
    useState(null);

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

  const { data: variants = [], isLoading: variantsLoading } = useQuery({
    queryKey: ["variants", selectedProduct],
    queryFn: () =>
      apiClient(`/get-product-variants?slug=${selectedProduct}`).then(
        (r) => r.data,
      ),
    enabled: !!selectedProduct,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => apiClient("/states?slug=india").then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const { data: billingDistricts = [], isLoading: billingDistrictsLoading } =
    useQuery({
      queryKey: ["districts", selectedBillingState],
      queryFn: () =>
        apiClient(`/districts?state_slug=${selectedBillingState}`).then(
          (r) => r.data,
        ),
      enabled: !!selectedBillingState,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 2, // 2 hours
    });

  const {
    data: installationDistricts = [],
    isLoading: installationDistrictsLoading,
  } = useQuery({
    queryKey: ["districts", selectedInstallationState],
    queryFn: () =>
      apiClient(`/districts?state_slug=${selectedInstallationState}`).then(
        (r) => r.data,
      ),
    enabled: !!selectedInstallationState,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      category: "",
      product: "",
      productVariant: "",
      serialNumber: "",
      invoiceDate: "",
      invoiceNumber: "",
      dealerName: "",
      billingAddressBuilding: "",
      billingAddressBlock: "",
      billingAddressStreet: "",
      billingAddressPincode: "",
      billingAddressState: "",
      billingAddressDistrict: "",
      installationAddressBuilding: "",
      installationAddressBlock: "",
      installationAddressStreet: "",
      installationAddressPincode: "",
      installationAddressState: "",
      installationAddressDistrict: "",
      sameAsBillingAddress: false,
      images: null,
    },
  });

  const sameAsBilling = form.watch("sameAsBillingAddress");
  const billingValues = form.watch([
    "billingAddressBuilding",
    "billingAddressBlock",
    "billingAddressStreet",
    "billingAddressPincode",
    "billingAddressState",
    "billingAddressDistrict",
  ]);

  useEffect(() => {
    if (sameAsBilling) {
      form.setValue("installationAddressBuilding", billingValues[0]);
      form.setValue("installationAddressBlock", billingValues[1]);
      form.setValue("installationAddressStreet", billingValues[2]);
      form.setValue("installationAddressPincode", billingValues[3]);
      form.setValue("installationAddressState", billingValues[4]);
      form.setValue("installationAddressDistrict", billingValues[5]);
      setSelectedInstallationState(selectedBillingState);
      form.clearErrors([
        "installationAddressBuilding",
        "installationAddressBlock",
        "installationAddressStreet",
        "installationAddressPincode",
        "installationAddressState",
        "installationAddressDistrict",
      ]);
    } else {
      form.setValue("installationAddressBuilding", "");
      form.setValue("installationAddressBlock", "");
      form.setValue("installationAddressStreet", "");
      form.setValue("installationAddressPincode", "");
      form.setValue("installationAddressState", "");
      form.setValue("installationAddressDistrict", "");
      setSelectedInstallationState(null);
    }
  }, [sameAsBilling, ...billingValues, form, selectedBillingState]);

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
      const recaptchaToken = await executeRecaptcha("warranty_registration");
      const warrantyRecaptchaToken = await executeRecaptcha(
        "warranty_registration",
      );

      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      formData.append("serial_number", data.serialNumber);
      formData.append("invoice_date", data.invoiceDate);
      formData.append("invoice_number", data.invoiceNumber);
      formData.append("dealer_name", data.dealerName);

      formData.append("billing_apartment_name", data.billingAddressBuilding);
      formData.append("billing_flat_number", data.billingAddressBlock);
      formData.append("billing_street_name", data.billingAddressStreet);
      formData.append("billing_state_slug", data.billingAddressState);
      formData.append("billing_district_slug", data.billingAddressDistrict);
      formData.append("billing_pincode", data.billingAddressPincode);

      formData.append("is_same_as_billing", data.sameAsBillingAddress ? 1 : 0);

      formData.append(
        "installation_apartment_name",
        data.sameAsBillingAddress
          ? data.billingAddressBuilding
          : data.installationAddressBuilding || "",
      );
      formData.append(
        "installation_flat_number",
        data.sameAsBillingAddress
          ? data.billingAddressBlock
          : data.installationAddressBlock || "",
      );
      formData.append(
        "installation_street_name",
        data.sameAsBillingAddress
          ? data.billingAddressStreet
          : data.installationAddressStreet || "",
      );
      formData.append(
        "installation_state_slug",
        data.sameAsBillingAddress
          ? data.billingAddressState
          : data.installationAddressState || "",
      );
      formData.append(
        "installation_district_slug",
        data.sameAsBillingAddress
          ? data.billingAddressDistrict
          : data.installationAddressDistrict || "",
      );
      formData.append(
        "installation_pincode",
        data.sameAsBillingAddress
          ? data.billingAddressPincode
          : data.installationAddressPincode || "",
      );

      formData.append("form_slug", activeTab);
      formData.append("product_category_slug", data.category);
      formData.append("product_slug", data.product);
      formData.append("product_variant_slug", data.productVariant);
      if (data.images) {
        formData.append("images[]", data.images);
      }
      formData.append(
        "recaptcha_token",
        page === "warranty" ? warrantyRecaptchaToken : recaptchaToken,
      );
      const url =
        page === "warranty"
          ? `${API_URL}/client-warranty-complaint`
          : `${API_URL}/customer-care-enquiry`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Submission failed" }));
        throw new Error(error.message || `HTTP ${res.status}`);
        return;
      }

      setIsSuccess(true);
      form.reset();

      setUploadedFile(null);
      setSelectedCategory(null);
      setSelectedProduct(null);
      setSelectedBillingState(null);
      setSelectedInstallationState(null);
      toast.success("Registration submitted successfully");
    } catch (error) {
      toast.error("Failed to submit registration");
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
        description="Thank you for registering your product warranty. Our team will verify
        the details and update your warranty status shortly."
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      {/* Personal Details */}
      <div className="mb-8 xl:mb-10 2xl:mb-12 3xl:mb-15">
        <Heading
          as="div"
          size="h6"
          className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
        >
          Personal Details
        </Heading>
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

          {[
            {
              name: "billingAddressBuilding",
              placeholder: "Building/Apartment Name*",
            },
            {
              name: "billingAddressBlock",
              placeholder: "Block/Flat No*",
            },
            {
              name: "billingAddressStreet",
              placeholder: "Street/Road Name*",
            },
            {
              name: "billingAddressPincode",
              placeholder: "Pincode*",
            },
            {
              name: "billingAddressState",
              placeholder: "State*",
              type: "select",
              options: states,
              isLoading: statesLoading,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedBillingState(value);
                form.setValue("billingAddressDistrict", "");
              },
            },
            {
              name: "billingAddressDistrict",
              placeholder: "District*",
              type: "select",
              options: billingDistricts,
              isLoading: billingDistrictsLoading,
              disabled: !selectedBillingState || billingDistrictsLoading,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-8 sm:mb-6 xl:mb-9.5 2xl:mb-11 3xl:mb-14">
        {[
          { name: "fullName", placeholder: "Name*" },
          { name: "phone", placeholder: "Phone*" },
          { name: "email", placeholder: "Mail*", type: "email" },
          {
            name: "category",
            placeholder: "Category*",
            type: "select",
            options: categories,
            isLoading: categoriesLoading,
            disabled: categoriesLoading,
            onValueChange: (value, fieldOnChange) => {
              fieldOnChange(value);
              setSelectedCategory(value);
              form.setValue("product", "");
              form.setValue("productVariant", "");
              setSelectedProduct(null);
            },
          },
          {
            name: "product",
            placeholder: "Product*",
            type: "select",
            options: products,
            isLoading: productsLoading,
            disabled: !selectedCategory || productsLoading,
            onValueChange: (value, fieldOnChange) => {
              fieldOnChange(value);
              setSelectedProduct(value);
              form.setValue("productVariant", "");
            },
          },
          {
            name: "productVariant",
            placeholder: "Product variant*",
            type: "select",
            options: variants,
            isLoading: variantsLoading,
            disabled: !selectedProduct || variantsLoading,
          },
          { name: "serialNumber", placeholder: "Serial Number*" },
          { name: "invoiceDate", placeholder: "Invoice Date*", type: "date" },
          { name: "invoiceNumber", placeholder: "Invoice Number*" },
        ].map((item) => (
          <FormBlock
            key={item.name}
            item={item}
            form={form}
            isSubmitting={isSubmitting}
          />
        ))}

        <div className="sm:col-span-2 md:col-span-3">
          <FormBlock
            item={{ name: "dealerName", placeholder: "Dealer Name*" }}
            form={form}
            isSubmitting={isSubmitting}
          />
        </div>
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
                    Images upload*
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
                  accept="image/*"
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

      {/* Billing Address */}
      <div className="mb-8 xl:mb-10 2xl:mb-12 3xl:mb-15">
        <Heading
          as="div"
          size="h6"
          className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
        >
          Billing Address
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          {[
            {
              name: "billingAddressBuilding",
              placeholder: "Building/Apartment Name*",
            },
            {
              name: "billingAddressBlock",
              placeholder: "Block/Flat No*",
            },
            {
              name: "billingAddressStreet",
              placeholder: "Street/Road Name*",
            },
            {
              name: "billingAddressPincode",
              placeholder: "Pincode*",
            },
            {
              name: "billingAddressState",
              placeholder: "State*",
              type: "select",
              options: states,
              isLoading: statesLoading,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedBillingState(value);
                form.setValue("billingAddressDistrict", "");
              },
            },
            {
              name: "billingAddressDistrict",
              placeholder: "District*",
              type: "select",
              options: billingDistricts,
              isLoading: billingDistrictsLoading,
              disabled: !selectedBillingState || billingDistrictsLoading,
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

      {/* Installation Address */}
      <div className="mb-8 xl:mb-10 2xl:mb-12 3xl:mb-15">
        <Heading
          as="div"
          size="h6"
          className="text-white mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6"
        >
          Installation Address
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8">
          <FieldGroup className="sm:col-span-2 md:col-span-3">
            <Controller
              name="sameAsBillingAddress"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="sameAsBillingAddress"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={"text-white data-[state=checked]:text-white"}
                  />
                  <FieldLabel
                    className={labelClasses}
                    htmlFor="sameAsBillingAddress"
                  >
                    Same as billing address
                  </FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
          {[
            {
              name: "installationAddressBuilding",
              placeholder: "Building/Apartment Name*",
            },
            {
              name: "installationAddressBlock",
              placeholder: "Block/Flat No*",
            },
            {
              name: "installationAddressStreet",
              placeholder: "Street/Road Name*",
            },
            {
              name: "installationAddressPincode",
              placeholder: "Pincode*",
            },
            {
              name: "installationAddressState",
              placeholder: "State*",
              type: "select",
              options: states,
              isLoading: statesLoading,
              disabled: sameAsBilling,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedInstallationState(value);
                form.setValue("installationAddressDistrict", "");
              },
            },
            {
              name: "installationAddressDistrict",
              placeholder: "District*",
              type: "select",
              options: installationDistricts,
              isLoading: installationDistrictsLoading,
              disabled:
                sameAsBilling ||
                !selectedInstallationState ||
                installationDistrictsLoading,
            },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
              extraDisabled={sameAsBilling}
            />
          ))}
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

function FormBlock({ item, form, isSubmitting, extraDisabled }) {
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
            <Input
              {...field}
              type={item.type || "text"}
              placeholder={item.placeholder}
              className={inputClasses}
              disabled={isSubmitting || extraDisabled}
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
