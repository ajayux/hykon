import Image from "next/image";
import Link from "next/link";

export default function HykonnectHow({ data }) {
  return (
    <section className="w-full h-auto block">
      <Link href = {`https://play.google.com/store/apps/details?id=in.nexxio.partnerconnect.hykon&hl=en`} target="_blank">
      <div className="w-full aspect-[1920/820]">
        <Image
          src={data.media.path}
          alt={data.media.alt || "How Hykonnect Works"}
          width={1920}
          height={820}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      </Link>
    </section>
  );
}
