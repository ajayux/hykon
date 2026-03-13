import Image from "next/image";
import { Heading, Text } from "../utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FormSubmitResponse({ imagePath, title, description }) {
  return (
    <div className="w-full max-w-[320px] xl:max-w-[360px] 2xl:max-w-[420px] 3xl:max-w-[540px] h-auto mx-auto py-20">
      <div className="w-[40px] xl:w-[60px] 2xl:w-[80px] 3xl:w-[100px] aspect-square mx-auto mb-7.5 2xl:mb-8 3xl:mb-10">
        <Image
          src={imagePath}
          alt={title}
          width={120}
          height={120}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
      <Heading
        as="h2"
        size="h3"
        className="text-center text-white mb-2 2xl:mb-3 3xl:mb-4"
      >
        {title}
      </Heading>
      <Text as="div" size="p1" className="font-normal text-center text-white">
        {description}
      </Text>
      <div className="w-full flex justify-center mt-4 xl:mt-6">
        <Button
          size="lg"
          variant="outline"
          className="text-white min-w-[100px] xl:min-w-[115px] 2xl:min-w-[135px] 3xl:min-w-[160px] pl-4"
          asChild
        >
          <Link href={"/"}>
            Go Back to Home
            <span className="w-4 xl:w-5.5 2xl:w-6.5 3xl:w-8 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center ml-auto">
              <Image
                src={"/images/icon-arrow-right-white.svg"}
                alt={"icon-arrow-right-white"}
                width={18}
                height={13}
                className="w-1/2"
                unoptimized
              />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
