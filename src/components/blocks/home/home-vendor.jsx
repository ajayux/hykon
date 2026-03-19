import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function HomeVendor({ data }) {
  return (
    <div className="w-full h-full border-1 border-[#D3D7D9] rounded-[7px] 2xl:rounded-[8px] 3xl:rounded-[10px] p-[20px] xl:p-[40px] 3xl:p-[60px] flex items-center max-sm:justify-center">
      <div className="flex flex-col">
        <Heading
          as="h2"
          size="h3"
          className="xl:text-[34px] 2xl:text-[40px] 3xl:text-[50px] text-medium text-white mb-2 xl:mb-3 3xl:mb-4 max-sm:text-center"
        >
          {parse(data?.title)}
        </Heading>
        <Text
          as="p"
          size="p1"
          className="text-medium text-white mb-4 lg:mb-2 xl:mb-8 3xl:mb-12 max-sm:text-center"
        >
          {parse(data?.description)}
        </Text>
        <div className="flex">
          <Button
            size="lg"
            variant="outline"
            className="text-center text-white min-w-[140px] xl:min-w-[145px] 2xl:min-w-[175px] 3xl:min-w-[213px] pl-4 max-sm:mx-auto"
            asChild
          >
            <Link href={`/vendor-registration`}>
              {data?.button?.label}
              <div className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                <Image
                  src={"/images/icon-arrow-right-white.svg"}
                  alt={"icon-arrow-right-white"}
                  width={18}
                  height={13}
                  className="w-1/2"
                  unoptimized
                />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
