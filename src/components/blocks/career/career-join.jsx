"use client";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function CareerJoin({ data, locale}) {
  const [emblaRef] = useEmblaCarousel(
      {
        loop: false,
        direction: locale === "ar" ? "rtl" : "ltr",
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
      },
      [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );

  const joinData = {
    title: "Why Join Us",
    description: "We're committed to creating an environment where everyone can thrive, innovate, and make an impact.",
  };

  const slides = data?.length ? data : [
    {
      image: "/images/career-join-slider-1.svg", 
      title: "Professional Growth", 
      txt: "Continuous learning opportunities and career advancement" 
    },
    { 
      image: "/images/career-join-slider-2.svg",
      title: "Innovation", 
      txt: "Freedom to experiment and bring creative ideas to life" 
    },
    { 
      image: "/images/career-join-slider-3.svg",
      title: "Collaboration", 
      txt: "Work with talented, supportive teammates who inspire you" 
    },
    
  ];
  
  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div className="w-full border-t border-black/10 pt-[20px] sm:pt-[25px] xl:pt-[32px] 2xl:pt-[42px] 3xl:pt-[50px]">
          <Heading
            as="h2"
            size="h3"
            className="font-normal text-[#1e1e1e] text-center"
          >
            {joinData.title}
            
          </Heading>
          <Text
              as="div"
              size="p1"
              className="text-[#1e1e1e] text-center"
            >
              {joinData.description}
            </Text>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="w-full max-w-full py-[18px] sm:py-[20px_25px] xl:py-[50px_52px] 2xl:py-[65px_70px] 3xl:py-[84px] overflow-hidden" data-cursor="carousel">
          <div className="flex touch-pan-y touch-pinch-zoom mx-[-2.5] sm:mx-[-4] xl:mx-[-6.25] 2xl:mx-[-8] 3xl:mx-[-10] [&>*]:px-2.5 sm:[&>*]:px-4 xl:[&>*]:px-6.25 2xl:[&>*]:px-8 3xl:[&>*]:px-10">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-[0_0_220px] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 select-none"
              >
                <div className="w-full h-full bg-[#FFFBF2] p-[18px_25px_18px_18px] sm:p-[20px_45px_20px_25px] xl:p-[32px_85px_32px_36px] 2xl:p-[41px_130px_41px_46px] 3xl:p-[52px_140px_52px_58px]">
                  <div className="w-[40px] sm:w-[56px] xl:w-[72px] 2xl:w-[86px] h-[40px] sm:h-[56px] xl:h-[72px] 2xl:h-[86px]  mb-[40px] sm:mb-[56px] xl:mb-[72px] 2xl:mb-[80px] overflow-hidden">
                    <Image
                        src={slide.image}
                        alt="join image"
                        width={86}
                        height={86}
                        className="w-full h-full object-contain"
                      />  
                  </div>
                  <Heading
                  as="h2"
                  size="h4"
                  className="font-normal text-[#1e1e1e] leading-[1] mb-[10px] xl:mb-[12px] 2xl:mb-[15px] 3xl:mb-[20px]"
                >{slide.title}</Heading>
                <Text
                  as="div"
                  size="p1"
                  className="text-[#1e1e1e]"
                >
                  {slide.txt}
                </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      </div>
    </section>
  );
}