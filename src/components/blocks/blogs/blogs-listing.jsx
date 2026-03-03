"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import BlogsCard from "@/components/common/blogs-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BlogsListing({ data }) {

    return (
        <section className="w-full h-auto block bg-[#181818] py-8 xl:py-13 2xl:py-15 3xl:py-20 relative z-0">
            {/* <div className="text-[80px] sm:text-[140px] xl:text-[166px] 2xl:text-[200px] 3xl:text-[250px] font-bold leading-none uppercase text-center text-transparent select-none opacity-40 absolute -z-1 top-0 inset-x-0 [-webkit-text-stroke:1px_#595959]">
                {parse(data?.title)}
            </div> */}
            <div className="container">
                <div className="flex flex-wrap sm:items-end gap-4 sm:gap-x-6 xl:gap-x-12 2xl:gap-x-17.5 3xl:gap-x-21.5 mb-8 xl:mb-10 2xl:mb-10 3xl:mb-12">

  {/* Left Content */}
  <div className="w-full sm:w-[50%]">
    <Heading
      as="h2"
      size="h1"
      className="text-medium text-white mb-1 xl:mb-1.5 3xl:mb-2"
    >
      {parse(data?.title)}
    </Heading>

    <Text
      as="p"
      size="p1"
      className="text-medium text-white mb-1 xl:mb-2 3xl:mb-3"
    >
      {parse(data?.description)}
    </Text>
  </div>

  {/* Right Select */}
  <div className="w-full sm:w-auto sm:ml-auto flex justify-end">
    <Select>
      <SelectTrigger className="w-[180px] border-0 border-b-[2.7px] border-b-[#008DD2] rounded-none bg-transparent text-white [&>span]:text-white [&>svg]:!text-white">
        <SelectValue placeholder="Theme" />
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

                <div className="flex flex-wrap -mx-1 xl:-mx-[5px] 2xl:-mx-1.5 3xl:-mx-2 min-h-[400px]">
                    {data?.items?.length > 0 ? (
                        data.items.map((item) => (
                            <div
                            key={item?.id}
                            className="w-full lg:w-1/3 p-1 xl:p-[5px] 2xl:p-1.5 3xl:p-2"
                            >
                            <BlogsCard item={item} />
                            </div>
                        ))
                        ) : (
                        <div className="w-full flex items-center justify-center py-20">
                            <Text as="p" size="p1" className="text-center text-white/50">
                                Loading blogs..."
                            </Text>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
