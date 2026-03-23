import Image from "next/image";

export default function BusinessHeader() {
  return (
    <header className="w-full max-w-[410px] h-auto py-[30px] mx-auto absolute inset-[0_0_auto_0] z-2">
      <div className="container">
        <div className="w-[175px] h-auto aspect-[175/55] overflow-hidden block">
          <Image
            src="/images/brand-logo.svg"
            alt="Hykon Logo"
            width={200}
            height={85}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </header>
  );
}
