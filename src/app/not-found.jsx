import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="w-full h-auto block py-[var(--header-y)] overflow-hidden bg-[#181818]">
        <div className="w-full flex items-center justify-center text-white bg-[linear-gradient(360deg,_rgba(24,24,24,1)_0%,_rgba(25,62,80,1)_42%,_rgba(25,62,80,1)_55%,_rgba(24,24,24,1)_100%)]">
            <div className="container">
                <div className="text-center">
                    <div className="aspect-[528/375] w-full max-w-[200px] xl:max-w-[300px] 2xl:max-w-[400px] 3xl:max-w-[500px] mx-auto">
                        <Image
                        src={"/images/notfound-img.png"}
                        alt={"icon-blog-btn"}
                        width={500}
                        height={375}
                        className="w-full h-full object-contain"
                        />
                    </div>
                    <h2 className="text-[20px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-semibold text-white">Oops! This page seems to have driven away</h2>
                    <p className="mt-4 text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">Don't worry, even the best GPS can take a wrong turn sometimes. Let's get you back on the road to finding what you need.</p>
                    <div className="w-full sm:w-[100px] xl:w-[124px] 2xl:w-[140px] 3xl:w-[156px] mt-[20px] xl:mt-[25px] 2xl:mt-[30px] 3xl:mt-[36px] mx-auto">
                        <Button
                        size="lg"
                        variant="outline"
                        className="text-white min-w-[100px] lg:min-w-full justify-between font-medium pl-2 xl:pl-4"
                        asChild
                        >
                        <Link href={"/"}>
                            Go Back
                            <div className="w-5 xl:w-6 2xl:w-7 3xl:w-9 aspect-square bg-[#008dd2] rounded-full flex items-center justify-center">
                            <Image
                                src={"/images/icon-arrow-right-white.svg"}
                                alt={"icon-arrow-right-white"}
                                width={18}
                                height={13}
                                className="w-1/2"
                                unoptimized
                            />
                            </div>
                        </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}