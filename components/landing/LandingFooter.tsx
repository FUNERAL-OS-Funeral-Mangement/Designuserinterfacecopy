'use client';

import Image from 'next/image';

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Compliance"],
  },
];

export const LandingFooter = () => {
  return (
    <footer className="py-16 px-6 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/logos/RitePath_logo.webp" 
                alt="Rite Path Logo" 
                width={200} 
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-600">Compassionate care through every step.</p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm text-slate-900 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">© 2026 Rite Path. All rights reserved.</p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-sm text-slate-600 hover:text-slate-900">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

