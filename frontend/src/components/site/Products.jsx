import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { PRODUCT_CATEGORIES } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

const Products = () => {
  const { lang, t } = useLang();
  const goto = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="products" data-testid="products-section" className="section bg-slate-50">
      <div className="container-x mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.products.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy mt-3 tracking-tight leading-[1.1]">
            {t.products.title}
          </h2>
          <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed">
            {t.products.body}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-7">
          {PRODUCT_CATEGORIES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              data-testid={`product-card-${p.key}`}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.en.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 chip !text-navy !bg-white/95 shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-navy text-lg leading-snug">
                  {p[lang].title}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{p[lang].sub}</p>
                <button
                  data-testid={`product-quote-${p.key}`}
                  onClick={goto}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:text-orange-800 transition"
                >
                  {t.products.quote} <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
