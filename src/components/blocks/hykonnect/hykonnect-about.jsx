import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function HykonnectAbout({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-[20px_40px] lg:py-[30px_60px] 2xl:py-[40px_70px] 3xl:py-[50px_90px]">
      <div className="container lg:max-w-[1020px] 2xl:max-w-[1160px] 3xl:max-w-[1450px]">
        <div className="text-center">
          <Heading
            as="h2"
            size="h1"
            className="font-medium text-white mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
          >
            {parse(data.title)}
          </Heading>
          <div className="typography [--text-color:#fff]">
            {parse(data.description)}
          </div>
        </div>
      </div>
    </section>
  );
}
