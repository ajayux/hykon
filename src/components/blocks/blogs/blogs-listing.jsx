import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import BlogsCard from "@/components/common/blogs-card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BlogsListing({ data }) {
  return (
    <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
      <div className="container">
        <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-10 3xl:mb-12">

          <div className="w-full sm:flex-1">
            <Heading
              as="h2"
              size="h1"
              className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
            >
              {parse(data?.title || "Blog")}
            </Heading>
          </div>


          <div className="w-full sm:w-auto sm:ml-auto flex justify-end">
            <Select>
              <SelectTrigger className="w-[180px] 2xl:w-[245px] text-[15px] xl:text-[18px] 2xl:text-[20px] font-medium text-white [&>span]:text-white border-0 border-b-[2.7px] border-b-[#008DD2] rounded-none bg-transparent cursor-pointer [&>svg]:!text-white [&>svg]:opacity-100">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-gray-200">
                <SelectGroup>
                  <SelectItem value="light" className="focus:bg-gray-100">
                    Category
                  </SelectItem>
                  <SelectItem value="dark" className="focus:bg-gray-100">
                    Category - 1
                  </SelectItem>
                  <SelectItem value="system" className="focus:bg-gray-100">
                    Category - 2
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-1 -mx-[5px] xl:-mx-[6px] 2xl:-mx-[7px] 3xl:-mx-[9px]">
          {data?.items?.length > 0 && (
            data.items.map((item) => (
              <div
                key={item?.id}
                className="w-full sm:w-1/2 lg:w-1/3 p-[7px_5px] xl:p-[8px_6px] 2xl:p-[11px_7px] 3xl:p-[16px_9px]"
              >
                <BlogsCard item={item} />
              </div>
            ))
          )}

        </div>
        <Button
            size="lg"
            variant="none"
            className="flex text-white px-0 mt-[30px] xl:mt-[40px] 2xl:mt-[48px] 3xl:mt-[60px] !h-[20px] !mx-[auto]"
            asChild
          >
            <Link href="">
              Load More
              <Image
                src={"/images/icon-news-right.svg"}
                alt={"icon-news-right"}
                width={6}
                height={10}
                className="w-1 3xl:w-1.5 block mt-0.5"
                unoptimized
              />
            </Link>
          </Button>
      </div>
    </section>
  );
}
