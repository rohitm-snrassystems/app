import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { HERO_IMG } from "@/data/site";
import { ArrowRight, Ship } from "lucide-react";

const Hero = () => {
  const { t } = useLang();
  const goto = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[92vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Cargo ships at global port"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative container-x mx-auto max-w-7xl w-full pb-24 pt-40 md:pb-32 md:pt-48 grain">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="chip !bg-white/10 !border-white/25 !text-white/85 mb-6">
            <Ship size={14} className="text-copper" /> {t.hero.eyebrow}
          </div>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {t.hero.title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-copper">{t.hero.title.split(" ").slice(-2).join(" ")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button data-testid="hero-cta-quote" onClick={() => goto("#contact")} className="btn-copper">
              {t.hero.cta} <ArrowRight size={16} />
            </button>
            <button data-testid="hero-cta-products" onClick={() => goto("#products")} className="btn-outline-white">
              {t.hero.cta2}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl"
        >
          {[
            [t.hero.stat1, t.hero.stat1_l],
            [t.hero.stat2, t.hero.stat2_l],
            [t.hero.stat3, t.hero.stat3_l],
            [t.hero.stat4, t.hero.stat4_l],
          ].map(([n, l], i) => (
            <div
              key={i}
              data-testid={`hero-stat-${i}`}
              className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-4 md:p-5"
            >
              <div className="font-display font-bold text-white text-2xl md:text-3xl">{n}</div>
              <div className="text-xs md:text-sm text-white/70 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
