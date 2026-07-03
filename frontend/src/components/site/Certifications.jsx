import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { BadgeCheck, Award, ScrollText, ShieldCheck } from "lucide-react";

const ICONS = [ScrollText, Award, BadgeCheck, ShieldCheck];

const Certifications = () => {
  const { t } = useLang();
  return (
    <section id="certifications" data-testid="certifications-section" className="section bg-slate-50">
      <div className="container-x mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.cert.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy mt-3 tracking-tight leading-[1.1]">
            {t.cert.title}
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cert.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                data-testid={`cert-${i}`}
                className="p-7 rounded-2xl bg-white border border-slate-200 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                  <Icon size={22} className="text-copper" />
                </div>
                <h3 className="font-display font-semibold text-navy text-lg mt-5">{it.t}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
