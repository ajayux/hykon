import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading, Text } from "../../utils/typography";
import { Button } from "../../ui/button";

export default function LandingFooter({ data, isSidebarOpen }) {
  return (
    <footer className="w-full h-auto pt-[20px] sm:pt-[30px] 2xl:pt-[40px] 3xl:pt-[50px] bg-[#212121] block">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-[25%] max-sm:mb-[30px] max-lg:mb-[40px]">
            <div className="w-[100px] sm:w-[120px] 2xl:w-[150px] 3xl:w-[175px] h-auto aspect-[175/55] mb-[10px] sm:mb-[15px] 2xl:mb-[20px] 3xl:mb-[25px] overflow-hidden block">
              <Image
                src={data?.logoUrl}
                alt={data?.logoName}
                width={175}
                height={55}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[12px] 3xl:text-[14px] leading-normal font-normal text-white max-w-[220px] 3xl:max-w-[280px]">
              {data?.description}
            </div>
          </div>
          <div className="w-full lg:w-[75%] lg:pl-[10px]">
            <div className="w-full h-auto pb-[20px] sm:pb-[30px] 2xl:pb-[40px] border-b border-white/25 flex items-center flex-wrap">
              <div className="w-auto h-auto pr-[20px] sm:pr-[50px] lg:pr-[70px] 2xl:pr-[90px] 3xl:pr-[120px] block">
                <Link
                  href={`tel:${data?.contactInfo?.phone}`}
                  target={data?.contactInfo?.isExternal ? "_blank" : "_self"}
                  className="group w-full h-full flex items-center"
                >
                  <div className="w-[35px] sm:w-[40px] 2xl:w-[50px] 3xl:w-[60px] h-auto aspect-square p-[10px] sm:p-[12px] 2xl:p-[15px] bg-[#393939] rounded-full overflow-hidden block">
                    <Image
                      src={"/images/call-icon.svg"}
                      alt="Call"
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[calc(100%-35px)] sm:w-[calc(100%-40px)] 2xl:w-[calc(100%-50px)] 3xl:w-[calc(100%-60px)] pl-[10px] sm:pl-[15px] 2xl:pl-[25px]">
                    <Heading
                      as="div"
                      size="h5"
                      className="font-normal text-white transition-colors duration-300 group-hover:text-[#008DD2]"
                    >
                      <span className="text-[#008DD2] block">Call Us</span>
                      {data?.contactInfo?.phone}
                    </Heading>
                  </div>
                </Link>
              </div>
              <div className="w-auto h-auto block">
                <Link
                  href={`mailto:${data?.contactInfo?.email}`}
                  target={data?.contactInfo?.isExternal ? "_blank" : "_self"}
                  className="group w-full h-full flex items-center"
                >
                  <div className="w-[35px] sm:w-[40px] 2xl:w-[50px] 3xl:w-[60px] h-auto aspect-square p-[10px] sm:p-[12px] 2xl:p-[15px] bg-[#393939] rounded-full overflow-hidden block">
                    <Image
                      src={"/images/mail-icon.svg"}
                      alt="Mail"
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-[calc(100%-35px)] sm:w-[calc(100%-40px)] 2xl:w-[calc(100%-50px)] 3xl:w-[calc(100%-60px)] pl-[10px] sm:pl-[15px] 2xl:pl-[25px]">
                    <Heading
                      as="div"
                      size="h5"
                      className="font-normal text-white transition-colors duration-300 group-hover:text-[#008DD2]"
                    >
                      <span className="text-[#008DD2] block">Mail Us </span>
                      {data?.contactInfo?.email}
                    </Heading>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full h-auto -mx-[5px] sm:-mx-[7px] 2xl:-mx-[10px] 3xl:-mx-[15px] py-[20px] sm:py-[30px] 2xl:py-[40px] 3xl:py-[50px] flex flex-wrap">
              {data?.locations?.map((item) => (
                <div
                  key={item?.id}
                  className="w-auto h-auto p-[7px] sm:p-[7px] 2xl:p-[10px] 3xl:p-[15px] inline-flex"
                >
                  <Link
                    href={`mailto:${item?.email}`}
                    target={item?.isExternal ? "_blank" : "_self"}
                    className="group w-full h-full flex"
                  >
                    <div className="w-[13px] 2xl:w-[15px] h-[20px] mt-[2px] 3xl:mt-[5px] overflow-hidden block">
                      <Image
                        src={"/images/location-icon.svg"}
                        alt="Mail"
                        width={15}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-[calc(100%-13px)] 2xl:w-[calc(100%-15px)] pl-[7px] 2xl:pl-[10px]">
                      <Heading
                        as="div"
                        size="h5"
                        className="font-normal text-white transition-colors duration-300 group-hover:text-[#008DD2]"
                      >
                        <span className="lg:mb-[8px] 2xl:mb-[15px] block">
                          {item?.title}
                        </span>
                        {item?.email}
                      </Heading>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black py-2 sm:py-3 xl:py-4 2xl:py-4.5">
        <div className="container opacity-95">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-2 sm:gap-x-5 ">
            <Text as="div" size="p2" className="tracking-wide text-white">
              {parse(data?.copyright)}
            </Text>
            <div className="flex flex-wrap gap-x-4 xl:gap-x-6 2xl:gap-x-7 3xl:gap-x-11">
              {data?.socialLinkData?.map((item, index) => (
                <div key={"social_link" + index}>
                  <Button variant="link" size="none" asChild>
                    <a href={item?.link} target="_blank" className="block">
                      <Image
                        src={item?.icon}
                        alt={item?.name}
                        width={18}
                        height={18}
                        className="w-4 sm:w-3 xl:w-3.5 2xl:w-4 3xl:w-4.5 aspect-square object-contain block hover:scale-110 transition"
                        unoptimized
                      />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            <Text
              as="div"
              size="p2"
              className="whitespace-nowrap text-end tracking-wide text-white flex"
            >
              Designed & Developed by:
              <a href="https://www.intersmartsolution.com/" target="_blank">
                <Image
                  src="/images/footer-author.svg"
                  alt="footer-author"
                  width={100}
                  height={20}
                  className="w-[70px] sm:w-[50px] xl:w-[70px] 2xl:w-[85px] inline ml-1"
                  unoptimized
                />
              </a>
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
