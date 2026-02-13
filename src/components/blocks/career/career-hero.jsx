
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";

export default function CareerHero({ data, locale }) {
  return (
    <section className="w-full py-[30px_15px] sm:py-[44px_28px] xl:py-[55px_35px] 2xl:py-[70px_44px]">
      <div className="container">
        <div className="w-full xl:w-1/2 max-w-[1104px] mx-auto">
          <Heading
            as="h2"
            size="h2"
            className="font-normal text-[#1e1e1e] text-center leading-[1]"
          >
            “We’re not just building projects
            we’re building future leaders.”
          </Heading>
        </div>
      </div>
    </section>
  );
}