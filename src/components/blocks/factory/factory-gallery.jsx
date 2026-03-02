import { Heading } from "@/components/utils/typography";
import Image from "next/image";
import Fancybox from "@/components/common/fancybox";

export default function FactoryGallery({ data }) {
  return (
    <section className="w-full h-auto block py-10 xl:py-[80px_60px] 2xl:py-[90px_65px] 3xl:py-[110px_80px] bg-[#181818] overflow-hidden">
      <div className="container">
        <Heading
          as="h2"
          size="h2"
          className="text-center text-white mb-6 xl:mb-10 2xl:mb-12 3xl:mb-15"
        >
          {data?.title}
        </Heading>

        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <div className="flex flex-wrap justify-center -mx-1 xl:-mx-1.5 2xl:-mx-2 3xl:-mx-2.5">
            {data?.items?.map((item) => (
              <div
                key={item?.id}
                className="w-1/2 sm:w-1/3 lg:w-1/3 p-1 xl:p-1.5 2xl:p-2 3xl:p-2.5"
              >
                <a
                  data-fancybox="gallery"
                  href={item?.media?.path}
                  className="block w-full aspect-[500/333] overflow-hidden rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] group cursor-zoom-in"
                >
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={500}
                    height={333}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </a>
              </div>
            ))}
          </div>
        </Fancybox>
      </div>
    </section>
  );
}
