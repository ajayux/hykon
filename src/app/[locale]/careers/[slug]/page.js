import InnerHero from "@/components/common/inner-hero";
import CareerDetailInfo from "@/components/blocks/career-detail/career-detail-info";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "تفاصيل الوظيفة" : "Job Detail",
    description: locale === "ar" ? "" : "",
  };
}

const careerData = {
  hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/career-banner.jpg",
      desktop_path: "/images/career-banner.jpg",
      media_alt: "career-hero-1",
    },
    title_ar: "عننا",
    title: "Career",
  },
  career_info: {
    title: "Site Engineer",
    title_ar: "مهندس موقع",
    description:
      "<p>We are seeking a skilled and motivated Site Engineer to join our construction team. The ideal candidate will be responsible for overseeing day-to-day construction activities, ensuring project specifications are met, and maintaining quality standards on-site. This role offers an excellent opportunity to work on diverse construction projects and grow your career in the construction industry.</p>",
    description_ar:
      "نبحث عن مهندس موقع ماهر ومتحمس للانضمام إلى فريق البناء لدينا. سيكون المرشح المثالي مسؤولاً عن الإشراف على الأنشطة الإنشائية اليومية، وضمان تلبية مواصفات المشروع، والحفاظ على معايير الجودة في الموقع. يوفر هذا الدور فرصة ممتازة للعمل في مشاريع بناء متنوعة وتطوير مسيرتك المهنية في قطاع الإنشاءات.",
    jobSpecs: [
      {
        id: 1,
        iconPath: "/images/career-benefits-1.png",
        title: "Job Type",
        title_ar: "النوع الوظيفي",
        description: "Full-time",
        description_ar: "دوام كامل",
      },
      {
        id: 2,
        iconPath: "/images/career-benefits-2.png",
        title: "Requirements",
        title_ar: "المتطلبات",
        description: "Minimum 5 years of experience",
        description_ar: "خبرة لا تقل عن 5 سنوات",
      },
      {
        id: 3,
        iconPath: "/images/career-benefits-3.png",
        title: "Deadline to Apply",
        title_ar: " край موعد التقديم",
        description: "2025-12-31",
        description_ar: "2025-12-31",
      },
      {
        id: 4,
        iconPath: "/images/career-benefits-4.png",
        title: "Division",
        title_ar: "القسم",
        description: "Construction",
        description_ar: "الإنشاءات",
      },
      {
        id: 5,
        iconPath: "/images/career-benefits-5.png",
        title: "Location",
        title_ar: "الموقع",
        description: "Multiple",
        description_ar: "مواقع متعددة",
      },
      {
        id: 6,
        iconPath: "/images/career-benefits-6.png",
        title: "Salary",
        title_ar: "الراتب",
        description: "Competitive",
        description_ar: "متناوب",
      },
    ],

    responsibilitiesMedia: {
      media_type: "image",
      media_url: "/images/career-responsibilities.jpg",
      media_alt: "Career Responsibilities",
      media_alt_ar: "مسؤوليات الوظيفة",
    },
    responsibilities:
      "<ul><li>Supervise and coordinate all on-site construction activities and workers</li><li>Review and interpret construction drawings, specifications, and blueprints</li><li>Monitor project progress and ensure work is completed on schedule</li><li>Ensure compliance with health, safety, and environmental regulations</li></ul>",
    responsibilities_ar:
      "<ul><li>الإشراف على الأنشطة الإنشائية اليومية</li><li>مراجعة وتفسير الرسومات والمواصفات والمخططات الإنشائية</li><li>مراقبة تقدم العمل وضمان إنجازه في الموعد المحدد</li><li>ضمان الامتثال للوائح الصحة والسلامة والبيئة</li></ul>",

    benefits: {
      title: "Benefits & Perks",
      title_ar: "المزايا والفوائد",
      items: [
        {
          iconPath: "/images/career-benefits-1.svg",
          title: "Health Insurance",
          title_ar: "التأمين الصحي",
        },
        {
          iconPath: "/images/career-benefits-2.svg",
          title: "Paid Time Off",
          title_ar: "الإجازات المدفوعة",
        },
        {
          iconPath: "/images/career-benefits-3.svg",
          title: "Career Growth",
          title_ar: "بيئة عمل تعاونية",
        },
        {
          iconPath: "/images/career-benefits-4.svg",
          title: "Life Insurance",
          title_ar: "التأمين على الحياة",
        },
      ],
    },
  },
};

