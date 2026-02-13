import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "الوظائف" : "Careers",
    description:
      locale === "ar"
        ? "انضم إلى فريق واسو - فرص وظيفية في إدارة المشاريع والهندسة"
        : "Join the WASSO team - Career opportunities in project management and engineering",
  };
}

export default async function CareersPage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const department = searchParams?.department || null;
  const type = searchParams?.type || null;
  const page = searchParams?.page || "1";

  let careersData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const queryParams = new URLSearchParams({
      locale,
      page,
      limit: "12",
    });
    if (department) queryParams.append("department", department);
    if (type) queryParams.append("type", type);

    const res = await fetch(
      `${baseUrl}/api/careers?${queryParams.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      careersData = response.data;
    }
  } catch (error) {
    console.error("Error fetching careers data:", error);
  }

  if (!careersData) {
    notFound();
  }

  const { careers, pagination } = careersData;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gray-900 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {locale === "ar" ? "الوظائف" : "Careers"}
          </h1>
          <p className="text-lg text-gray-300">
            {locale === "ar"
              ? "انضم إلى فريقنا وكن جزءًا من مستقبل إدارة المشاريع"
              : "Join our team and be part of the future of project management"}
          </p>
        </div>
      </section>

      {/* Careers List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {careers && careers.length > 0 ? (
            <>
              <div className="space-y-6">
                {careers.map((career) => (
                  <Link
                    key={career.id}
                    href={`/${locale}/careers/${career.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-lg"
                  >
                    <div className="flex flex-col justify-between md:flex-row md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="mb-2 text-2xl font-semibold">
                          {locale === "ar" ? career.title_ar : career.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>
                            {locale === "ar"
                              ? career.location_ar
                              : career.location}
                          </span>
                          <span>•</span>
                          <span>
                            {locale === "ar"
                              ? career.department_ar
                              : career.department}
                          </span>
                          <span>•</span>
                          <span>
                            {locale === "ar" ? career.type_ar : career.type}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">
                          {locale === "ar"
                            ? career.short_description_ar
                            : career.short_description}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="inline-block rounded bg-gray-900 px-4 py-2 text-white">
                          {locale === "ar" ? "عرض التفاصيل" : "View Details"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/${locale}/careers?page=${pageNum}${
                        department ? `&department=${department}` : ""
                      }${type ? `&type=${type}` : ""}`}
                      className={`px-4 py-2 ${
                        pageNum === pagination.page
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600">
                {locale === "ar"
                  ? "لا توجد وظائف متاحة حالياً"
                  : "No positions available at the moment"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
