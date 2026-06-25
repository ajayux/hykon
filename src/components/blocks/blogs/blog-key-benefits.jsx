import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import parse from "html-react-parser";

export default function BlogKeyBenefits({ data }) {
  return (
    <section className="w-full h-auto block py-[15px_20px] sm:py-[20px_25px] xl:py-[25px_30px] 2xl:py-[30px_40px] 3xl:py-[40px_50px] bg-[#444142] overflow-hidden">
      <div className="container">
        <div className="w-full block px-[20px] sm:px-[35px] xl:px-[35px_26px] 2xl:px-[62px_34px] 3xl:px-[78px_42px] py-6 xl:py-8.5 2xl:py-11.5 3xl:py-13.75 rounded-[6px] sm:rounded-[8px] xl:rounded-[12px] 2xl:rounded-[16px] 3xl:rounded-[20px] bg-[#202020] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] 2xl:grid-cols-2 items-center">
       
              <div className="w-auto h-auto aspect-[742/415]  rounded-[4px] sm:rounded-[6px] xl:rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] overflow-hidden">
                <Image
                  src={data?.media?.path}
                  alt={data?.media?.alt}
                  width={742}
                  height={415}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
       
            <div className="pl-0 md:pl-[40px] xl:pl-[55px] 2xl:pl-[70px] 3xl:pl-[88px] mt-5 md:mt-0">
              <Heading
                as="h2"
                size="h2"
                className="leading-tight text-white font-normal text-[16px] sm:text-[20px] xl:text-[28px] 2xl:text-[36px] 3xl:text-[45px] mb-2 sm:mb-4 xl:mb-6 2xl:mb-7.5 3xl:mb-10"
              >
                {parse(data.title)}
              </Heading>
              <ul className="grid grid-cols-2 gap-[10px_8px] sm:gap-[12px_10px] xl:gap-[20px_18px] 2xl:gap-[25px_22px] 3xl:gap-[30px_28px]"> 
                {data?.items?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 xl:gap-6 2xl:gap-[30px] border border-white/50 rounded-[4px] sm:rounded-[6px] xl:rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] p-[10px_12px] xl:p-[14px_18px] 2xl:p-[17px_24px] 3xl:p-[22px_30px]"
                  >
                    <div className="w-[20px] sm:w-[25px] xl:w-[35px] 2xl:w-[45px] 3xl:w-[56px] h-[25px] sm:h-[30px] xl:h-[35px] 2xl:h-[45px] 3xl:h-[56px]">
                      <Image
                        src={item?.media?.path}
                        alt={item.media?.alt}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    
                    <Text
                      as="div"
                      size="p0"
                      className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight text-white"
                    >
                      {parse(item?.title)}
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
