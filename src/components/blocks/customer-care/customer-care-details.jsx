import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";
import React from "react";

export default function CustomerCareDetails({ data }) {
  const numbers = data?.callCenterNumber?.flatMap((item) =>
    item.split(",").map((num) => num.trim()),
  );


  return (
    <section className="w-full h-auto block py-6 xl:py-8 2xl:py-10 3xl:py-11 bg-[#181818]">
      <div className="container">
        <div className="w-full sm:bg-[#212121] rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] py-6 sm:p-6 lg:p-8 xl:p-11 2xl:p-13 3xl:p-16">
          <Heading
            as="h2"
            size="h2"
            className="text-white mb-6 xl:mb-10 2xl:mb-12 3xl:mb-14"
          >
            Hykon Customer Care
          </Heading>

          <div className="flex flex-wrap gap-2 lg:gap-5 xl:gap-7 2xl:gap-8 3xl:gap-10">
            <div className="w-full lg:w-[140px] xl:w-[166px] 2xl:w-[200px] 3xl:w-[245px] bg-[#272727] p-3 xl:p-4 2xl:p-5 3xl:p-6 rounded-[12px] 2xl:rounded-[14px] 3xl:rounded-[17px] flex flex-col items-center">
              {data?.qrCode && (
                <div className="w-[100px] xl:w-[105px] 2xl:w-[125px] 3xl:w-[155px] aspect-square mb-4 xl:mb-5 2xl:mb-6 3xl:mb-7 relative z-0">
                  <Image
                    src={data?.qrCode}
                    alt="QR Code"
                    fill
                    sizes="155px"
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-1.5 xl:mb-2">
                <Image
                  src="/images/icon-whatsapp.svg"
                  alt="WhatsApp"
                  width={22}
                  height={22}
                  className="w-[14px] xl:w-[16px] 2xl:w-[18px] 3xl:w-[20px]"
                  unoptimized
                />
                <Text as="div" size="p1" className="text-white">
                  WhatsApp
                </Text>
              </div>
              <Text as="div" size="p1" className="text-white">
                <a
                  href={`https://wa.me/${data?.whatsappNumber}`}
                  target="_blank"
                >
                  {data?.whatsappNumber}
                </a>
              </Text>
            </div>

            <div className="w-full lg:flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-x-2 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-8 3xl:gap-x-10 gap-y-2 xl:gap-y-3.5 2xl:gap-y-6 3xl:gap-y-5">
                {data?.email && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-mail.svg"
                    title="Email"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`mailto:${data?.email}`}>{data?.email}</a>
                    </Text>
                  </ContactDetailsCard>
                )}
                <div className="md:col-start-1 md:row-start-2">
                  {data?.callCenterNumber && (
                    <ContactDetailsCard
                      icon="/images/icon-contact-call.svg"
                      title="Call Center"
                    >
                      <Text
                        as="div"
                        size="p1"
                        className="text-white flex gap-1"
                      >
                        {numbers?.map((num, index) => (
                          <React.Fragment key={index}>
                            <a href={`tel:${num.replace(/\s+/g, "")}`}>{num}</a>
                            {index !== numbers.length - 1 && " | "}
                          </React.Fragment>
                        ))}
                      </Text>
                    </ContactDetailsCard>
                  )}
                </div>
                <div className="md:row-span-2 md:col-start-2 md:row-start-1">
                  {data?.timing && (
                    <ContactDetailsCard
                      icon="/images/icon-clock.svg"
                      title="Timing"
                    >
                      <Text
                        as="div"
                        size="p1"
                        className="text-white [&_span]:text-[#bcbcbc] [&_span]:text-[80%]"
                      >
                        {parse(data?.timing)}
                      </Text>
                    </ContactDetailsCard>
                  )}
                </div>
                <div className="md:row-span-2 md:col-start-3 md:row-start-1">
                  {data?.locations && (
                    <ContactDetailsCard
                      // icon="/images/icon-contact-call.svg"
                      title="Manufacturing Locations"
                    >
                      {data?.locations?.[0]?.split(",").map((item, index) => (
                        <Text
                          key={"locations" + index}
                          as="div"
                          size="p1"
                          className="text-white w-full flex items-center gap-2 xl:gap-2.5 3xl:gap-3 my-2 xl:my-3 2xl:my-3.5 3xl:my-4"
                        >
                          <Image
                            src="/images/icon-customer-loc.svg"
                            alt="icon-customer-loc"
                            width={16}
                            height={21}
                            className="w-[10px] xl:w-[12px] 2xl:w-[14px] 3xl:w-[16px]"
                            unoptimized
                          />
                          {item.trim()}
                        </Text>
                      ))}
                    </ContactDetailsCard>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactDetailsCard({ children, title, icon }) {
  return (
    <div className="w-full h-full bg-[#272727] p-4 xl:p-5 2xl:p-6 3xl:p-8 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] transition-all hover:bg-[#27333a]">
      <Text
        as="div"
        size="p0"
        className="text-[15px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] text-white flex gap-2 mb-2 2xl:mb-2.5"
      >
        {
          icon && 
        <Image
        src={icon ?? ""}
        alt={title || "address"}
        width={20}
        height={20}
        className="w-3 2xl:w-4 3xl:w-5 aspect-square object-contain"
        />
      }
        {title || ""}
      </Text>
      {children}
    </div>
  );
}
