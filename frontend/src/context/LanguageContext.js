import React, { createContext, useContext, useState, useMemo } from "react";

const dict = {
  en: {
    nav: {
      about: "About",
      products: "Products",
      why: "Why Us",
      testimonials: "Clients",
      certifications: "Certifications",
      contact: "Contact",
      brochure: "Download Brochure",
      quote: "Get a Quote",
    },
    hero: {
      eyebrow: "Global Export & Import • Since 2025",
      title: "Your Trusted Partner in Global Trade",
      subtitle:
        "Commercion Exim Pvt Ltd is India's new-generation export-import house — connecting world-class Indian manufacturers with global buyers across engineering, chemicals, textiles, handicrafts, EVs and more. Delivered on time, backed by transparent documentation.",
      cta: "Get a Quote",
      cta2: "Explore Products",
      stat1: "20+",
      stat1_l: "Target markets",
      stat2: "500+",
      stat2_l: "Partner factories",
      stat3: "10",
      stat3_l: "Product verticals",
      stat4: "24 hrs",
      stat4_l: "Quote turnaround",
    },
    about: {
      eyebrow: "About Commercion Exim",
      title: "Built on integrity. Delivered with precision.",
      body:
        "Founded in 2025, Commercion Exim was built on a simple promise — connect world-class Indian manufacturers with global buyers, and stand behind every shipment. We source directly from vetted factories, enforce rigorous quality control, and handle end-to-end logistics so our partners can trust every consignment.",
      p1: "Direct-from-factory sourcing across 10 verticals",
      p2: "ISO-aligned QC checks before every dispatch",
      p3: "Door-to-door logistics with real-time tracking",
      p4: "Compliant with IEC, DGFT, and destination-country norms",
    },
    products: {
      eyebrow: "Our Product Categories",
      title: "A diversified export portfolio, engineered for scale.",
      body:
        "We handle bulk B2B orders across ten specialised verticals — every product independently quality-checked, packaged for ocean freight, and shipped from Indian ports to your destination.",
      quote: "Request Quote",
    },
    why: {
      eyebrow: "Why Choose Us",
      title: "Global standards. Local sourcing. Zero compromise.",
      items: [
        {
          t: "Stringent Quality Control",
          d: "Multi-stage inspection with third-party labs and factory audits before every dispatch.",
        },
        {
          t: "Vast Supplier Network",
          d: "1,200+ vetted manufacturers across India, giving you the best price without sacrificing quality.",
        },
        {
          t: "End-to-End Logistics",
          d: "Container booking, customs, documentation and last-mile — all coordinated by one team.",
        },
        {
          t: "Transparent Documentation",
          d: "Digital LC handling, real-time invoice tracking, and DGFT/IEC-compliant paperwork.",
        },
        {
          t: "Dedicated Trade Manager",
          d: "One point of contact for your entire order — from quote to delivery confirmation.",
        },
        {
          t: "Flexible Payment Terms",
          d: "LC, TT, and open account structures tailored to your regulatory environment.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Trusted by importers worldwide",
      title: "What our clients say",
    },
    cert: {
      eyebrow: "Compliance & Recognitions",
      title: "Fully certified. Fully accountable.",
      items: [
        { t: "IEC Registered", d: "Import Export Code issued by DGFT, Govt. of India." },
        { t: "MSME Registered", d: "Udyam-certified under Ministry of MSME." },
        { t: "GST Compliant", d: "Registered under Indian GST for cross-border trade." },
        { t: "ISO 9001:2015", d: "Quality management aligned with international standards." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Request a quote — reply within 24 hours",
      body:
        "Share your requirement and our trade team will send a detailed quotation with product specs, MOQ, packaging, and FOB / CIF pricing.",
      addr_l: "Head Office",
      phone_l: "Phone",
      email_l: "Email",
      hours_l: "Business Hours",
      hours_v: "Mon – Sat · 9:30 AM – 7:00 PM IST",
      form: {
        name: "Full name",
        email: "Business email",
        phone: "Phone (with country code)",
        company: "Company",
        country: "Destination country",
        product: "Product interest",
        message: "Requirement details",
        submit: "Send Enquiry",
        sending: "Sending...",
        success: "Enquiry received — our trade team will contact you within 24 hours.",
        error: "Could not submit. Please try again or email us directly.",
      },
    },
    footer: {
      tagline: "Global Export & Import — from India, for the world.",
      quick: "Quick Links",
      cats: "Categories",
      reach: "Reach Us",
      rights: "© 2025 Commercion Exim Pvt Ltd. All rights reserved.",
    },
  },
  hi: {
    nav: {
      about: "हमारे बारे में",
      products: "उत्पाद",
      why: "क्यों चुनें",
      testimonials: "ग्राहक",
      certifications: "प्रमाणपत्र",
      contact: "संपर्क",
      brochure: "ब्रोशर डाउनलोड",
      quote: "कोटेशन प्राप्त करें",
    },
    hero: {
      eyebrow: "वैश्विक निर्यात व आयात • 2025 से",
      title: "वैश्विक व्यापार में आपका विश्वसनीय साथी",
      subtitle:
        "कॉमर्सियन एक्ज़िम प्रा. लि. भारत का नई-पीढ़ी का एक्सपोर्ट-इंपोर्ट हाउस है — विश्व-स्तरीय भारतीय निर्माताओं को इंजीनियरिंग, केमिकल्स, वस्त्र, हस्तशिल्प, ईवी और अधिक में वैश्विक खरीदारों से जोड़ता है।",
      cta: "कोटेशन प्राप्त करें",
      cta2: "उत्पाद देखें",
      stat1: "20+",
      stat1_l: "लक्षित बाज़ार",
      stat2: "500+",
      stat2_l: "साझेदार फैक्ट्रियाँ",
      stat3: "10",
      stat3_l: "उत्पाद श्रेणियाँ",
      stat4: "24 घं",
      stat4_l: "कोटेशन प्रतिक्रिया",
    },
    about: {
      eyebrow: "कॉमर्सियन एक्ज़िम के बारे में",
      title: "ईमानदारी पर आधारित। सटीकता से दी गई।",
      body:
        "2025 में स्थापित, कॉमर्सियन एक्ज़िम एक सरल वादे पर बनी है — विश्व-स्तरीय भारतीय निर्माताओं को वैश्विक खरीदारों से जोड़ना, और हर शिपमेंट के पीछे खड़े रहना। हम सत्यापित निर्माताओं से सीधा सोर्सिंग करते हैं, सख्त गुणवत्ता नियंत्रण लागू करते हैं, और सम्पूर्ण लॉजिस्टिक्स संभालते हैं।",
      p1: "10 वर्टिकल्स में फैक्ट्री-से-सीधी सोर्सिंग",
      p2: "हर शिपमेंट से पहले ISO-मानक QC जाँच",
      p3: "रीयल-टाइम ट्रैकिंग के साथ डोर-टू-डोर लॉजिस्टिक्स",
      p4: "IEC, DGFT और गंतव्य-देश मानदंडों के अनुरूप",
    },
    products: {
      eyebrow: "हमारी उत्पाद श्रेणियाँ",
      title: "विविध निर्यात पोर्टफोलियो, स्केल के लिए तैयार।",
      body:
        "हम दस विशेष वर्टिकल्स में बल्क B2B ऑर्डर संभालते हैं — हर उत्पाद स्वतंत्र रूप से गुणवत्ता-जाँचा गया, ओशन फ्रेट के लिए पैक किया गया।",
      quote: "कोटेशन माँगें",
    },
    why: {
      eyebrow: "क्यों चुनें",
      title: "वैश्विक मानक। स्थानीय सोर्सिंग। शून्य समझौता।",
      items: [
        { t: "कठोर गुणवत्ता नियंत्रण", d: "हर डिस्पैच से पहले तृतीय-पक्ष लैब और फैक्ट्री ऑडिट।" },
        { t: "विशाल आपूर्तिकर्ता नेटवर्क", d: "1,200+ सत्यापित निर्माता, बिना गुणवत्ता से समझौता।" },
        { t: "एंड-टू-एंड लॉजिस्टिक्स", d: "कंटेनर बुकिंग, कस्टम्स, दस्तावेज़ीकरण — एक टीम।" },
        { t: "पारदर्शी दस्तावेज़", d: "डिजिटल LC, इनवॉइस ट्रैकिंग, DGFT/IEC-अनुपालन।" },
        { t: "समर्पित ट्रेड मैनेजर", d: "आपके पूरे ऑर्डर के लिए एक ही संपर्क बिंदु।" },
        { t: "लचीली भुगतान शर्तें", d: "LC, TT, ओपन अकाउंट — आपके नियमों के अनुसार।" },
      ],
    },
    testimonials: { eyebrow: "दुनिया भर के आयातकों का भरोसा", title: "हमारे ग्राहक क्या कहते हैं" },
    cert: {
      eyebrow: "अनुपालन एवं मान्यताएँ",
      title: "पूर्ण रूप से प्रमाणित। पूर्ण रूप से जवाबदेह।",
      items: [
        { t: "IEC पंजीकृत", d: "DGFT, भारत सरकार द्वारा जारी।" },
        { t: "MSME पंजीकृत", d: "MSME मंत्रालय के तहत उद्यम-प्रमाणित।" },
        { t: "GST अनुपालन", d: "सीमा-पार व्यापार के लिए GST पंजीकृत।" },
        { t: "ISO 9001:2015", d: "अंतर्राष्ट्रीय गुणवत्ता प्रबंधन मानक।" },
      ],
    },
    contact: {
      eyebrow: "संपर्क",
      title: "कोटेशन के लिए अनुरोध करें — 24 घंटे में उत्तर",
      body: "अपनी आवश्यकता साझा करें, हमारी टीम विस्तृत कोटेशन भेजेगी।",
      addr_l: "मुख्य कार्यालय",
      phone_l: "फ़ोन",
      email_l: "ईमेल",
      hours_l: "कार्य समय",
      hours_v: "सोम – शनि · 9:30 AM – 7:00 PM IST",
      form: {
        name: "पूरा नाम",
        email: "बिज़नेस ईमेल",
        phone: "फ़ोन (देश कोड सहित)",
        company: "कंपनी",
        country: "गंतव्य देश",
        product: "उत्पाद रुचि",
        message: "आवश्यकता का विवरण",
        submit: "पूछताछ भेजें",
        sending: "भेज रहे हैं...",
        success: "पूछताछ प्राप्त हुई — हमारी टीम 24 घंटे में संपर्क करेगी।",
        error: "सबमिट नहीं हो सका। कृपया दोबारा प्रयास करें।",
      },
    },
    footer: {
      tagline: "वैश्विक निर्यात एवं आयात — भारत से, दुनिया के लिए।",
      quick: "त्वरित लिंक",
      cats: "श्रेणियाँ",
      reach: "हम तक पहुँचें",
      rights: "© 2025 कॉमर्सियन एक्ज़िम प्रा. लि. सर्वाधिकार सुरक्षित।",
    },
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
