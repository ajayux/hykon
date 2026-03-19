import { Text } from "@/components/utils/typography";
import Image from "next/image";

export default function BusinessFooter() {
  return (
    <section className="w-full h-auto block bg-black py-6">
      <div className="container">
        <Text
          as="div"
          size="p2"
          className="whitespace-nowrap text-center tracking-wide text-white flex justify-center"
        >
          Designed & Developed by:
          <a href="https://www.intersmartsolution.com/" target="_blank">
            <Image
              src="/images/footer-author.svg"
              alt="footer-author"
              width={100}
              height={20}
              className="w-25 inline ml-1"
              unoptimized
            />
          </a>
        </Text>
      </div>
    </section>
  );
}
