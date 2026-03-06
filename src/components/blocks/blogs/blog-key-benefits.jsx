import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function BlogKeyBenefits({ data }) {
  return (
    <section className="w-full h-auto block py-3 sm:py-4 xl:py-4.75 2xl:py-6 3xl:py-7.5 bg-[#181818] overflow-hidden">
      <div className="container">
        <div className="w-full block px-20 xl:px-[48px_26px] 2xl:px-[62px_34px] 3xl:px-[78px_42px] py-6 xl:py-8.5 2xl:py-11.5 3xl:py-13.75 rounded-[6px] sm:rounded-[8px] xl:rounded-[12px] 2xl:rounded-[16px] 3xl:rounded-[20px] bg-[#202020] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
       
              <div className="aspect-[600/335] overflow-hidden rounded-[4px] sm:rounded-[6px] xl:rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px]">
                <Image
                  src={data?.media?.path}
                  alt={data?.media?.alt}
                  width={600}
                  height={335}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
       
            <div className="pl-20 sm:pl-[40px] xl:pl-[55px] 2xl:pl-[70px] 3xl:pl-[88px]">
              <Heading
                as="h2"
                size="h2"
                className="leading-tight text-white normal text-[16px] sm:text-[20px] xl:text-[28px] 2xl:text-[36px] 3xl:text-[45px] mb-2 xl:mb-2.4 2xl:mb-2.5 3xl:mb-3"
              >
                {parse(data.title)}
              </Heading>
              <ul className="grid grid-cols-2 gap-4 xl:gap-6 2xl:gap-8">
                {data?.items?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 xl:gap-6 2xl:gap-8 border border-white/50 rounded-[4px] sm:rounded-[6px] xl:rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] p-4 xl:p-5 2xl:p-6"
                  >
                    <div className="aspect-[45/45] w-[45px] mb-3">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={45}
                        height={45}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <Heading
                      as="h3"
                      size="h3"
                      className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight text-white"
                    >
                      {parse(item.title)}
                    </Heading>
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
