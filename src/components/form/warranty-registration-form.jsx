import * as React from "react";
import { useState, useEffect } from "react";
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

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Category is required"),
  product: z.string().min(1, "Product is required"),
  productVariant: z.string().min(1, "Product variant is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  dealerName: z.string().min(1, "Dealer name is required"),
  // Billing Address
  billingAddressBuilding: z.string().min(1, "Building name is required"),
  billingAddressBlock: z.string().min(1, "Block/Flat No is required"),
  billingAddressStreet: z.string().min(1, "Street name is required"),
  billingAddressPincode: z.string().min(6, "Valid pincode is required"),
  billingAddressState: z.string().min(1, "State is required"),
  billingAddressDistrict: z.string().min(1, "District is required"),
  // Installation Address
  installationAddressBuilding: z.string().min(1, "Building name is required"),
  installationAddressBlock: z.string().min(1, "Block/Flat No is required"),
  installationAddressStreet: z.string().min(1, "Street name is required"),
  installationAddressPincode: z.string().min(6, "Valid pincode is required"),
  installationAddressState: z.string().min(1, "State is required"),
  installationAddressDistrict: z.string().min(1, "District is required"),
  sameAsBillingAddress: z.boolean().optional(),
  images: z.any().refine((file) => file !== null, "Product image is required"),
});

const labelClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white";

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function WarrantyRegistrationForm() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    }
  }, [sameAsBilling, ...billingValues, form]);

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
    setIsSubmitting(true);
    try {
      // API submission logic
      setIsSuccess(true);
      form.reset();
      setUploadedFile(null);
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
        description="Thank you for registering your product warranty. Our team will verify
        the details and update your warranty status shortly."
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-8 sm:mb-6 xl:mb-9.5 2xl:mb-11 3xl:mb-14">
        {[
          { name: "fullName", placeholder: "Name*" },
          { name: "phone", placeholder: "Phone*" },
          { name: "email", placeholder: "Mail*", type: "email" },
          { name: "category", placeholder: "Category*" },
          {
            name: "product",
            placeholder: "Product*",
            type: "select",
            options: ["Product 1", "Product 2"],
          },
          {
            name: "productVariant",
            placeholder: "Product variant*",
            type: "select",
            options: ["Variant 1", "Variant 2"],
          },
          { name: "serialNumber", placeholder: "Serial Number*" },
          { name: "invoiceDate", placeholder: "Invoice Date*" },
          { name: "invoiceNumber", placeholder: "Invoice Number*" },
        ].map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="sr-only">{item.placeholder}</FieldLabel>
                {item.type === "select" ? (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      className={cn(
                        inputClasses,
                        "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                      )}
                    >
                      <SelectValue placeholder={item.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {item.options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
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
                  <FieldError
                    errors={[fieldState.error]}
                    className={errorClass}
                  />
                )}
              </Field>
            )}
          />
        ))}

        <div className="sm:col-span-2 md:col-span-3">
          <Controller
            name="dealerName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="sr-only">Dealer Name*</FieldLabel>
                <Input
                  {...field}
                  placeholder="Dealer Name*"
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
              options: ["Kerala", "Tamil Nadu", "Maharashtra"],
            },
            {
              name: "billingAddressDistrict",
              placeholder: "District*",
              type: "select",
              options: ["Thrissur", "Kochi", "Pune", "Coimbatore"],
            },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="sr-only">
                    {item.placeholder}
                  </FieldLabel>
                  {item.type === "select" ? (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        className={cn(
                          inputClasses,
                          "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                        )}
                      >
                        <SelectValue placeholder={item.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {item.options.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      {...field}
                      placeholder={item.placeholder}
                      className={inputClasses}
                      disabled={isSubmitting}
                    />
                  )}
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className={errorClass}
                    />
                  )}
                </Field>
              )}
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
              options: ["Kerala", "Tamil Nadu", "Maharashtra"],
            },
            {
              name: "installationAddressDistrict",
              placeholder: "District*",
              type: "select",
              options: ["Thrissur", "Kochi", "Pune", "Coimbatore"],
            },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="sr-only">
                    {item.placeholder}
                  </FieldLabel>
                  {item.type === "select" ? (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting || sameAsBilling}
                    >
                      <SelectTrigger
                        className={cn(
                          inputClasses,
                          "data-[placeholder]:text-white data-[size=default]:h-[35px] xl:data-[size=default]:h-[40px] 2xl:data-[size=default]:h-[45px] 3xl:data-[size=default]:h-[55px] justify-between",
                        )}
                      >
                        <SelectValue placeholder={item.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {item.options.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      {...field}
                      placeholder={item.placeholder}
                      className={inputClasses}
                      disabled={isSubmitting || sameAsBilling}
                    />
                  )}
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className={errorClass}
                    />
                  )}
                </Field>
              )}
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
