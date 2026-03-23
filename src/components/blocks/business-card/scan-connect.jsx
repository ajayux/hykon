import Image from "next/image";

export default function ScanConnect({ data }) {
  return (
    <section className="w-full h-auto py-[30px] bg-black block">
      <div className="container">
        <div className="text-[28px] leading-normal font-medium text-white mb-[25px]">
          {data?.title}
        </div>
        <div className="w-full sm:max-w-[350px] h-auto aspect-square p-[20px_15px] rounded-[18px] border-2 border-white/45 overflow-hidden block">
          <Image
            src={data?.path}
            alt={data?.alt}
            width={350}
            height={350}
            className="w-full h-full rounded-[2px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
