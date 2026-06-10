"use client";
import LandingForm from "./landing-form";
import RecaptchaProvider from "@/components/common/recaptcha-provider";

export default function LandingSidebar({ isOpen, onToggle, slug }) {
  return (
    <>
      <aside
        className={`h-screen bg-[#212121] fixed lg:sticky z-40 top-0 right-0 overflow-y-auto no-scrollbar transition-all duration-700 ${
          isOpen
            ? "w-full lg:w-[340px] xl:w-[370px] 2xl:w-[440px] 3xl:w-[550px]"
            : "w-0"
        }`}
      >
        <RecaptchaProvider>
          <LandingForm onClose={onToggle} slug={slug} />
        </RecaptchaProvider>
      </aside>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-10 px-3 rounded-l-[2rem] z-50 shadow-2xl transition-all duration-700 animate-in slide-in-from-right group flex flex-col items-center gap-6"
        >
          <span className="text-[12px] leading-normal font-normal tracking-[2px] uppercase [writing-mode:vertical-rl] rotate-180">
            Open Form
          </span>
        </button>
      )}
    </>
  );
}
