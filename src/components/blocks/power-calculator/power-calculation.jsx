import { Heading } from "@/components/utils/typography";

export default function PowerCalculation({ data }) {
  return (
    <section className="w-full h-auto block pt-8 xl:pt-10 2xl:pt-12 3xl:pt-15 pb-15 xl:pb-35 2xl:pb-40 3xl:pb-50 bg-[#181818]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-medium text-white mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-15"
        >
          {data?.title}
        </Heading>
        <div className="flex flex-wrap sm:gap-x-6 xl:gap-x-10 2xl:gap-x-12.5 3xl:gap-x-15">
          <div className="w-full sm:flex-1">left</div>
          <div className="w-full sm:w-[220px] xl:w-[255px] 2xl:w-[355px] 3xl:w-[372px]">
            <div className="w-full bg-[#252525] border-[#676767]/80 rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
