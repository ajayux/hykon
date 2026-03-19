import Image from "next/image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/typography";
import { Link } from "lucide-react";

export default function BusinessCardHero({ data }) {
  return (
    <section className="w-full h-auto py-[50px] block relative z-0">
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
        <div className="w-full h-auto flex items-center">
          <div className="w-[60%]">
            <Heading
              as="h2"
              size="h1"
              className="font-semibold text-white mb-[5px]"
            >
              {parse(data?.title)}
            </Heading>
            <div className="text-[16px] leading-normal font-normal text-white">
              {data?.designation}
            </div>
          </div>
          <div className="w-[40%]">
            <div className="w-full h-auto flex gap-[10px] [&>*]:w-[50px] [&>*]:h-auto [&>*]:aspect-square [&>*]:overflow-hidden [&>*]:block">
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
          {data?.quickLinks?.map((item) => (
            <div key={item?.id} className="w-auto h-auto block">
              <Link
                href={item?.link}
                target={item?.isExternal ? "_blank" : "_self"}
                className="w-full h-full flex items-center"
              >
                <span className="w-[15px] h-auto aspect-square overflow-hidden block">
                  <Image
                    src={item?.iconPath}
                    alt={item?.title}
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
                  {item?.title}
                </Text>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full h-auto block">

        </div>
      </div>
    </section>
  );
}
