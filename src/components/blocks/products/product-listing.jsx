import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function ProductListing({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="text-[80px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-transparent select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
        {parse(data?.title || "")}
      </div>
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-10 3xl:mb-12">
          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
            >
              {parse(data?.title || "")}
            </Heading>
            <Text
              as="p"
              size="p1"
              className="text-medium text-white mb-1 xl:mb-2 3xl:mb-3"
            >
              {parse(data?.description || "")}
            </Text>
          </div>
          <div className="w-full sm:w-auto flex"></div>
        </div>
      </div>
    </section>
  );
}
