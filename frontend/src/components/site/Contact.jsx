import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import { COMPANY, PRODUCT_CATEGORIES } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { lang, t } = useLang();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    product_interest: "",
    message: "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target?.value ?? e });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/leads`, form);
      toast.success(res.data?.message || t.contact.form.success);
      setForm({
        name: "", email: "", phone: "", company: "", country: "",
        product_interest: "", message: "",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : t.contact.form.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="section bg-white">
      <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-5 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="text-copper text-xs tracking-[0.3em] font-semibold uppercase">
            {t.contact.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy mt-3 tracking-tight leading-[1.08]">
            {t.contact.title}
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">{t.contact.body}</p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4" data-testid="contact-address">
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-navy" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {t.contact.addr_l}
                </div>
                <div className="text-slate-800 mt-1">
                  {COMPANY.address.line1}<br />
                  {COMPANY.address.line2}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4" data-testid="contact-phone">
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-navy" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {t.contact.phone_l}
                </div>
                <a href={`tel:${COMPANY.phone}`} className="text-slate-800 mt-1 block hover:text-copper">
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4" data-testid="contact-email">
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-navy" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {t.contact.email_l}
                </div>
                <a href={`mailto:${COMPANY.email}`} className="text-slate-800 mt-1 block hover:text-copper">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-navy" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {t.contact.hours_l}
                </div>
                <div className="text-slate-800 mt-1">{t.contact.hours_v}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-2 text-xs">
            <span className="chip">{COMPANY.iec}</span>
            <span className="chip">{COMPANY.gst}</span>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          data-testid="contact-form"
          className="lg:col-span-3 rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-10"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t.contact.form.name}>
              <Input
                data-testid="input-name"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="John Doe"
              />
            </Field>
            <Field label={t.contact.form.email}>
              <Input
                data-testid="input-email"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@company.com"
              />
            </Field>
            <Field label={t.contact.form.phone}>
              <Input
                data-testid="input-phone"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+971 50 123 4567"
              />
            </Field>
            <Field label={t.contact.form.company}>
              <Input
                data-testid="input-company"
                value={form.company}
                onChange={set("company")}
                placeholder="Your company"
              />
            </Field>
            <Field label={t.contact.form.country}>
              <Input
                data-testid="input-country"
                value={form.country}
                onChange={set("country")}
                placeholder="Destination country"
              />
            </Field>
            <Field label={t.contact.form.product}>
              <Select
                value={form.product_interest}
                onValueChange={(v) => setForm({ ...form, product_interest: v })}
              >
                <SelectTrigger data-testid="select-product" className="bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((p) => (
                    <SelectItem key={p.id} value={p.en.title} data-testid={`opt-${p.key}`}>
                      {p[lang].title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other / Multiple">Other / Multiple</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label={t.contact.form.message}>
              <Textarea
                data-testid="input-message"
                required
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Please describe quantities, specifications, target price and shipping incoterms."
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="btn-submit-contact"
            className="mt-6 btn-copper w-full sm:w-auto disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {t.contact.form.sending}
              </>
            ) : (
              <>
                <Send size={16} /> {t.contact.form.submit}
              </>
            )}
          </button>
          <p className="mt-4 text-xs text-slate-500">
            By submitting, you agree to be contacted by our trade team regarding your enquiry.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
      {label}
    </span>
    {children}
  </label>
);

export default Contact;
