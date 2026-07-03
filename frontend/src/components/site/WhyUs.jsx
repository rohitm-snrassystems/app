import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { HANDSHAKE_IMG } from "@/data/site";
import {
  ShieldCheck,
  Network,
  Truck,
  FileText,
  UserCircle2,
  Wallet,
} from "lucide-react";

const ICONS = [ShieldCheck, Network, Truck, FileText, UserCircle2, Wallet];
const COLORS = ["text-emerald-600", "text-copper", "text-emerald-600", "text-copper", "text-emerald-600", "text-copper"];

const WhyUs = () => {
  const { t } = useLang();

  return (
    <section id="why" data-testid="why-section" className="relative bg-navy text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${HANDSHAKE_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />

      <div className="relative container-x mx-auto max-w-7xl section">
        <div className="max-w-3xl">
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.why.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-3 tracking-tight leading-[1.1]">
            {t.why.title}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {t.why.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                data-testid={`why-item-${i}`}
                className="group p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
              >
                <Icon size={32} className={COLORS[i]} strokeWidth={1.6} />
                <h3 className="font-display font-semibold text-xl mt-5">{it.t}</h3>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
