import React from "react";
import { COMPANY } from "@/data/site";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hello Commercion Exim, I'd like to request a quote."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform">
        <MessageCircle size={26} strokeWidth={2} />
      </span>
      <span className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden md:block whitespace-nowrap bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
