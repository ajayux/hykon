import InnerHero from "@/components/common/inner-hero";
import CareerDetailInfo from "@/components/blocks/career-detail/career-detail-info";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CareerDetailPage() {
  const params = useParams();
  const locale = params?.locale || "en";
  const slug = params?.slug;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    resume_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareer() {
      if (!slug || !locale) return;

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000");
        // Changed to singular /api/career
        const res = await fetch(`${baseUrl}/api/career/${slug}?locale=${locale}`);

        if (res.ok) {
          const response = await res.json();
          // The new API returns data: { career: ... }, so we access response.data.career
          setCareerData(response.data.career);
        }
      } catch (error) {
        console.error("Error fetching career data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug && locale) {
      fetchCareer();
    }
  }, [slug, locale]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      // Changed to singular /api/career
      const res = await fetch(`${baseUrl}/api/career`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career_id: careerData?.id,
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          cover_letter: "",
          resume_url: "",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!careerData) {
    notFound();
  }

  return (
    <>
      <InnerHero locale={locale} data={hero} slug={"Career"} />
      <CareerDetailInfo data={career_info} locale={locale} />
    </>
    // <div className="min-h-screen">
    //   <section className="bg-gray-900 py-16 text-white md:py-24">
    //     <div className="container mx-auto px-4">
    //       <h1 className="mb-4 text-4xl font-bold md:text-5xl">
    //         {locale === "ar" ? careerData.title_ar : careerData.title}
    //       </h1>
    //       <div className="flex flex-wrap gap-4 text-gray-300">
    //         <span>
    //           {locale === "ar" ? careerData.location_ar : careerData.location}
    //         </span>
    //         <span>•</span>
    //         <span>
    //           {locale === "ar"
    //             ? careerData.department_ar
    //             : careerData.department}
    //         </span>
    //         <span>•</span>
    //         <span>
    //           {locale === "ar" ? careerData.type_ar : careerData.type}
    //         </span>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="py-16 md:py-24">
    //     <div className="container mx-auto px-4">
    //       <div className="grid gap-8 md:grid-cols-3">
    //         <div className="md:col-span-2">
    //           <h2 className="mb-4 text-3xl font-bold">
    //             {locale === "ar" ? "وصف الوظيفة" : "Job Description"}
    //           </h2>
    //           <p className="mb-6 text-lg text-gray-600">
    //             {locale === "ar"
    //               ? careerData.description_ar
    //               : careerData.description}
    //           </p>
    //           {careerData.full_description && (
    //             <div
    //               className="prose max-w-none text-gray-600"
    //               dangerouslySetInnerHTML={{
    //                 __html:
    //                   locale === "ar"
    //                     ? careerData.full_description_ar
    //                     : careerData.full_description,
    //               }}
    //             />
    //           )}
    //         </div>

            {/* Application Form */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold">
                {locale === "ar" ? "تقديم الطلب" : "Apply Now"}
              </h3>
              {submitted ? (
                <div className="rounded bg-green-100 p-4 text-green-800">
                  {locale === "ar"
                    ? "تم إرسال طلبك بنجاح!"
                    : "Your application has been submitted successfully!"}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      {locale === "ar" ? "الاسم الأول" : "First Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      {locale === "ar" ? "اسم العائلة" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      {locale === "ar" ? "الهاتف" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      {locale === "ar" ? "رسالة التقديم" : "Cover Letter"}
                    </label>
                    <textarea
                      value={formData.cover_letter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cover_letter: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {submitting
                      ? locale === "ar"
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : locale === "ar"
                        ? "إرسال الطلب"
                        : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    //   <section className="bg-gray-50 py-8">
    //     <div className="container mx-auto px-4">
    //       <Link
    //         href={`/${locale}/careers`}
    //         className="inline-block text-gray-700 hover:text-gray-900"
    //       >
    //         ← {locale === "ar" ? "العودة إلى الوظائف" : "Back to Careers"}
    //       </Link>
    //     </div>
    //   </section>
    // </div>
  );
}
