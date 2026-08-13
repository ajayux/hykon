"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading, Text } from "../../utils/typography";

export default function LandingPower({ data, isSidebarOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  return (
    <section className="w-full h-auto py-[20px] xl:py-[30px_25px] 2xl:py-[40px_30px] 3xl:py-[50px_35px]">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="text-center w-auto lg:max-w-[485px] 2xl:max-w-[585px] 3xl:max-w-[740px] mx-auto mb-[20px] lg:mb-[30px] 2xl:mb-[40px] 3xl:mb-[50px]">
          <Heading
            as="h2"
            size="h2"
            className="text-medium text-white mb-[10px]"
          >
            {parse(data?.title)}
          </Heading>
          <Text as="div" size="p1" className="text-normal text-white/80">
            {parse(data?.description)}
          </Text>
        </div>
        <div
          className="group w-full h-auto aspect-[1255/475] rounded-[5px] 2xl:rounded-[10px] overflow-hidden cursor-pointer block relative z-0"
          onClick={() => {
            if (!isPlaying) {
              videoRef.current?.play();
              setIsPlaying(true);
            }
          }}
        >
          <video
            ref={videoRef}
            src={data?.media?.videoPath}
            preload="auto"
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onClick={(e) => {
              if (!isPlaying) return;
              e.stopPropagation();
              if (e.target.paused) {
                e.target.play();
              } else {
                e.target.pause();
              }
            }}
          />
          {!isPlaying && (
            <>
              <Image
                src={data?.media?.thumbnailPath}
                alt={data?.media?.alt}
                width={1250}
                height={475}
                className="w-full h-full object-cover transition-all duration-300 absolute inset-0 z-1"
              />
              <div className="text-[11px] 2xl:text-[15px] leading-normal font-medium text-white w-auto h-auto gap-[5px] 2xl:gap-[10px] p-[5px_10px] sm:p-[10px_15px] m-auto bg-black/30 rounded-[5px] 2xl:rounded-[8px] backdrop-blur-[15px] overflow-hidden inline-flex items-center absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="w-[20px] 2xl:w-[25px] h-auto aspect-square overflow-hidden block">
                  <Image
                    src="/images/landing-power-playicon.svg"
                    alt="Play Icon"
                    width={25}
                    height={25}
                    className="w-full h-full object-contain"
                  />
                </span>
                Watch Video
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
