import Image from "next/image";
import { Heading } from "@/components/utils/typography";

export default function InnerHero({ data }) {
  return (
    <section className="w-full h-[320px] sm:h-[376px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[600px] bg-black overflow-hidden flex items-end relative z-0">
      <div className="w-full h-full bg-gradient-to-r from-black via-black/0 to-transparent absolute -z-1 inset-0 opacity-30" />
      {data?.media?.media_type === "video" ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute -z-2 inset-0 block sm:hidden"
          >
            <source src={data?.media?.mobilePath} type="video/mp4" />
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute -z-2 inset-0 hidden sm:block"
          >
            <source src={data?.media?.desktopPath} type="image/webp" />
          </video>
        </>
      ) : (
        <picture className="absolute -z-2 inset-0">
          <source
            media="(max-width: 640px)"
            srcSet={data?.media?.mobilePath || data?.media?.path}
          />
          <Image
            src={data?.media?.desktopPath || data?.media?.path}
            alt={data?.media?.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="-z-2 object-cover"
          />
        </picture>
      )}
      <div className="container">
        <div className="w-full py-[20px] sm:py-[40px] lg:py-[60px] xl:py-[75px] 2xl:py-[90px] 3xl:py-[110px]">
          <Heading
            as="h1"
            size="h1"
            className="leading-none font-normal text-white"
          >
            {data?.title}
          </Heading>
        </div>
      </div>
    </section>
  );
}
