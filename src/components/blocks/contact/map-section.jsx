import { Heading } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function MapSection({ data }) {
  return (
    <section className="w-full h-auto block py-10 xl:py-15 2xl:py-20 3xl:py-24 bg-[#444142]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-center font-medium text-white mb-4 xl:mb-6 2xl:mb-8 3xl:mb-10"
        >
          {data?.title}
        </Heading>
        {data?.mapIframe && (
          <div className="w-full aspect-9/7 lg:aspect-[154/46] bg-black rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px] overflow-hidden">
            <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full border-none">
              {parse(data?.mapIframe || "")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
