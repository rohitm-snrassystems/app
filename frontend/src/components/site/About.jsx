import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { ABOUT_IMG, CLIENT_LOGOS } from "@/data/site";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const { t } = useLang();
  const points = [t.about.p1, t.about.p2, t.about.p3, t.about.p4];

  return (
    <section id="about" data-testid="about-section" className="section bg-white">
      <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={ABOUT_IMG}
            alt="Modern warehouse and global logistics"
            className="w-full h-[420px] md:h-[540px] object-cover rounded-sm shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-navy text-white p-6 max-w-[240px] shadow-2xl">
            <div className="text-copper text-xs tracking-[0.2em] font-semibold">EST. 2025</div>
            <div className="font-display font-bold text-3xl mt-1">NEW-GEN</div>
            <div className="text-xs text-white/70 mt-1">export house, built for global trade</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.about.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy mt-3 tracking-tight leading-[1.1]">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
            {t.about.body}
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <li key={i} data-testid={`about-point-${i}`} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="container-x mx-auto max-w-7xl mt-20 hidden">
        {/* Client logos hidden — waiting on real launch partners */}
      </div>
    </section>
  );
};

export default About;
