import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { Button } from "@/components/ui/button";

export default function BusinessHero({ data }) {
  return (
    <section className="w-full h-auto py-[100px] block relative z-0">
      <div className="w-full h-full absolute -z-1 inset-0">
        {data?.media?.type === "video" ? (
          <video
            src={data?.media?.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <picture className="w-full h-full block">
            <source srcSet={data?.media?.path} media="(min-width: 640px)" />
            <Image
              src={data?.media?.mobilePath || data?.media?.path}
              alt={data?.media?.alt || "Hero background"}
              fill
              sizes="100vw"
              className="object-cover"
              priority={true}
            />
          </picture>
        )}
      </div>
      <div className="container">
        <div className="w-full h-auto gap-[40px] flex flex-col">
          <div className="w-full h-auto flex items-center">
            <div className="w-[60%]">
              <Heading
                as="h2"
                size="h1"
                className="font-semibold text-white mb-[5px]"
              >
                {parse(data?.name)}
              </Heading>
              <div className="text-[16px] leading-normal font-normal text-white">
                {data?.designation}
              </div>
            </div>
            <div className="w-[40%]">
              <div className="w-full h-auto flex justify-end gap-[10px] [&>*]:w-[50px] [&>*]:h-auto [&>*]:aspect-square [&>*]:overflow-hidden [&>*]:block">
                <div>
                  <Image
                    src={"/images/business-card-account.svg"}
                    alt="Account"
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <Image
                    src={"/images/business-card-share.svg"}
                    alt="Share"
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-[10px]">
            {[
              {
                label: "Call",
                icon: "/images/call-icon.svg",
                url: data?.call,
              },
              {
                label: "Whatsapp",
                icon: "/images/whatsapp-icon.svg",
                url: data?.whatsapp,
              },
              {
                label: "Direction",
                icon: "/images/direction-icon.svg",
                url: data?.direction,
              },
              {
                label: "Mail",
                icon: "/images/Mail-icon-card.svg",
                url: data?.mail,
              },
              {
                label: "Website",
                icon: "/images/website-icon.svg",
                url: data?.website,
              },
            ].map((item) => (
              <Link
                key={item?.label}
                href={item?.url}
                target="_blank"
                className="w-auto h-full p-[10px_20px] rounded-[30px] border-1 border-white transition-all duration-300 flex items-center hover-bg-[#008DD2]"
              >
                <span className="w-[15px] h-auto aspect-square overflow-hidden block">
                  <Image
                    src={item?.icon}
                    alt={item?.label}
                    width={15}
                    height={15}
                    className="w-full h-full object-contain"
                  />
                </span>
                <Text
                  as="span"
                  size="p1"
                  className="text-white w-[calc(100%-15px)] pl-[10px]"
                >
                  {item?.label}
                </Text>
              </Link>
            ))}
          </div>
          <div className="w-full h-auto gap-[15px] flex flex-col">
            {[
              {
                url: null,
                label: data?.address,
                icon: "/images/card-business-icon.svg",
              },
              {
                type: "call",
                url: data?.companyCall,
                label: data?.companyCall,
                icon: "/images/card-call-icon.svg",
              },
              {
                type: "mail",
                url: data?.companyMail,
                label: data?.companyMail,
                icon: "/images/card-mail-icon.svg",
              },
            ].map((item) =>
              item.url ? (
                <Link
                  key={item?.label}
                  href={
                    item.type === "call"
                      ? `tel:${item?.url}`
                      : item.type === "mail"
                        ? `mailto:${item?.url}`
                        : item?.url
                  }
                  target="_blank"
                  className="w-full h-full flex items-center"
                >
                  <div className="w-[35px] h-auto aspect-square overflow-hidden block">
                    <Image
                      src={item?.icon}
                      alt={item?.label}
                      width={35}
                      height={35}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Text
                    as="div"
                    size="p0"
                    className="font-medium text-white w-[calc(100%-35px)] pl-[20px]"
                  >
                    {item?.label}
                  </Text>
                </Link>
              ) : (
                <div
                  key={item?.label}
                  className="w-full h-full flex items-center"
                >
                  <div className="w-[35px] h-auto aspect-square overflow-hidden block">
                    <Image
                      src={"images/adress-icon.svg"}
                      alt="Address"
                      width={35}
                      height={35}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Text
                    as="div"
                    size="p0"
                    className="font-medium text-white w-[calc(100%-35px)] pl-[20px]"
                  >
                    {item?.label}
                  </Text>
                </div>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-x-[40px]">
            {data?.sociallinks?.map((item, index) => (
              <div key={"social_link" + index}>
                <Button variant="link" size="none" asChild>
                  <a href={item?.link} target="_blank" className="block">
                    <Image
                      src={item?.icon}
                      alt={item?.name}
                      width={18}
                      height={18}
                      className="w-4 sm:w-3 xl:w-3.5 2xl:w-4 3xl:w-4.5 aspect-square block hover:scale-110 transition"
                      unoptimized
                    />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
