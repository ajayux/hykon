"use client";
import LandingForm from "./LandingForm";

export default function LandingSidebar({ isOpen, onToggle }) {
  return (
    <>
      <aside
        className={`fixed lg:sticky top-0 right-0 z-40 transition-all duration-700 bg-[#0F0F0F] border-l border-white/5 h-screen ${isOpen ? "w-full lg:w-[340px] xl:w-[370px] 2xl:w-[440px] 3xl:w-[550px]" : "w-0"
          }`}
      >
        <LandingForm onClose={onToggle} />
      </aside>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-8 px-4 rounded-l-[2rem] z-50 shadow-2xl transition-all duration-700 animate-in slide-in-from-right group flex flex-col items-center gap-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.4em] text-[10px] font-black">Open Form</span>
        </button>
      )}
    </>
  );
}
