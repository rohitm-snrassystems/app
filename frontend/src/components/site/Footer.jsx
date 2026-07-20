import React from "react";
import { useLang } from "@/context/LanguageContext";
import { COMPANY, PRODUCT_CATEGORIES } from "@/data/site";
import { Linkedin, Twitter, Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const { lang, t } = useLang();

  return (
    <footer data-testid="site-footer" className="bg-navy text-white">
      <div className="container-x mx-auto max-w-7xl py-16 md:py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Commercion Exim Pvt Ltd"
              className="h-11 md:h-12 object-contain rounded-md"
            />
          </div>
          <p className="mt-5 text-white/70 max-w-md leading-relaxed">{t.footer.tagline}</p>
          {(COMPANY.social.linkedin || COMPANY.social.twitter || COMPANY.social.facebook || COMPANY.social.instagram) && (
            <div className="mt-6 flex items-center gap-3">
              {COMPANY.social.linkedin && <SocialIcon href={COMPANY.social.linkedin} label="LinkedIn" Icon={Linkedin} testid="social-linkedin" />}
              {COMPANY.social.twitter && <SocialIcon href={COMPANY.social.twitter} label="Twitter / X" Icon={Twitter} testid="social-twitter" />}
              {COMPANY.social.facebook && <SocialIcon href={COMPANY.social.facebook} label="Facebook" Icon={Facebook} testid="social-facebook" />}
              {COMPANY.social.instagram && <SocialIcon href={COMPANY.social.instagram} label="Instagram" Icon={Instagram} testid="social-instagram" />}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-copper font-semibold">
            {t.footer.cats}
          </div>
          <ul className="mt-5 space-y-2.5 text-white/70 text-sm">
            {PRODUCT_CATEGORIES.slice(0, 8).map((p) => (
              <li key={p.id}>
                <a href="#products" className="hover:text-white transition">
                  {p[lang].title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-copper font-semibold">
            {t.footer.reach}
          </div>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-copper shrink-0" />
              <span>{COMPANY.address.line1}, {COMPANY.address.line2}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-copper" />
              <a href={`tel:${COMPANY.phone}`} className="hover:text-white">{COMPANY.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-copper" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80">{COMPANY.iec}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80">{COMPANY.gst}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x mx-auto max-w-7xl py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>{t.footer.rights}</div>
          <div>Designed for global trade · commercionexim.com</div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, Icon, testid }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    data-testid={testid}
    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-copper hover:border-copper hover:text-white transition"
  >
    <Icon size={16} />
  </a>
);

export default Footer;
