import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";

export default function AboutMission({ data }) {
  const { mission, vision, values } = data;
  return (
    <section className="w-full py-12 sm:py-20 lg:py-[45px] 2xl:py-[54px] 3xl:py-[68px] bg-[#008dd2]">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-x-10 lg:gap-x-[65px] 2xl:gap-x-[74px] 3xl:gap-x-[94px]">
          {mission && <MissionCard data={mission} />}
          <div className="w-[1px] h-[140px] xl:h-[210px] 2xl:h-[250px] 3xl:h-[310px] bg-linear-to-b from-transparent via-white to-transparent opacity-50" />
          {vision && <MissionCard data={vision} />}
          <div className="w-[1px] h-[140px] xl:h-[210px] 2xl:h-[250px] 3xl:h-[310px] bg-linear-to-b from-transparent via-white to-transparent opacity-50" />
          {values && <MissionCard data={values} />}
        </div>
      </div>
    </section>
  );
}

function MissionCard({ data }) {
  return (
    <div
      key={data?.id}
      className="w-full max-w-[220px] xl:max-w-[240px] 2xl:max-w-[280px] 3xl:max-w-[360px]"
    >
      <div className="w-10 xl:w-[42px] 2xl:w-[52px] 3xl:w-[65px] mx-auto mb-3 xl:mb-4 2xl:mb-5 3xl:mb-7">
        <Image
          src={data?.media?.path}
          alt={data?.media?.alt}
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>
      <Heading
        as="h3"
        size="h4"
        className="lg:text-[30px] 2xl:text-[36px] 3xl:text-[45px] font-medium text-center text-white mb-1 xl:mb-2.5 2xl:mb-3.5 3xl:mb-5"
      >
        {data?.title}
      </Heading>
      <Text as="div" size="p1" className="text-center text-white">
        {data?.description}
      </Text>
    </div>
  );
}
