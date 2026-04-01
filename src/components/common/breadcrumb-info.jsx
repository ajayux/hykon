import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export default function BreadcrumbInfo({
  slug,
  className,
  variant,
  page,
  parentPage,
  grandParentPage,
  themeProps,
}) {
  const styleVars = {
    "--theme-bg": themeProps?.backgroundColor || "#212121",
    "--theme-bg-alt": themeProps?.backgroundColor || "#333",
    "--theme-fg": themeProps?.foregroundColor || "#fff",
    "--theme-fg-50": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}80`
      : "#bcbcbc",
    "--theme-fg-80": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}cc`
      : "#ccc",
    "--theme-fg-50-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}80`
      : "#878787",
    "--theme-fg-80-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}cc`
      : "#d3d3d3",
    "--theme-border-20": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}33`
      : "#3e3e3e",
    "--theme-border-20-alt": themeProps?.foregroundColor
      ? `${themeProps.foregroundColor}33`
      : "#333",
    "--theme-color": themeProps?.themeColor || "#008dd2",
  };

  const dotStyle = cn(
    "w-1 xl:w-1.5 aspect-square bg-[var(--theme-color)] rounded-full",
    variant === "product-detail" && "bg-[#008dd2] bg-[var(--theme-color)]",
  );
  return (
    <section
      style={styleVars}
      className={cn(
        "w-full block py-2 lg:py-3.5 2xl:py-4.5 3xl:py-5 bg-[#181818]",
        className,
        variant === "product-detail" && "bg-[#212121] bg-[var(--theme-bg)]",
      )}
    >
      <div
        className={cn(
          "container",
          variant === "product-detail" &&
            "lg:px-6 xl:px-6.5 2xl:px-8 3xl:px-10",
        )}
      >
        <Breadcrumb
          className={cn(
            variant === "product-detail"
              ? "mb-0"
              : "mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-2.5",
          )}
        >
          <BreadcrumbList className={"sm:gap-x-3"}>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[var(--theme-fg)]" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <div className={dotStyle} />
            </BreadcrumbSeparator>
            {grandParentPage && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-[var(--theme-fg)]"
                    href={`/${grandParentPage?.link}`}
                  >
                    {grandParentPage?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className={dotStyle} />
                </BreadcrumbSeparator>
              </>
            )}
            {parentPage && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-[var(--theme-fg)]"
                    href={`/${parentPage?.link}`}
                  >
                    {parentPage?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className={dotStyle} />
                </BreadcrumbSeparator>
              </>
            )}
            {page && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-[var(--theme-fg)]"
                    href={`/${page?.link}`}
                  >
                    {page?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className={dotStyle} />
                </BreadcrumbSeparator>
              </>
            )}
            {slug && (
              <BreadcrumbItem>
                <BreadcrumbPage className={"capitalize text-[var(--theme-fg)]"}>
                  {slug}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
