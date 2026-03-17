import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer className="bg-[#050505] py-20 px-10 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <Image src="/images/brand-logo.svg" alt="Hykon Logo" width={140} height={40} className="brightness-0 invert" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Hykon is a pioneer in the field of power electronics since 1991, offering innovative energy solutions for homes and industries.
            </p>
            <div className="flex gap-4">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all cursor-pointer group">
                     <div className="w-4 h-4 bg-gray-600 group-hover:bg-white transition-colors rounded-sm"></div>
                  </div>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Products', 'Support', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Solutions</h4>
            <ul className="space-y-4">
              {['Solar UPS', 'Lithium Battery', 'Online UPS', 'Home Inverters'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="text-blue-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                 </div>
                 <p className="text-gray-500 text-sm leading-relaxed">Hykon India Ltd, <br/>Thrissur, Kerala, India</p>
              </div>
              <div className="flex gap-4">
                 <div className="text-blue-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <p className="text-gray-500 text-sm">info@hykonindia.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">
             © 2024 Hykon Energy Systems Pvt Ltd.
           </p>
           <div className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-700 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-colors">Refund Policy</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
