import { BusinessContactForm } from "@/components/form/business-contact-form";
import RecaptchaProvider from "@/components/common/recaptcha-provider";
import Image from "next/image";

export default function BusinessContact({ data }) {
  return (
    <section className="w-full h-auto block bg-black pt-7 pb-12 relative z-0">
      <Image
        src="/images/business-contact-bg.jpg"
        alt="business-contact-bg"
        // width={420}
        // height={520}
        fill
        sizes="100vw"
        className="-z-1"
      />
      <div className="container">
        <div className="text-[28px] leading-normal font-medium text-white mb-3">
          {data?.title}
        </div>
        <RecaptchaProvider>
          <BusinessContactForm />
        </RecaptchaProvider>
      </div>
    </section>
  );
}
