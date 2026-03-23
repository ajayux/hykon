import Image from "next/image";
import parse from "html-react-parser";

export default function BusinessAbout({ data }) {
  return (
    <section className="w-full h-auto py-[40px_60px] bg-[#00151f] block">
      <div className="container">
        <div className="w-full h-auto mb-[50px]">
          <div className="text-[28px] leading-normal font-medium text-white mb-[15px]">
            {data?.title}
          </div>
          {data?.subTitle && (
            <div className="text-[20px] leading-normal italic font-medium text-white mb-[15px]">
              {data?.subTitle}
            </div>
          )}
          <div className="[&_p]:text-[18px] [&_p]:leading-normal [&_p]:font-normal [&_p]:text-white space-y-[30px]">
            {parse(data?.description)}
          </div>
        </div>
        <div className="w-full h-auto space-y-[65px]">
          {data?.vissionList?.map((item) => (
            <div key={item?.id} className="w-full h-auto block">
              <div className="w-full h-full space-y-[20px] block">
                <div className="w-[45px] h-auto aspect-square overflow-hidden block">
                  <Image
                    src={item?.iconPath}
                    alt={item?.title}
                    width={45}
                    height={45}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[28px] leading-normal font-medium text-white">
                  {item?.title}
                </div>
                <div className="text-[18px] leading-normal font-normal text-white">
                  {item?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
