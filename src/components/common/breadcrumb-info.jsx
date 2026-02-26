import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbInfo({ slug }) {
  return (
    <section className="w-full block py-2 lg:py-3.5 2xl:py-4.5 3xl:py-5 bg-[#121212]">
      <div className="container">
        <Breadcrumb className="mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-2.5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <div className="w-1 xl:w-1.5 aspect-square bg-[#008dd2] rounded-full" />
            </BreadcrumbSeparator>
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
