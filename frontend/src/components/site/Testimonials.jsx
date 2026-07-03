import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { TESTIMONIALS } from "@/data/site";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section id="testimonials" data-testid="testimonials-section" className="section bg-white">
      <div className="container-x mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.testimonials.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy mt-3 tracking-tight leading-[1.1]">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((tst, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`testimonial-${i}`}
              className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <Quote size={28} className="text-copper/70" />
              <p className="mt-5 text-slate-700 leading-relaxed text-[15px]">
                &ldquo;{tst.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-2 text-copper">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="font-display font-semibold text-navy">{tst.author}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {tst.role} · <span className="text-copper font-semibold">{tst.country}</span>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
