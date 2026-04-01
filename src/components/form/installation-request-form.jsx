"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
import SuccessModal from "@/components/blocks/landing/success-modal";
import { commonValidations } from "@/lib/validtions";
import { API_URL, apiClient } from "@/lib/api/client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const dateValidation = z
  .string()
  .min(1, "Date is required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)")
  .refine(
    (val) => !isNaN(new Date(val).getTime()),
    "Please enter a valid calendar date",
  )
  .refine((val) => new Date(val) <= new Date(), "Date cannot be in the future")
  .refine(
    (val) => new Date(val) >= new Date("1900-01-01"),
    "Please enter a valid date",
  );

const formSchema = z.object({
  name: commonValidations.name("Name"),
  email: commonValidations.email,
  phone: commonValidations.phone("Phone Number"),
  address: commonValidations.textBox("Address"),
  state: commonValidations.dropDown("State"),
  district: commonValidations.dropDown("District"),
  city: commonValidations.requiredString("City"),
  pinCode: commonValidations.postalCode,
  invoiceDate: dateValidation,
  serialNumber: commonValidations.requiredString("Product Serial Number"),
  category: commonValidations.dropDown("Product Category"),
  product: commonValidations.dropDown("Product"),
  productVariant: commonValidations.optionalDropdown,
  dateOfPurchase: dateValidation,
  dealerName: commonValidations.name("Dealer Name"),
  dealerAddress: commonValidations.textBox("Dealer Address"),
  dealerContact: commonValidations.phone("Dealer Contact Number"),
  message: commonValidations.requiredString("Message"),
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

export function InstallationRequestForm({ activeTab }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsSuccess(false);
  }, [activeTab]);

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
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => apiClient("/get-categories").then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      apiClient(`/get-catgeory-wise-product?slug=${selectedCategory}`).then(
        (r) => r.data,
      ),
    enabled: !!selectedCategory,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const { data: variants = [], isLoading: variantsLoading } = useQuery({
    queryKey: ["variants", selectedProduct],
    queryFn: () =>
      apiClient(`/get-product-variants?slug=${selectedProduct}`).then(
        (r) => r.data,
      ),
    enabled: !!selectedProduct,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      district: "",
      city: "",
      pinCode: "",
      invoiceDate: "",
      serialNumber: "",
      category: "",
      product: "",
      productVariant: "",
      dateOfPurchase: "",
      dealerName: "",
      dealerAddress: "",
      dealerContact: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    if (!executeRecaptcha) return;
    setIsSubmitting(true);
    try {
      const captchaToken = await executeRecaptcha("installation_request");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("state_slug", data.state);
      formData.append("district_slug", data.district);
      formData.append("city", data.city);
      formData.append("pincode", data.pinCode);
      formData.append("invoice_date", data.invoiceDate);
      formData.append("serial_number", data.serialNumber);
      formData.append("product_category_slug", data.category);
      formData.append("product_slug", data.product);
      formData.append("product_variant_slug", data.productVariant);
      formData.append("date_of_purchase", data.dateOfPurchase);
      formData.append("dealer_name", data.dealerName);
      formData.append("dealer_address", data.dealerAddress);
      formData.append("dealer_contact", data.dealerContact);
      formData.append("message", data.message);
      formData.append("captcha_key", captchaToken);
      formData.append("form_slug", activeTab);

      const res = await fetch(`${API_URL}/installation-enquiry`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      form.reset();
      setSelectedState(null);
      setSelectedCategory(null);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <SuccessModal isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-8 sm:mb-6 xl:mb-9.5 2xl:mb-11 3xl:mb-14">
          {[
            { name: "name", placeholder: "Name*" },
            { name: "email", placeholder: "Mail*", type: "email" },
            { name: "phone", placeholder: "Phone*" },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}

          {/* Address — full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <FormBlock
              item={{
                name: "address",
                placeholder: "Address / Address with Landmark*",
                type: "textarea",
              }}
              form={form}
              isSubmitting={isSubmitting}
            />
          </div>

          {[
            {
              name: "state",
              placeholder:
                !statesLoading && states.length === 0
                  ? "No states available"
                  : "State*",
              type: "select",
              options: states,
              isLoading: statesLoading,
              disabled: statesLoading || states.length === 0,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedState(value);
                form.setValue("district", "");
              },
            },
            {
              name: "district",
              placeholder:
                selectedState && !districtsLoading && districts.length === 0
                  ? "No districts available"
                  : "District*",
              type: "select",
              options: districts,
              isLoading: districtsLoading,
              disabled:
                !selectedState || districtsLoading || districts.length === 0,
            },
            { name: "city", placeholder: "City*" },
            { name: "pinCode", placeholder: "Pin Code*" },
            {
              name: "invoiceDate",
              placeholder: "Invoice Date*",
              type: "date",
              max: today,
            },
            { name: "serialNumber", placeholder: "Product Serial Number*" },
            {
              name: "category",
              placeholder:
                !categoriesLoading && categories.length === 0
                  ? "No Category available"
                  : "Product Category*",
              type: "select",
              options: categories,
              isLoading: categoriesLoading,
              disabled: categoriesLoading || categories.length === 0,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedCategory(value);
                setSelectedProduct(null);
                form.setValue("product", "");
                form.setValue("productVariant", "");
              },
            },
            {
              name: "product",
              placeholder:
                selectedCategory && !productsLoading && products.length === 0
                  ? "No products available"
                  : "Product*",
              type: "select",
              options: products,
              isLoading: productsLoading,
              disabled:
                !selectedCategory || productsLoading || products.length === 0,
              onValueChange: (value, fieldOnChange) => {
                fieldOnChange(value);
                setSelectedProduct(value);
                form.setValue("productVariant", "");
              },
            },
            {
              name: "productVariant",
              placeholder:
                selectedProduct && !variantsLoading && variants.length === 0
                  ? "No variant available"
                  : "Product Variant",
              type: "select",
              options: variants,
              isLoading: variantsLoading,
              disabled:
                !selectedProduct || variantsLoading || variants.length === 0,
            },
            {
              name: "dateOfPurchase",
              placeholder: "Date of Purchase*",
              type: "date",
              max: today,
            },
            { name: "dealerName", placeholder: "Dealer Name*" },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}

          <FormBlock
            item={{
              name: "dealerContact",
              placeholder: "Dealer Contact Number*",
            }}
            form={form}
            isSubmitting={isSubmitting}
          />
          {/* Dealer Address — full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <FormBlock
              item={{
                name: "dealerAddress",
                placeholder: "Dealer Address*",
                type: "textarea",
              }}
              form={form}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Message — full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <FormBlock
              item={{
                name: "message",
                placeholder: "Message*",
                type: "textarea",
              }}
              form={form}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

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
    </>
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
                  {item?.options?.length === 0 ? (
                    <SelectItem value="no-data" disabled>
                      No data available
                    </SelectItem>
                  ) : (
                    item?.options?.map((opt) => (
                      <SelectItem key={opt?.slug} value={opt?.slug}>
                        {opt?.title || opt?.name}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : item.type === "date" ? (
            <Input
              {...field}
              type="date"
              max={item.max ?? new Date().toISOString().split("T")[0]}
              placeholder={item.placeholder}
              className={cn(inputClasses, "date-input [color-scheme:dark]")}
              disabled={isSubmitting}
            />
          ) : item.type === "textarea" ? (
            <textarea
              {...field}
              placeholder={item.placeholder}
              className={cn(
                inputClasses,
                "h-22.5 xl:h-27.5 2xl:h-32.5 3xl:h-40 py-3 resize-none",
              )}
              disabled={isSubmitting}
            />
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