export default async function CareerDetailPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // let careerData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  //   const res = await fetch(`${baseUrl}/api/contact?locale=${locale}`, {
  //     cache: "no-store",
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     careerData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching about data:", error);
  // }

  // if (!careerData) {
  //   notFound();
  // }

  const { hero, career_info } = careerData;

  return (
    <>
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

    //         {/* Application Form */}
    //         <div className="rounded-lg bg-gray-50 p-6">
    //           <h3 className="mb-4 text-xl font-bold">
    //             {locale === "ar" ? "تقديم الطلب" : "Apply Now"}
    //           </h3>
    //           {submitted ? (
    //             <div className="rounded bg-green-100 p-4 text-green-800">
    //               {locale === "ar"
    //                 ? "تم إرسال طلبك بنجاح!"
    //                 : "Your application has been submitted successfully!"}
    //             </div>
    //           ) : (
    //             <form onSubmit={handleSubmit} className="space-y-4">
    //               <div>
    //                 <label className="mb-1 block text-sm font-semibold">
    //                   {locale === "ar" ? "الاسم الأول" : "First Name"}
    //                 </label>
    //                 <input
    //                   type="text"
    //                   required
    //                   value={formData.first_name}
    //                   onChange={(e) =>
    //                     setFormData({ ...formData, first_name: e.target.value })
    //                   }
    //                   className="w-full rounded border border-gray-300 px-3 py-2"
    //                 />
    //               </div>
    //               <div>
    //                 <label className="mb-1 block text-sm font-semibold">
    //                   {locale === "ar" ? "اسم العائلة" : "Last Name"}
    //                 </label>
    //                 <input
    //                   type="text"
    //                   required
    //                   value={formData.last_name}
    //                   onChange={(e) =>
    //                     setFormData({ ...formData, last_name: e.target.value })
    //                   }
    //                   className="w-full rounded border border-gray-300 px-3 py-2"
    //                 />
    //               </div>
    //               <div>
    //                 <label className="mb-1 block text-sm font-semibold">
    //                   {locale === "ar" ? "البريد الإلكتروني" : "Email"}
    //                 </label>
    //                 <input
    //                   type="email"
    //                   required
    //                   value={formData.email}
    //                   onChange={(e) =>
    //                     setFormData({ ...formData, email: e.target.value })
    //                   }
    //                   className="w-full rounded border border-gray-300 px-3 py-2"
    //                 />
    //               </div>
    //               <div>
    //                 <label className="mb-1 block text-sm font-semibold">
    //                   {locale === "ar" ? "الهاتف" : "Phone"}
    //                 </label>
    //                 <input
    //                   type="tel"
    //                   required
    //                   value={formData.phone}
    //                   onChange={(e) =>
    //                     setFormData({ ...formData, phone: e.target.value })
    //                   }
    //                   className="w-full rounded border border-gray-300 px-3 py-2"
    //                 />
    //               </div>
    //               <div>
    //                 <label className="mb-1 block text-sm font-semibold">
    //                   {locale === "ar" ? "رسالة التقديم" : "Cover Letter"}
    //                 </label>
    //                 <textarea
    //                   value={formData.cover_letter}
    //                   onChange={(e) =>
    //                     setFormData({
    //                       ...formData,
    //                       cover_letter: e.target.value,
    //                     })
    //                   }
    //                   rows={4}
    //                   className="w-full rounded border border-gray-300 px-3 py-2"
    //                 />
    //               </div>
    //               <button
    //                 type="submit"
    //                 disabled={submitting}
    //                 className="w-full rounded bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
    //               >
    //                 {submitting
    //                   ? locale === "ar"
    //                     ? "جاري الإرسال..."
    //                     : "Submitting..."
    //                   : locale === "ar"
    //                     ? "إرسال الطلب"
    //                     : "Submit Application"}
    //               </button>
    //             </form>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </section>

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
