import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function HomeVendor({ data }) {
  return (
    <div className="w-full h-full border-1 border-[#D3D7D9] rounded-[10px] p-[20px] xl:p-[40px] 3xl:p-[60px] flex items-center">
      <div>
        <Heading
          as="h2"
          size="h3"
          className="text-medium text-white mb-2 xl:mb-8 3xl:mb-12"
        >
          {parse(data?.title)}
        </Heading>
        <Text
          as="p"
          size="p1"
          className="text-medium text-white mb-2 xl:mb-8 3xl:mb-12"
        >
          {parse(data?.description)}
        </Text>
        <Button
          size="lg"
          variant="outline"
          className="text-white min-w-[160px] xl:min-w-[190px] 2xl:min-w-[240px] pl-4"
          asChild
        >
          <Link href={data?.button?.link}>
            {data?.button?.label}
            <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
              <Image
                src={"/images/icon-arrow-right-white.svg"}
                alt={"icon-arrow-right-white"}
                width={18}
                height={13}
                className="w-4.5"
                unoptimized
              />
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
