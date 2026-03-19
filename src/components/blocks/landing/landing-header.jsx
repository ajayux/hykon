import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LandingHeader({ isSidebarOpen }) {
  return (
    <header className="w-full h-auto py-[20px] absolute top-0 left-0 z-2">
      <div
        className={cn("w-full", isSidebarOpen ? "isContainer" : "container")}
      >
        <div className="w-[100px] sm:w-[110px] xl:w-[130px] 2xl:w-[160px] 3xl:w-[200px] h-auto aspect-[200/85] overflow-hidden block">
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
