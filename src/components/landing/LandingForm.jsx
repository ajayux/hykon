"use client";
import React from "react";
import Image from "next/image";

export default function LandingForm({ onClose }) {
  return (
    <div className="w-full h-full flex flex-col p-8 md:p-12 relative scrollbar-hide bg-[#121212] border-l border-white/5 shadow-2xl">
      <button
        onClick={onClose}
        className="sticky top-0 float-right mt-4 mr-0 text-gray-500 hover:text-white transition-all p-2 z-50 bg-[#121212]/80 backdrop-blur-sm rounded-lg"
        aria-label="Close form"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-12 mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
          Want to Learn More? <br />
          <span className="text-blue-500">Share Your info</span> <br />
          <span className="text-gray-500 text-3xl">and we'll be in touch!</span>
        </h2>
      </div>

      <form className="space-y-6 flex-1">
        {[
          { label: "Name*", type: "text" },
          { label: "Phone*", type: "tel" },
          { label: "Email*", type: "email" },
          { label: "Place*", type: "text" },
        ].map((field) => (
          <div key={field.label} className="group">
            <input
              type={field.type}
              placeholder={field.label}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all font-medium placeholder:text-gray-700 text-lg text-white"
            />
          </div>
        ))}
        <div className="group">
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all font-medium placeholder:text-gray-700 text-lg text-white resize-none"
          ></textarea>
        </div>
        <div className="pt-8">
          <button
            type="submit"
            className="w-full group flex items-center justify-between bg-white/[0.03] border border-white/10 text-white py-5 px-8 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 shadow-xl"
          >
            <span className="text-lg font-bold uppercase tracking-widest ml-2">Submit Inquiry</span>
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-white shadow-lg transition-all duration-500 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      </form>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
        <Image src="/images/brand-logo.svg" alt="Hykon" width={100} height={30} className="opacity-30 grayscale" />
        <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">
          © 2024 Hykon India.
        </p>
      </div>
    </div>
  );
}
