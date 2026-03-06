"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/utils/typography";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerCareForm({ data }) {
  const [activeTab, setActiveTab] = useState(
    data?.filters?.[0]?.slug || "warranty-registration",
  );
  const [billingAddress, setBillingAddress] = useState({
    building: "",
    block: "",
    street: "",
    pincode: "",
    state: "",
    district: "",
  });
  const [installationAddress, setInstallationAddress] = useState({
    building: "",
    block: "",
    street: "",
    pincode: "",
    state: "",
    district: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleSameAsBillingChange = (checked) => {
    setSameAsBilling(checked);
    if (checked) {
      setInstallationAddress({ ...billingAddress });
    }
  };

  const handleBillingChange = (field, value) => {
    const newBilling = { ...billingAddress, [field]: value };
    setBillingAddress(newBilling);
    if (sameAsBilling) {
      setInstallationAddress(newBilling);
    }
  };

  return (
    <section className="py-10 bg-[#0f0f0f]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-[#181818] rounded-xl overflow-hidden">
              <div className="bg-[#008dd2] p-4">
                <Text size="p1" className="text-white font-bold uppercase">
                  Customer Care
                </Text>
              </div>
              <nav className="flex flex-col">
                {data?.filters?.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTab(filter.slug)}
                    className={cn(
                      "flex items-center justify-between p-4 text-left border-b border-[#2a2a2a] transition-colors",
                      activeTab === filter.slug
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-400 hover:bg-[#222]",
                    )}
                  >
                    <Text size="p1" className="font-medium">
                      {filter.title}
                    </Text>
                    {activeTab === filter.slug && (
                      <ArrowRight size={16} className="text-[#008dd2]" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Form Content */}
          <main className="w-full lg:w-3/4">
            <div className="bg-[#181818] rounded-2xl p-6 lg:p-10 border border-[#2a2a2a]">
              <Heading as="h3" size="h3" className="text-white mb-8 capitalize">
                {activeTab.replace(/-/g, " ")}
              </Heading>

              <form className="space-y-10">
                {/* Main Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    placeholder="Name*"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />
                  <Input
                    placeholder="Phone*"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />
                  <Input
                    placeholder="Mail*"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />

                  <Select>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                      <SelectValue placeholder="Category*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat1">Category 1</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                      <SelectValue placeholder="Product*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prod1">Product 1</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                      <SelectValue placeholder="Product variant*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="var1">Variant 1</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Serial Number*"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />
                  <Input
                    placeholder="Invoice Date*"
                    type="date"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />
                  <Input
                    placeholder="Invoice Number*"
                    className="bg-[#1e1e1e] border-[#333] text-white h-12"
                  />

                  <div className="md:col-span-3">
                    <Input
                      placeholder="Dealer Name*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                    />
                  </div>
                </div>

                {/* Upload Section */}
                <div className="border-2 border-dashed border-[#333] rounded-xl p-8 flex flex-col items-center justify-center bg-[#1e1e1e]/50 hover:bg-[#1e1e1e] transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mb-4">
                    <Upload className="text-gray-400" size={24} />
                  </div>
                  <Text size="p1" className="text-white mb-1">
                    Images upload*
                  </Text>
                  <Text size="p2" className="text-gray-500">
                    (Kindly upload clear front view image/images of the
                    installed product (Maximum size: 5 MB))
                  </Text>
                </div>

                {/* Billing Address */}
                <div>
                  <Heading as="h4" size="h4" className="text-white mb-6">
                    Billing Address
                  </Heading>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      placeholder="Building/Apartment Name*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={billingAddress.building}
                      onChange={(e) =>
                        handleBillingChange("building", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Block/Flat No*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={billingAddress.block}
                      onChange={(e) =>
                        handleBillingChange("block", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Street/Road Name*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={billingAddress.street}
                      onChange={(e) =>
                        handleBillingChange("street", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Pincode*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={billingAddress.pincode}
                      onChange={(e) =>
                        handleBillingChange("pincode", e.target.value)
                      }
                    />
                    <Select
                      onValueChange={(v) => handleBillingChange("state", v)}
                    >
                      <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                        <SelectValue placeholder="State*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerala">Kerala</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(v) => handleBillingChange("district", v)}
                    >
                      <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                        <SelectValue placeholder="District*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thrissur">Thrissur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Installation Address */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Heading as="h4" size="h4" className="text-white">
                      Installation Address
                    </Heading>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="sameAsBilling"
                        onCheckedChange={handleSameAsBillingChange}
                        checked={sameAsBilling}
                        className="border-[#333] data-[state=checked]:bg-[#008dd2] data-[state=checked]:border-[#008dd2]"
                      />
                      <label
                        htmlFor="sameAsBilling"
                        className="text-xs text-gray-400 cursor-pointer"
                      >
                        Same as billing address
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      placeholder="Building/Apartment Name*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={installationAddress.building}
                      onChange={(e) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          building: e.target.value,
                        })
                      }
                      disabled={sameAsBilling}
                    />
                    <Input
                      placeholder="Block/Flat No*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={installationAddress.block}
                      onChange={(e) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          block: e.target.value,
                        })
                      }
                      disabled={sameAsBilling}
                    />
                    <Input
                      placeholder="Street/Road Name*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={installationAddress.street}
                      onChange={(e) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          street: e.target.value,
                        })
                      }
                      disabled={sameAsBilling}
                    />
                    <Input
                      placeholder="Pincode*"
                      className="bg-[#1e1e1e] border-[#333] text-white h-12"
                      value={installationAddress.pincode}
                      onChange={(e) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          pincode: e.target.value,
                        })
                      }
                      disabled={sameAsBilling}
                    />
                    <Select
                      onValueChange={(v) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          state: v,
                        })
                      }
                      value={installationAddress.state}
                      disabled={sameAsBilling}
                    >
                      <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                        <SelectValue placeholder="State*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerala">Kerala</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(v) =>
                        !sameAsBilling &&
                        setInstallationAddress({
                          ...installationAddress,
                          district: v,
                        })
                      }
                      value={installationAddress.district}
                      disabled={sameAsBilling}
                    >
                      <SelectTrigger className="bg-[#1e1e1e] border-[#333] text-white h-12 w-full">
                        <SelectValue placeholder="District*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thrissur">Thrissur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                  <Button className="bg-transparent border border-[#333] text-white rounded-full px-8 py-6 flex items-center gap-3 hover:bg-[#222]">
                    Submit
                    <div className="w-8 h-8 rounded-full bg-[#008dd2] flex items-center justify-center">
                      <ArrowRight size={16} />
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
