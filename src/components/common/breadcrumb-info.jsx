import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export default function BreadcrumbInfo({ slug, className, variant, page, parentPage, grandParentPage }) {
  return (
    <section
      className={cn(
        "w-full block py-2 lg:py-3.5 2xl:py-4.5 3xl:py-5 bg-[#181818]",
        className,
      )}
    >
      <div
        className={cn(
          "container",
          variant === "extra-gap" && "lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10",
        )}
      >
        <Breadcrumb className="mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-2.5">
          <BreadcrumbList className={"sm:gap-x-3"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <div className="w-1 xl:w-1.5 aspect-square bg-[#008dd2] rounded-full" />
            </BreadcrumbSeparator>
            {grandParentPage && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${grandParentPage?.link}`}>{grandParentPage?.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="w-1 xl:w-1.5 aspect-square bg-[#008dd2] rounded-full" />
                </BreadcrumbSeparator>
              </>
            )}
            {parentPage && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${parentPage?.link}`}>{parentPage?.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="w-1 xl:w-1.5 aspect-square bg-[#008dd2] rounded-full" />
                </BreadcrumbSeparator>
              </>
            )}
            {page && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${page?.link}`}>{page?.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="w-1 xl:w-1.5 aspect-square bg-[#008dd2] rounded-full" />
                </BreadcrumbSeparator>
              </>
            )}
            {slug && (
              <BreadcrumbItem>
                <BreadcrumbPage className={"capitalize"}>{slug}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
