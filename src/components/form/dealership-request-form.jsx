"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
  fullName: commonValidations.name("Name"),
  email: commonValidations.email,
  phone: commonValidations.phone("Phone Number"),
  state: commonValidations.dropDown("State"),
  district: commonValidations.dropDown("District"),
  city: commonValidations.requiredString("City"),
  pinCode: commonValidations.postalCode,
  categories: z.array(z.union([z.string(), z.number()])).min(1, "Please select at least one product category"),
  message: commonValidations.requiredString("Message"),
});

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white w-full h-[35px] xl:h-[40px] 2xl:h-[45px] 3xl:h-[55px] bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

const errorClass =
  "text-[10px] md:text-[10px] xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-red-500 mt-1";

const labelClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white";

export function DealershipRequestForm({ activeTab }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "",
      district: "",
      city: "",
      pinCode: "",
      categories: [],
      message: "",
    },
  });

  async function onSubmit(data) {
    if (!executeRecaptcha) return;
    setIsSubmitting(true);
    try {
      const captchaToken = await executeRecaptcha("dealership_request");
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("state_slug", data.state);
      formData.append("district_slug", data.district);
      formData.append("city", data.city);
      formData.append("pincode", data.pinCode);
      formData.append("product_categories", JSON.stringify(data.categories));
      formData.append("message", data.message);
      formData.append("captcha_key", captchaToken);
      formData.append("form_slug", activeTab);

      const res = await fetch(`${API_URL}/dealer-enquiry`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      form.reset();
      setSelectedState(null);
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SuccessModal isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-8 sm:mb-6 xl:mb-9.5 2xl:mb-11 3xl:mb-14">
          {[
            { name: "fullName", placeholder: "Name*" },
            { name: "email", placeholder: "Mail*", type: "email" },
            { name: "phone", placeholder: "Phone*" },
            {
              name: "state",
              placeholder: !statesLoading && states.length === 0 ? "No states available" : "State*",
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
              disabled: !selectedState || districtsLoading || districts.length === 0,
            },
            { name: "city", placeholder: "City*" },
            { name: "pinCode", placeholder: "Pin Code*" },
          ].map((item) => (
            <FormBlock
              key={item.name}
              item={item}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}

          {/* Product Category Multi-select — full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <Controller
              name="categories"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="sr-only">Product Category*</FieldLabel>
                  <div
                    className={cn(
                      "w-full border border-[#676767]/80 bg-[#252525] rounded-[6px] 3xl:rounded-[9px] px-4 py-3",
                      fieldState.invalid && "border-red-500",
                    )}
                  >
                    {categoriesLoading ? (
                      <p className={cn(labelClasses, "opacity-60")}>Loading categories...</p>
                    ) : categories.length === 0 ? (
                      <p className={cn(labelClasses, "opacity-60")}>No categories available</p>
                    ) : (
                      <>
                        <p className={cn(labelClasses, "mb-3 opacity-70")}>
                          Product Category*
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
                          {categories.map((cat) => {
                            const checked = field.value?.includes(cat.id);
                            return (
                              <label
                                key={cat.slug}
                                className="flex items-center gap-2.5 cursor-pointer"
                              >
                                <Checkbox
                                  checked={checked}
                                  disabled={isSubmitting}
                                  onCheckedChange={(isChecked) => {
                                    const current = field.value ?? [];
                                    if (isChecked) {
                                      field.onChange([...current, cat.id]);
                                    } else {
                                      field.onChange(current.filter((s) => s !== cat.id));
                                    }
                                  }}
                                  className="border-[#676767] data-[state=checked]:bg-[#008dd2] data-[state=checked]:border-[#008dd2]"
                                />
                                <span className={labelClasses}>
                                  {cat.title || cat.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className={errorClass} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Message — full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <FormBlock
              item={{ name: "message", placeholder: "Message*", type: "textarea" }}
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
