import { Heading } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function MapSection({ data }) {
  return (
    <section className="w-full h-auto block py-10 xl:py-15 2xl:py-20 3xl:py-24 bg-[#181818]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center font-medium text-white mb-4 xl:mb-6 2xl:mb-8 3xl:mb-10"
        >
          {data?.title}
        </Heading>
        {data?.map_iframe && (
          <div className="w-full aspect-9/7 lg:aspect-[154/46] bg-black rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] overflow-hidden">
            <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full border-none">
              {parse(data?.map_iframe || "")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
