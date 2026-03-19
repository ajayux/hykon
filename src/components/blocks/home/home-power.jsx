import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function HomePower({ data }) {
  return (
    <div className="w-full h-full bg-[#008DD2] overflow-hidden p-[20px] xl:p-[40px] 3xl:p-[60px] rounded-[14px] 2xl:rounded-[16px] 3xl:rounded-[20px] relative z-0">
      <div className="w-full h-full bg-linear-to-t from-black via-black/30 to-black/90 absolute -z-1 inset-0 opacity-50" />
      <Image
        src={"/images/home-calculate-bg.png"}
        alt={"home-calculate-bg"}
        width={1360}
        height={125}
        className="w-full h-full absolute -z-1 inset-0 object-cover pointer-events-none opacity-50"
      />
      <div className="flex flex-col">
        <Heading
          as="h2"
          size="h1"
          className="leading-tight text-medium text-center text-white mb-1 xl:mb-2 3xl:mb-3 xl:max-w-[70%] mx-auto"
        >
          {parse(data?.title)}
        </Heading>
        <Text
          as="p"
          size="p1"
          className="text-normal text-center text-white mb-4 lg:mb-2 xl:mb-10 3xl:mb-14"
        >
          {parse(data?.description)}
        </Text>
        <Button
          size="lg"
          variant="white"
          className="text-[#020205] min-w-[120px] xl:min-w-[160px] 2xl:min-w-[190px] 3xl:min-w-[235px] pl-4 mx-auto"
          asChild
        >
          <Link href={`/power-calculator`}>
            {data?.button?.label}

            <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
              <Image
                src={"/images/icon-arrow-right-white.svg"}
                alt={"icon-arrow-right-white"}
                width={18}
                height={13}
                className="w-6/10"
                unoptimized
              />
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
