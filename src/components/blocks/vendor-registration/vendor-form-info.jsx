import { Heading } from "@/components/utils/typography";
import { VendorRegistrationForm } from "@/components/form/vendor-registration-form";
import RecaptchaProvider from "@/components/common/recaptcha-provider";

export default function VendorFormInfo({ data }) {
  return (
    <section className="w-full h-auto block pt-8 xl:pt-10 2xl:pt-12 3xl:pt-15 pb-15 xl:pb-35 2xl:pb-40 3xl:pb-50 bg-[#181818]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-medium text-white mb-8 xl:mb-10 2xl:mb-12.5 3xl:mb-15"
        >
          {data?.title}
        </Heading>
        <RecaptchaProvider>
          <VendorRegistrationForm />
        </RecaptchaProvider>
      </div>
    </section>
  );
}
