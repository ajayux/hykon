import { ContactEnquiryForm } from "@/components/form/contact-enquiry-form";
import { Heading, Text } from "@/components/utils/typography";
import RecaptchaProvider from "@/components/common/recaptcha-provider";
import parse from "html-react-parser";
import Image from "next/image";

export default function ContactDetails({ data }) {
  return (
    <section className="w-full h-auto block py-4 xl:py-6 2xl:py-8 3xl:py-10 bg-[#444142] overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap gap-6 xl:gap-6.5 2xl:gap-7.5 3xl:gap-9">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-white mb-2 xl:mb-2 2xl:mb-2.5 3xl:mb-3"
            >
              {data?.title}
            </Heading>

            <div className="flex flex-wrap -mx-1.5 xl:-mx-1.75 2xl:-mx-2 3xl:-mx-2.5 [&>div]:p-1.5 xl:[&>div]:p-1.75 2xl:[&>div]:p-2 3xl:[&>div]:p-2.5">
              <div className="w-full">
                <ContactDetailsCard
                  icon="/images/icon-contact-loc.svg"
                  title="Address"
                >
                  <div className="grid grid-cols-2 xl:gap-10 2xl:gap-10 3xl:gap-10">
                    <Text as="div" size="p1" className="text-white">
                      {parse(data?.address)}
                    </Text>
                    <Text as="div" size="p1" className="text-white">
                      CIN: {data?.cin}
                      <br />
                      GST: {data?.gst}
                    </Text>
                  </div>
                </ContactDetailsCard>
              </div>

              <div className="w-full">
                {data?.customer_support && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-call.svg"
                    title="Customer Support"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`tel:${data?.customer_support}`}>
                        {data?.customer_support}
                      </a>
                    </Text>
                  </ContactDetailsCard>
                )}
              </div>
              <div className="w-full">
                {data?.service_support && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-loc.svg"
                    title="Service Support"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`tel:${data?.service_support}`}>
                        {data?.service_support}
                      </a>
                    </Text>
                  </ContactDetailsCard>
                )}
              </div>
              <div className="w-full">
                {data?.sales_support && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-loc.svg"
                    title="Sales Support"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`tel:${data?.sales_support}`}>
                        {data?.sales_support}
                      </a>
                    </Text>
                  </ContactDetailsCard>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                {data?.email && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-mail.svg"
                    title="EMAIL"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`mailto:${data?.email}`}>{data?.email}</a>
                    </Text>
                  </ContactDetailsCard>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                {data?.fax && (
                  <ContactDetailsCard
                    icon="/images/icon-contact-call.svg"
                    title="Fax"
                  >
                    <Text as="div" size="p1" className="text-white">
                      <a href={`mailto:${data?.fax}`}>{data?.fax}</a>
                    </Text>
                  </ContactDetailsCard>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[576px] xl:w-[650px] 2xl:w-[725px] 3xl:w-[885px]">
            <div className="w-full h-full bg-[#212121] p-4 sm:p-6 xl:p-8 2xl:p-9.5 3xl:p-12 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] flex items-center overflow-hidden relative z-0">
              <div className="absolute z-1 inset-0 left-auto pointer-events-none w-[25%] h-full  bg-linear-to-r from-transparent  to-[#008dd2]/30 " />
              <div className="w-full">
                <Heading as="h2" size="h1" className="text-white mb-1 xl:mb-2">
                  Enquiry Form
                </Heading>
                <Text
                  as="div"
                  size="p1"
                  className="text-white mb-6 xl:mb-6 2xl:mb-8 3xl:mb-10"
                >
                  Explore our best-selling and high-performance models.
                </Text>
                <RecaptchaProvider>
                  <ContactEnquiryForm />
                </RecaptchaProvider>
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
    <div className="w-full bg-[#171f23] p-4 xl:p-5 2xl:p-6 3xl:p-8 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] transition-all hover:bg-[#27333a]">
      <Text
        as="div"
        size="p0"
        className="uppercase text-white flex gap-2 mb-2 2xl:mb-2.5"
      >
        <Image
          src={icon}
          alt={title || "address"}
          width={20}
          height={20}
          className="w-3 2xl:w-3.5 3xl:w-4 aspect-square object-contain"
        />
        {title}
      </Text>
      {children}
    </div>
  );
}
