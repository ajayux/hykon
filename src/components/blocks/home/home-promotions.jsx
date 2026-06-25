import Image from "next/image";
import Link from "next/link";

export default function HomePromotions({ data }) {
  return (
    <section className="w-full h-auto block bg-[#444142] py-10 xl:pt-15 2xl:pt-17.5 3xl:pt-20 xl:pb-9 2xl:pb-10 3xl:pb-11 relative z-0">
      <div className="container">
        <Link
          href={`https://play.google.com/store/apps/details?id=in.nexxio.partnerconnect.hykon&hl=en`}
          target="_blank"
        >
          <div className="w-full h-auto aspect-1720/720 overflow-hidden rounded-[30px] relative z-0">
            <Image
              src={data?.media?.path || "/images/placeholder.jpg"}
              alt={data?.media?.alt || "promotions"}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
