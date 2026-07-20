import React, { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { COMPANY } from "@/data/site";
import { Menu, X, Download, Globe2 } from "lucide-react";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t.nav.about, testid: "nav-about" },
    { href: "#products", label: t.nav.products, testid: "nav-products" },
    { href: "#why", label: t.nav.why, testid: "nav-why" },
    { href: "#testimonials", label: t.nav.testimonials, testid: "nav-testimonials" },
    { href: "#certifications", label: t.nav.certifications, testid: "nav-cert" },
    { href: "#contact", label: t.nav.contact, testid: "nav-contact" },
  ];


  const goto = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a
          href="#top"
          data-testid="site-logo"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/logo.png"
            alt="Commercion Exim Pvt Ltd"
            className={`transition-all duration-300 object-contain rounded-md ${
              scrolled ? "h-9 md:h-10" : "h-11 md:h-12"
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={l.testid}
              onClick={() => goto(l.href)}
              className={`text-sm font-medium link-underline ${
                scrolled ? "text-slate-700 hover:text-navy" : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            data-testid="lang-toggle-group"
            className={`hidden md:flex items-center rounded-full border ${
              scrolled ? "border-slate-300" : "border-white/40"
            } p-0.5`}
          >
            <button
              data-testid="lang-en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                lang === "en"
                  ? "bg-copper text-white"
                  : scrolled
                  ? "text-slate-600"
                  : "text-white"
              }`}
            >
              EN
            </button>
            <button
              data-testid="lang-hi"
              onClick={() => setLang("hi")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                lang === "hi"
                  ? "bg-copper text-white"
                  : scrolled
                  ? "text-slate-600"
                  : "text-white"
              }`}
            >
              HI
            </button>
          </div>

          <a
            href="/brochure.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-brochure"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-copper hover:bg-orange-800 text-white px-4 py-2 text-xs font-semibold transition"
          >
            <Download size={14} /> {t.nav.brochure}
          </a>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-md ${scrolled ? "text-navy" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="container-x mx-auto py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                data-testid={`m-${l.testid}`}
                onClick={() => goto(l.href)}
                className="text-left py-3 px-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <button
                data-testid="m-lang-en"
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  lang === "en" ? "bg-copper text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <Globe2 size={12} className="inline mr-1" /> EN
              </button>
              <button
                data-testid="m-lang-hi"
                onClick={() => setLang("hi")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  lang === "hi" ? "bg-copper text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                HI
              </button>
              <a
                href="/brochure.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                data-testid="m-btn-brochure"
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-copper text-white px-4 py-2 text-xs font-semibold"
              >
                <Download size={14} /> {t.nav.brochure}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
