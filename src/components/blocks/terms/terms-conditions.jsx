import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { ParsedContent } from "@/lib/utils";


export default function TermsAndConditions({ data }) {
  return (
    <section className="w-full h-auto block py-[var(--header-y)] bg-[linear-gradient(0deg,_rgba(24,24,24,1)_0%,_rgba(24,24,24,1)_58%,_rgba(19,51,68,1)_100%)] overflow-hidden">
      <div className="container">
        <div className="typography w-full block mb-4 xl:mb-6 2xl:mb-7 3xl:mb-9">
          <Heading
            as="h1"
            size="h1"
            className="leading-tight font-normal text-white mb-4"
          >
            {parse(data?.title || "")}
          </Heading>
          {data?.text && (
            <div className="typography [--text-color:#fff] mb-4 lg:mb-8 xl:mb-10 2xl:mb-12 3xl:mb-14">
              {parse(data?.text || "")}
            </div>
          )}

          <div className="typography [--text-color:#fff] [&_h5]:mt-[15px] sm:[&_h5]:mt-[18px] xl:[&_h5]:mt-[22px] 2xl:[&_h5]:mt-[28px] 3xl:[&_h5]:mt-[35px]">
            <ParsedContent html={data.content} />
          </div>
        </div>
      </div>
    </section>
  );
}
