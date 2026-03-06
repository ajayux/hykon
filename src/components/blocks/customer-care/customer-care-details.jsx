import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import { Mail, Clock, Phone, MapPin } from "lucide-react";

export default function CustomerCareDetails({ data }) {
  if (!data) return null;

  const { whatsappNumber, email, callCenterNumber, timing, locations } = data;

  return (
    <section className="py-10 bg-[#0f0f0f]">
      <div className="container">
        <div className="w-full bg-[#181818] rounded-2xl p-8 lg:p-12 xl:p-16">
          <Heading as="h2" size="h2" className="text-white mb-10">
            Hykon Customer Care
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WhatsApp / QR Code */}
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a] flex flex-col items-center">
              <div className="w-32 h-32 bg-white p-2 rounded-lg mb-4 relative">
                <Image
                  src="/images/qr-code.png"
                  alt="QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-2 text-[#4ade80]">
                <Image
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                />
                <Text size="p1" className="font-semibold">
                  WhatsApp
                </Text>
              </div>
              <Text size="p1" className="text-white mt-1">
                {whatsappNumber}
              </Text>
            </div>

            {/* Email & Call Centre */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#008dd2]/10 flex items-center justify-center">
                    <Mail className="text-[#008dd2]" size={20} />
                  </div>
                  <div>
                    <Text size="p2" className="text-gray-400 mb-1">
                      Email
                    </Text>
                    <Text size="p1" className="text-white font-medium">
                      {email}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#008dd2]/10 flex items-center justify-center">
                    <Phone className="text-[#008dd2]" size={20} />
                  </div>
                  <div>
                    <Text size="p2" className="text-gray-400 mb-1">
                      Call Centre
                    </Text>
                    <Text size="p1" className="text-white font-medium">
                      {callCenterNumber?.[0]?.split(",").join(" | ")}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#008dd2]/10 flex items-center justify-center">
                  <Clock className="text-[#008dd2]" size={20} />
                </div>
                <Text size="p2" className="text-gray-400 pt-2">
                  Timing
                </Text>
              </div>
              <div className="text-white prose prose-invert prose-sm">
                {parse(timing || "")}
              </div>
            </div>

            {/* Locations */}
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
              <Heading as="h4" size="h4" className="text-white mb-4">
                Manufacturing Locations
              </Heading>
              <ul className="space-y-3">
                {locations?.[0]?.split(",").map((location, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <MapPin className="text-[#008dd2]" size={16} />
                    <Text size="p1" className="text-gray-300">
                      {location.trim()}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
