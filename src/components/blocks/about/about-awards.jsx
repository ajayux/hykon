import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function AboutAwards({ awardData, certificationData }) {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#f8f9fa]">
      <div className="container">
        <div className="flex flex-wrap -mx-4 lg:-mx-8">
          {/* Awards Side */}
          <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-12 lg:mb-0">
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm h-full border border-gray-100">
              <Heading as="h3" size="h3" className="font-bold mb-6 text-black">
                {awardData?.title || "Awards & Recognitions"}
              </Heading>
              <div className="prose text-gray-600 mb-10">
                {awardData?.description ? parse(awardData.description) : ""}
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                {awardData?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="w-20 lg:w-24 grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={
                        item.media?.path ||
                        `/images/achievements-${item.id}.png`
                      }
                      alt={item.media?.alt || "Award"}
                      width={96}
                      height={96}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Side */}
          <div className="w-full lg:w-1/2 px-4 lg:px-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm h-full border border-gray-100">
              <Heading as="h3" size="h3" className="font-bold mb-6 text-black">
                {certificationData?.title || "Certifications"}
              </Heading>
              <div className="prose text-gray-600 mb-8">
                {certificationData?.description
                  ? parse(certificationData.description)
                  : ""}
              </div>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-[#008dd2] rounded-full" />
                  ISO Certified Company
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-[#008dd2] rounded-full" />
                  Compliant with National & International Standards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
