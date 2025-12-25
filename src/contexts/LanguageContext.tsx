import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type Language = "en" | "hi" | "mr";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  // ===== NAVBAR =====
  "nav.home": {
    en: "Home",
    hi: "होम",
    mr: "होम",
  },
  "nav.getLegalHelp": {
    en: "Get Legal Help",
    hi: "कानूनी सहायता",
    mr: "कायदेशीर मदत",
  },
  "nav.legalTopics": {
    en: "Legal Topics",
    hi: "कानूनी विषय",
    mr: "कायदेशीर विषय",
  },
  "nav.legalTemplates": {
    en: "Legal Templates",
    hi: "कानूनी टेम्पलेट्स",
    mr: "कायदेशीर टेम्पलेट्स",
  },
  "nav.howItWorks": {
    en: "How It Works",
    hi: "यह कैसे काम करता है",
    mr: "हे कसे कार्य करते",
  },
  "nav.about": {
    en: "About",
    hi: "हमारे बारे में",
    mr: "आमच्याबद्दल",
  },
  "nav.getHelpNow": {
    en: "Get Help Now",
    hi: "अभी मदद पाएं",
    mr: "आता मदत मिळवा",
  },

  // ===== INDEX PAGE =====
  "index.hero.badge": {
    en: "Designed for India's Youth (18-30)",
    hi: "भारत के युवाओं के लिए डिज़ाइन किया गया (18-30)",
    mr: "भारतातील तरुणांसाठी डिझाइन केलेले (18-30)",
  },
  "index.hero.title1": {
    en: "Legal help doesn't have to be",
    hi: "कानूनी मदद",
    mr: "कायदेशीर मदत",
  },
  "index.hero.title2": {
    en: "confusing or scary.",
    hi: "जटिल नहीं होनी चाहिए।",
    mr: "गोंधळात टाकणारी नसावी.",
  },
  "index.hero.title3": {
    en: "We make it simple and practical.",
    hi: "हम इसे आसान बनाते हैं।",
    mr: "आम्ही ते सोपे करतो.",
  },
  "index.hero.description": {
    en: "Overwhelmed by a legal problem? You're not alone. We explain your situation in plain words and show clear next steps you can actually follow.",
    hi: "कानूनी समस्या से परेशान हैं? आप अकेले नहीं हैं। LegalEase आपको आपकी स्थिति समझने और सही कदम उठाने में मदद करता है — बिना किसी डर या भ्रम के।",
    mr: "कायदेशीर समस्येने त्रस्त आहात? तुम्ही एकटे नाही आहात. LegalEase तुम्हाला तुमची परिस्थिती समजून घेण्यास आणि योग्य पुढील पावले उचलण्यास मदत करते — भीती किंवा गोंधळाशिवाय.",
  },
  "index.hero.cta": {
    en: "Start a free chat",
    hi: "कानूनी सहायता प्राप्त करें",
    mr: "कायदेशीर मदत मिळवा",
  },
  "index.hero.learnMore": {
    en: "See How It Works",
    hi: "जानें यह कैसे काम करता है",
    mr: "हे कसे कार्य करते ते जाणून घ्या",
  },
  "index.reassurance.title": {
    en: "We get it — legal issues feel heavy",
    hi: "हम समझते हैं आप कैसा महसूस करते हैं",
    mr: "तुम्हाला कसे वाटते ते आम्ही समजतो",
  },
  "index.reassurance.subtitle": {
    en: "Problems with landlords, scams, or contracts can feel overwhelming. We break things down so you know what to do next.",
    hi: "कानूनी समस्याएं डरावनी और अकेलापन महसूस करा सकती हैं। लेकिन अपने विकल्पों को समझना फिर से नियंत्रण में महसूस करने का पहला कदम है।",
    mr: "कायदेशीर समस्या भयावह आणि एकटेपणाची वाटू शकतात. पण तुमचे पर्याय समजून घेणे ही पुन्हा नियंत्रणात असल्यासारखे वाटण्याची पहिली पायरी आहे.",
  },
  "index.reassurance.notAlone.title": {
    en: "You're Not Alone",
    hi: "आप अकेले नहीं हैं",
    mr: "तुम्ही एकटे नाही",
  },
  "index.reassurance.notAlone.description": {
    en: "Many young people face similar problems — you're not the only one. We'll help you find clear, doable steps.",
    hi: "हजारों भारतीय युवा हर दिन इसी तरह की समस्याओं का सामना करते हैं। हम आपको उनसे निपटने में मदद करने के लिए यहां हैं।",
    mr: "हजारो भारतीय तरुणांना दररोज अशाच समस्यांना तोंड द्यावे लागते. त्यांना मार्गदर्शन करण्यासाठी आम्ही येथे आहोत.",
  },
  "index.reassurance.noJudgment.title": {
    en: "No Judgment Here",
    hi: "यहां कोई आलोचना नहीं",
    mr: "येथे कोणताही निर्णय नाही",
  },
  "index.reassurance.noJudgment.description": {
    en: "No blame or judgement — just straightforward explanations and steps you can take.",
    hi: "चाहे वह स्कैम हो, विवाद हो, या भ्रम — हम आपको छोटा महसूस कराए बिना समझने में मदद करते हैं।",
    mr: "स्कॅम असो, वाद असो किंवा गोंधळ — आम्ही तुम्हाला लहान वाटू न देता समजून घेण्यास मदत करतो.",
  },
  "index.reassurance.clearSteps.title": {
    en: "Clear Next Steps",
    hi: "स्पष्ट अगले कदम",
    mr: "स्पष्ट पुढील पावले",
  },
  "index.reassurance.clearSteps.description": {
    en: "We turn legal jargon into clear, step-by-step actions you can follow right away.",
    hi: "हम जटिल कानूनी मामलों को सरल, कार्यान्वयन योग्य कदमों में बांटते हैं जिन्हें आप वास्तव में अपना सकते हैं।",
    mr: "आम्ही जटिल कायदेशीर बाबी सोप्या, अंमलबजावणीयोग्य पायऱ्यांमध्ये मोडतो ज्या तुम्ही खरोखर अनुसरण करू शकता.",
  },
  "index.howItWorks.title": {
    en: "How LegalEase Works",
    hi: "LegalEase कैसे काम करता है",
    mr: "LegalEase कसे कार्य करते",
  },
  "index.howItWorks.subtitle": {
    en: "Three quick steps to understand what's happening and what to do next",
    hi: "अपनी कानूनी स्थिति को बेहतर समझने के तीन आसान कदम",
    mr: "तुमची कायदेशीर परिस्थिती चांगल्या प्रकारे समजून घेण्यासाठी तीन सोप्या पायऱ्या",
  },
  "index.howItWorks.step1.title": {
    en: "Tell us what happened",
    hi: "हमें बताएं क्या हुआ",
    mr: "आम्हाला सांगा काय झाले",
  },
  "index.howItWorks.step1.description": {
    en: "Search for your issue, paste a suspicious message, or upload a document you can't make sense of.",
    hi: "अपनी समस्या खोजें, संदिग्ध संदेश स्कैन करें, या जो दस्तावेज़ आप नहीं समझते उसे अपलोड करें।",
    mr: "तुमची समस्या शोधा, संशयास्पद संदेश स्कॅन करा किंवा तुम्हाला समजत नसलेला दस्तऐवज अपलोड करा.",
  },
  "index.howItWorks.step2.title": {
    en: "Get clarity instantly",
    hi: "तुरंत स्पष्टता पाएं",
    mr: "त्वरित स्पष्टता मिळवा",
  },
  "index.howItWorks.step2.description": {
    en: "We explain the problem in plain words, why it matters, and what realistic options you have.",
    hi: "हम सरल शब्दों में समझाते हैं कि समस्या क्या है, यह क्यों मायने रखती है, और आपके विकल्प क्या हैं।",
    mr: "आम्ही सोप्या शब्दात समजावून सांगतो की समस्या काय आहे, ती का महत्त्वाची आहे आणि तुमचे पर्याय काय आहेत.",
  },
  "index.howItWorks.step3.title": {
    en: "Take the right next step",
    hi: "सही अगला कदम उठाएं",
    mr: "योग्य पुढील पाऊल उचला",
  },
  "index.howItWorks.step3.description": {
    en: "Follow a short action plan, use our templates, or find local help if the issue needs it.",
    hi: "हमारे मार्गदर्शित कदमों का पालन करें, हमारे टेम्पलेट्स का उपयोग करें, या जरूरत पड़ने पर संसाधनों से जुड़ें।",
    mr: "आमच्या मार्गदर्शित पायऱ्यांचे अनुसरण करा, आमच्या टेम्पलेट्सचा वापर करा किंवा आवश्यक असल्यास संसाधनांशी जोडणी करा.",
  },
  "index.howItWorks.learnMore": {
    en: "See How It Works",
    hi: "हमारे दृष्टिकोण के बारे में और जानें",
    mr: "आमच्या दृष्टिकोनाबद्दल अधिक जाणून घ्या",
  },
  "index.issues.title": {
    en: "Common Issues We Help With",
    hi: "सामान्य समस्याएं जिनमें हम मदद करते हैं",
    mr: "आम्ही ज्या सामान्य समस्यांमध्ये मदत करतो",
  },
  "index.issues.subtitle": {
    en: "Common legal problems young people actually face — explained simply",
    hi: "भारत के युवाओं द्वारा सामना की जाने वाली वास्तविक समस्याएं — सरलीकृत",
    mr: "भारतातील तरुणांना भेडसावणाऱ्या वास्तविक समस्या — सोप्या केल्या",
  },
  "index.issues.rent": {
    en: "Rent & Deposit Disputes",
    hi: "किराया और जमा विवाद",
    mr: "भाडे आणि डिपॉझिट वाद",
  },
  "index.issues.scams": {
    en: "Online Scams & Fraud",
    hi: "ऑनलाइन स्कैम और धोखाधड़ी",
    mr: "ऑनलाइन स्कॅम आणि फसवणूक",
  },
  "index.issues.jobs": {
    en: "Fake Job Offers",
    hi: "नकली नौकरी के प्रस्ताव",
    mr: "बनावट नोकरीच्या ऑफर",
  },
  "index.issues.consumer": {
    en: "Consumer Complaints",
    hi: "उपभोक्ता शिकायतें",
    mr: "ग्राहक तक्रारी",
  },
  "index.issues.fir": {
    en: "FIR & Police Matters",
    hi: "FIR और पुलिस मामले",
    mr: "FIR आणि पोलीस प्रकरणे",
  },
  "index.issues.contracts": {
    en: "Contract Confusion",
    hi: "अनुबंध संबंधी भ्रम",
    mr: "करार संबंधी गोंधळ",
  },
  "index.issues.explore": {
    en: "Explore All Topics",
    hi: "सभी विषय देखें",
    mr: "सर्व विषय पहा",
  },
  "index.cta.title": {
    en: "Ready to get clear about your situation?",
    hi: "अपनी स्थिति समझने के लिए तैयार हैं?",
    mr: "तुमची परिस्थिती समजून घेण्यास तयार आहात?",
  },
  "index.cta.subtitle": {
    en: "Start with a free, confidential chat. We'll give simple, practical steps you can try right away.",
    hi: "स्पष्टता की ओर पहला कदम उठाएं। यह मुफ्त, गोपनीय और सिर्फ आपके लिए डिज़ाइन किया गया है।",
    mr: "स्पष्टतेकडे पहिले पाऊल टाका. हे विनामूल्य, गोपनीय आणि फक्त तुमच्यासाठी डिझाइन केलेले आहे.",
  },
  "index.cta.button": {
    en: "Get Help Now",
    hi: "अभी कानूनी सहायता प्राप्त करें",
    mr: "आता कायदेशीर मदत मिळवा",
  },

  // ===== TOPICS PAGE =====
  "topics.title": {
    en: "Legal Topics",
    hi: "कानूनी विषय",
    mr: "कायदेशीर विषय",
  },
  "topics.subtitle": {
    en: "Browse common legal issues faced by India's youth. Find clear, step-by-step guidance for each.",
    hi: "भारत के युवाओं द्वारा सामना की जाने वाली सामान्य कानूनी समस्याओं को देखें। प्रत्येक के लिए स्पष्ट, चरण-दर-चरण मार्गदर्शन प्राप्त करें।",
    mr: "भारतातील तरुणांना भेडसावणाऱ्या सामान्य कायदेशीर समस्या पहा. प्रत्येकासाठी स्पष्ट, टप्प्याटप्प्याने मार्गदर्शन मिळवा.",
  },
  "topics.explore": {
    en: "Explore topic",
    hi: "विषय देखें",
    mr: "विषय पहा",
  },
  "topics.cta": {
    en: "Can't find your issue? Tell us what happened and we'll help.",
    hi: "आपकी समस्या नहीं मिल रही? हमें बताएं क्या हुआ और हम मदद करेंगे।",
    mr: "तुमची समस्या सापडत नाही? आम्हाला सांगा काय झाले आणि आम्ही मदत करू.",
  },
  "topics.getHelp": {
    en: "Get Personalized Help",
    hi: "व्यक्तिगत सहायता प्राप्त करें",
    mr: "वैयक्तिक मदत मिळवा",
  },
  "topics.rentHousing": {
    en: "Rent & Housing",
    hi: "किराया और आवास",
    mr: "भाडे आणि घर",
  },
  "topics.rentHousing.desc": {
    en: "Deposit disputes, tenant rights, rental agreements, eviction notices",
    hi: "जमा विवाद, किरायेदार अधिकार, किराया समझौते, बेदखली नोटिस",
    mr: "डिपॉझिट वाद, भाडेकरू हक्क, भाडे करार, बेदखली नोटिसा",
  },
  "topics.scamsFraud": {
    en: "Scams & Fraud",
    hi: "स्कैम और धोखाधड़ी",
    mr: "स्कॅम आणि फसवणूक",
  },
  "topics.scamsFraud.desc": {
    en: "Online scams, phishing, fake investment schemes, identity theft",
    hi: "ऑनलाइन स्कैम, फ़िशिंग, नकली निवेश योजनाएं, पहचान की चोरी",
    mr: "ऑनलाइन स्कॅम, फिशिंग, बनावट गुंतवणूक योजना, ओळख चोरी",
  },
  "topics.employment": {
    en: "Employment Issues",
    hi: "रोजगार संबंधी समस्याएं",
    mr: "रोजगार समस्या",
  },
  "topics.employment.desc": {
    en: "Fake job offers, salary disputes, wrongful termination, workplace harassment",
    hi: "नकली नौकरी के प्रस्ताव, वेतन विवाद, गलत बर्खास्तगी, कार्यस्थल उत्पीड़न",
    mr: "बनावट नोकरीच्या ऑफर, पगार वाद, चुकीची बडतर्फी, कामाच्या ठिकाणी छळ",
  },
  "topics.consumer": {
    en: "Consumer Rights",
    hi: "उपभोक्ता अधिकार",
    mr: "ग्राहक हक्क",
  },
  "topics.consumer.desc": {
    en: "Defective products, refund issues, service complaints, warranties",
    hi: "दोषपूर्ण उत्पाद, धनवापसी समस्याएं, सेवा शिकायतें, वारंटी",
    mr: "दोषपूर्ण उत्पादने, परतावा समस्या, सेवा तक्रारी, वॉरंटी",
  },
  "topics.legalDocs": {
    en: "Legal Documents",
    hi: "कानूनी दस्तावेज़",
    mr: "कायदेशीर दस्तऐवज",
  },
  "topics.legalDocs.desc": {
    en: "Understanding contracts, agreements, legal notices, terms & conditions",
    hi: "अनुबंध, समझौते, कानूनी नोटिस, नियम और शर्तों को समझना",
    mr: "करार, समझोते, कायदेशीर नोटिसा, अटी आणि शर्ती समजून घेणे",
  },
  "topics.police": {
    en: "Police & FIR",
    hi: "पुलिस और FIR",
    mr: "पोलीस आणि FIR",
  },
  "topics.police.desc": {
    en: "Filing complaints, understanding FIR process, cybercrime reporting",
    hi: "शिकायत दर्ज करना, FIR प्रक्रिया समझना, साइबर अपराध रिपोर्टिंग",
    mr: "तक्रार दाखल करणे, FIR प्रक्रिया समजून घेणे, सायबर गुन्हे नोंदवणे",
  },
  "topics.family": {
    en: "Family Matters",
    hi: "पारिवारिक मामले",
    mr: "कौटुंबिक बाबी",
  },
  "topics.family.desc": {
    en: "Inheritance basics, property disputes, documentation guidance",
    hi: "विरासत की मूल बातें, संपत्ति विवाद, दस्तावेज़ीकरण मार्गदर्शन",
    mr: "वारसा मूलभूत गोष्टी, मालमत्ता वाद, दस्तऐवजीकरण मार्गदर्शन",
  },
  "topics.banking": {
    en: "Banking & Finance",
    hi: "बैंकिंग और वित्त",
    mr: "बँकिंग आणि वित्त",
  },
  "topics.banking.desc": {
    en: "Loan issues, credit card disputes, unauthorized transactions, debt recovery",
    hi: "ऋण समस्याएं, क्रेडिट कार्ड विवाद, अनधिकृत लेनदेन, ऋण वसूली",
    mr: "कर्ज समस्या, क्रेडिट कार्ड वाद, अनधिकृत व्यवहार, कर्ज वसूली",
  },

  // ===== TEMPLATES PAGE =====
  "templates.title": {
    en: "Legal Templates",
    hi: "कानूनी टेम्पलेट्स",
    mr: "कायदेशीर टेम्पलेट्स",
  },
  "templates.subtitle": {
    en: "Ready-to-use templates for common legal situations. Just fill in your details and use them.",
    hi: "सामान्य कानूनी स्थितियों के लिए तैयार टेम्पलेट्स। बस अपना विवरण भरें और उपयोग करें।",
    mr: "सामान्य कायदेशीर परिस्थितींसाठी तयार टेम्पलेट्स. फक्त तुमचे तपशील भरा आणि वापरा.",
  },
  "templates.useTemplate": {
    en: "Use Template",
    hi: "टेम्पलेट का उपयोग करें",
    mr: "टेम्पलेट वापरा",
  },
  "templates.howToUse": {
    en: "How to use:",
    hi: "उपयोग कैसे करें:",
    mr: "कसे वापरावे:",
  },
  "templates.howToUseDesc": {
    en: "Copy or download this template, then replace all text in [brackets] with your actual information.",
    hi: "इस टेम्पलेट को कॉपी या डाउनलोड करें, फिर [कोष्ठक] में सभी टेक्स्ट को अपनी वास्तविक जानकारी से बदलें।",
    mr: "हा टेम्पलेट कॉपी किंवा डाउनलोड करा, नंतर [कंसात] असलेला सर्व मजकूर तुमच्या खऱ्या माहितीने बदला.",
  },
  "templates.copy": {
    en: "Copy to Clipboard",
    hi: "क्लिपबोर्ड पर कॉपी करें",
    mr: "क्लिपबोर्डवर कॉपी करा",
  },
  "templates.copied": {
    en: "Copied!",
    hi: "कॉपी किया गया!",
    mr: "कॉपी झाले!",
  },
  "templates.download": {
    en: "Download as Text",
    hi: "टेक्स्ट के रूप में डाउनलोड करें",
    mr: "मजकूर म्हणून डाउनलोड करा",
  },
  "templates.note": {
    en: "These templates are quick starting points to help you communicate clearly. They are not legal documents — consult a lawyer for complex or high-stakes situations.",
    hi: "ये टेम्पलेट्स आपको स्पष्ट रूप से संवाद करने में मदद करने के लिए शुरुआती बिंदु हैं। ये कानूनी दस्तावेज़ नहीं हैं। जटिल स्थितियों के लिए, कानूनी पेशेवर से परामर्श करने पर विचार करें।",
    mr: "हे टेम्पलेट्स तुम्हाला स्पष्टपणे संवाद साधण्यात मदत करण्यासाठी सुरुवातीचे बिंदू आहेत. हे कायदेशीर दस्तऐवज नाहीत. जटिल परिस्थितींसाठी, कायदेशीर व्यावसायिकांशी सल्लामसलत करण्याचा विचार करा.",
  },
  "templates.needHelp": {
    en: "Need help choosing a template?",
    hi: "टेम्पलेट चुनने में मदद चाहिए?",
    mr: "टेम्पलेट निवडण्यात मदत हवी आहे?",
  },
  "templates.easy": {
    en: "Easy",
    hi: "आसान",
    mr: "सोपे",
  },
  "templates.medium": {
    en: "Medium",
    hi: "मध्यम",
    mr: "मध्यम",
  },
  "templates.rentHousing": {
    en: "Rent & Housing",
    hi: "किराया और आवास",
    mr: "भाडे आणि घर",
  },
  "templates.employment": {
    en: "Employment",
    hi: "रोजगार",
    mr: "रोजगार",
  },
  "templates.consumerComplaints": {
    en: "Consumer Complaints",
    hi: "उपभोक्ता शिकायतें",
    mr: "ग्राहक तक्रारी",
  },
  "templates.scamReporting": {
    en: "Scam Reporting",
    hi: "स्कैम रिपोर्टिंग",
    mr: "स्कॅम रिपोर्टिंग",
  },
  "templates.templateCopied": {
    en: "Template copied!",
    hi: "टेम्पलेट कॉपी हो गया!",
    mr: "टेम्पलेट कॉपी झाला!",
  },
  "templates.templateCopiedDesc": {
    en: "The template has been copied to your clipboard. Paste it into a document and fill in your details.",
    hi: "टेम्पलेट आपके क्लिपबोर्ड पर कॉपी हो गया है। इसे किसी दस्तावेज़ में पेस्ट करें और अपना विवरण भरें।",
    mr: "टेम्पलेट तुमच्या क्लिपबोर्डवर कॉपी झाला आहे. तो दस्तऐवजात पेस्ट करा आणि तुमचे तपशील भरा.",
  },
  "templates.templateDownloaded": {
    en: "Template downloaded!",
    hi: "टेम्पलेट डाउनलोड हो गया!",
    mr: "टेम्पलेट डाउनलोड झाला!",
  },
  "templates.templateDownloadedDesc": {
    en: "Open the file and fill in your details in the [brackets].",
    hi: "फाइल खोलें और [कोष्ठक] में अपना विवरण भरें।",
    mr: "फाइल उघडा आणि [कंसात] तुमचे तपशील भरा.",
  },

  // ===== HOW IT WORKS PAGE =====
  "hiw.title": {
    en: "How LegalEase Works",
    hi: "LegalEase कैसे काम करता है",
    mr: "LegalEase कसे कार्य करते",
  },
  "hiw.subtitle": {
    en: "Three simple steps from confusion to clarity. No legal knowledge required.",
    hi: "भ्रम से स्पष्टता तक के तीन आसान कदम। कानूनी ज्ञान की आवश्यकता नहीं।",
    mr: "गोंधळापासून स्पष्टतेपर्यंत तीन सोप्या पायऱ्या. कायदेशीर ज्ञान आवश्यक नाही.",
  },
  "hiw.step1.title": {
    en: "Tell Us What Happened",
    hi: "हमें बताएं क्या हुआ",
    mr: "आम्हाला सांगा काय झाले",
  },
  "hiw.step1.desc": {
    en: "Describe your situation in simple words. You can search for your issue, paste a suspicious message you received, or upload a document you don't understand.",
    hi: "अपनी स्थिति को सरल शब्दों में बताएं। आप अपनी समस्या खोज सकते हैं, प्राप्त संदिग्ध संदेश पेस्ट कर सकते हैं, या जो दस्तावेज़ आप नहीं समझते उसे अपलोड कर सकते हैं।",
    mr: "तुमची परिस्थिती सोप्या शब्दात सांगा. तुम्ही तुमची समस्या शोधू शकता, तुम्हाला मिळालेला संशयास्पद संदेश पेस्ट करू शकता किंवा तुम्हाला समजत नसलेला दस्तऐवज अपलोड करू शकता.",
  },
  "hiw.step1.detail1": {
    en: "Use everyday language - no legal terms needed",
    hi: "रोजमर्रा की भाषा का उपयोग करें - कानूनी शब्दों की जरूरत नहीं",
    mr: "दैनंदिन भाषा वापरा - कायदेशीर संज्ञांची गरज नाही",
  },
  "hiw.step1.detail2": {
    en: "Be as specific as you can about what happened",
    hi: "जो हुआ उसके बारे में जितना हो सके विशिष्ट रहें",
    mr: "काय झाले याबद्दल शक्य तितके विशिष्ट व्हा",
  },
  "hiw.step1.detail3": {
    en: "Include relevant dates, amounts, or names if you remember them",
    hi: "अगर आपको याद हो तो प्रासंगिक तारीखें, राशि, या नाम शामिल करें",
    mr: "तुम्हाला आठवत असल्यास संबंधित तारखा, रक्कम किंवा नावे समाविष्ट करा",
  },
  "hiw.step2.title": {
    en: "Understand Your Situation",
    hi: "अपनी स्थिति समझें",
    mr: "तुमची परिस्थिती समजून घ्या",
  },
  "hiw.step2.desc": {
    en: "We break down your issue into three simple parts: What is the problem, why it matters to you, and what your options are.",
    hi: "हम आपकी समस्या को तीन सरल भागों में बांटते हैं: समस्या क्या है, यह आपके लिए क्यों मायने रखती है, और आपके विकल्प क्या हैं।",
    mr: "आम्ही तुमची समस्या तीन सोप्या भागांमध्ये मोडतो: समस्या काय आहे, ती तुमच्यासाठी का महत्त्वाची आहे आणि तुमचे पर्याय काय आहेत.",
  },
  "hiw.step2.detail1": {
    en: "Clear explanation without confusing jargon",
    hi: "भ्रमित करने वाली शब्दावली के बिना स्पष्ट व्याख्या",
    mr: "गोंधळात टाकणाऱ्या शब्दावलीशिवाय स्पष्ट स्पष्टीकरण",
  },
  "hiw.step2.detail2": {
    en: "Relevant laws and rights explained simply",
    hi: "संबंधित कानून और अधिकार सरलता से समझाए गए",
    mr: "संबंधित कायदे आणि हक्क सोप्या भाषेत समजावून सांगितले",
  },
  "hiw.step2.detail3": {
    en: "Common outcomes for similar situations",
    hi: "समान स्थितियों के लिए सामान्य परिणाम",
    mr: "समान परिस्थितींसाठी सामान्य परिणाम",
  },
  "hiw.step3.title": {
    en: "Get Clear Next Steps",
    hi: "स्पष्ट अगले कदम प्राप्त करें",
    mr: "स्पष्ट पुढील पावले मिळवा",
  },
  "hiw.step3.desc": {
    en: "Receive a step-by-step action plan tailored to your situation. Know exactly what to do first, second, and third.",
    hi: "अपनी स्थिति के अनुसार चरण-दर-चरण कार्य योजना प्राप्त करें। जानें कि पहले, दूसरे और तीसरे क्या करना है।",
    mr: "तुमच्या परिस्थितीनुसार टप्प्याटप्प्याने कृती योजना मिळवा. प्रथम, द्वितीय आणि तृतीय काय करायचे ते नक्की जाणून घ्या.",
  },
  "hiw.step3.detail1": {
    en: "Prioritized list of actions to take",
    hi: "करने के लिए कार्यों की प्राथमिकता सूची",
    mr: "करायच्या कृतींची प्राधान्य यादी",
  },
  "hiw.step3.detail2": {
    en: "Ready-to-use templates for letters and complaints",
    hi: "पत्रों और शिकायतों के लिए तैयार टेम्पलेट्स",
    mr: "पत्रे आणि तक्रारींसाठी तयार टेम्पलेट्स",
  },
  "hiw.step3.detail3": {
    en: "Resources and contacts if you need professional help",
    hi: "यदि आपको पेशेवर मदद की जरूरत है तो संसाधन और संपर्क",
    mr: "तुम्हाला व्यावसायिक मदतीची गरज असल्यास संसाधने आणि संपर्क",
  },
  "hiw.approach.title": {
    en: "Our Approach",
    hi: "हमारा दृष्टिकोण",
    mr: "आमचा दृष्टिकोन",
  },
  "hiw.approach.subtitle": {
    en: "We believe legal help should be accessible, understandable, and empowering.",
    hi: "हम मानते हैं कि कानूनी सहायता सुलभ, समझने योग्य और सशक्त बनाने वाली होनी चाहिए।",
    mr: "आमचा विश्वास आहे की कायदेशीर मदत सुलभ, समजण्यास सोपी आणि सक्षम करणारी असावी.",
  },
  "hiw.principle1.title": {
    en: "Plain Language First",
    hi: "पहले सरल भाषा",
    mr: "प्रथम सोपी भाषा",
  },
  "hiw.principle1.desc": {
    en: "We translate complex legal concepts into simple, everyday words that anyone can understand.",
    hi: "हम जटिल कानूनी अवधारणाओं को सरल, रोजमर्रा के शब्दों में अनुवाद करते हैं जिसे कोई भी समझ सकता है।",
    mr: "आम्ही जटिल कायदेशीर संकल्पना सोप्या, दैनंदिन शब्दांमध्ये रूपांतरित करतो ज्या कोणालाही समजू शकतात.",
  },
  "hiw.principle2.title": {
    en: "Clarity, Not Advice",
    hi: "सलाह नहीं, स्पष्टता",
    mr: "सल्ला नाही, स्पष्टता",
  },
  "hiw.principle2.desc": {
    en: "We help you understand your situation. For specific legal decisions, we'll guide you to professionals.",
    hi: "हम आपको आपकी स्थिति समझने में मदद करते हैं। विशिष्ट कानूनी निर्णयों के लिए, हम आपको पेशेवरों के पास मार्गदर्शन करेंगे।",
    mr: "आम्ही तुम्हाला तुमची परिस्थिती समजून घेण्यास मदत करतो. विशिष्ट कायदेशीर निर्णयांसाठी, आम्ही तुम्हाला व्यावसायिकांकडे मार्गदर्शन करू.",
  },
  "hiw.principle3.title": {
    en: "Built for Youth",
    hi: "युवाओं के लिए बनाया गया",
    mr: "तरुणांसाठी बनवलेले",
  },
  "hiw.principle3.desc": {
    en: "Designed specifically for Indians aged 18-30 facing real-world legal challenges for the first time.",
    hi: "विशेष रूप से 18-30 वर्ष के भारतीयों के लिए डिज़ाइन किया गया जो पहली बार वास्तविक दुनिया की कानूनी चुनौतियों का सामना कर रहे हैं।",
    mr: "विशेषतः 18-30 वयोगटातील भारतीयांसाठी डिझाइन केलेले जे पहिल्यांदाच वास्तविक जगातील कायदेशीर आव्हानांना तोंड देत आहेत.",
  },
  "hiw.principle4.title": {
    en: "Step-by-Step Approach",
    hi: "चरण-दर-चरण दृष्टिकोण",
    mr: "टप्प्याटप्प्याने दृष्टिकोन",
  },
  "hiw.principle4.desc": {
    en: "Every explanation follows our three-part structure: What, Why, and What Next.",
    hi: "हर व्याख्या हमारी तीन-भाग संरचना का पालन करती है: क्या, क्यों, और आगे क्या।",
    mr: "प्रत्येक स्पष्टीकरण आमच्या तीन-भाग संरचनेचे अनुसरण करते: काय, का आणि पुढे काय.",
  },
  "hiw.cta.title": {
    en: "Ready to get started?",
    hi: "शुरू करने के लिए तैयार हैं?",
    mr: "सुरू करण्यास तयार आहात?",
  },
  "hiw.cta.subtitle": {
    en: "Describe your situation and let us help you understand your options.",
    hi: "अपनी स्थिति बताएं और हमें आपके विकल्पों को समझने में मदद करने दें।",
    mr: "तुमची परिस्थिती सांगा आणि आम्हाला तुमचे पर्याय समजून घेण्यात मदत करू द्या.",
  },
  "hiw.cta.button": {
    en: "Get Legal Help Now",
    hi: "अभी कानूनी सहायता प्राप्त करें",
    mr: "आता कायदेशीर मदत मिळवा",
  },

  // ===== GET HELP PAGE (existing) =====
  "page.title": {
    en: "Get Legal Help",
    hi: "कानूनी सहायता प्राप्त करें",
    mr: "कायदेशीर मदत मिळवा",
  },
  "page.subtitle": {
    en: "Describe your situation and our AI will guide you through your legal options",
    hi: "अपनी स्थिति बताएं और हमारा AI आपको कानूनी विकल्पों के बारे में मार्गदर्शन करेगा",
    mr: "तुमची परिस्थिती सांगा आणि आमचे AI तुम्हाला कायदेशीर पर्यायांबद्दल मार्गदर्शन करेल",
  },
  "tab.search": {
    en: "AI Search",
    hi: "AI खोज",
    mr: "AI शोध",
  },
  "tab.scan": {
    en: "Scam Scanner",
    hi: "स्कैम स्कैनर",
    mr: "स्कॅम स्कॅनर",
  },
  "tab.upload": {
    en: "Doc Analyzer",
    hi: "दस्तावेज़ विश्लेषक",
    mr: "दस्तऐवज विश्लेषक",
  },
  "tab.chat": {
    en: "AI Chat",
    hi: "AI चैट",
    mr: "AI चॅट",
  },
  "search.title": {
    en: "AI-Powered Legal Search",
    hi: "AI-संचालित कानूनी खोज",
    mr: "AI-चालित कायदेशीर शोध",
  },
  "search.description": {
    en: "Describe what happened in your own words. Our AI will analyze your situation and provide personalized guidance.",
    hi: "अपने शब्दों में बताएं क्या हुआ। हमारा AI आपकी स्थिति का विश्लेषण करेगा और व्यक्तिगत मार्गदर्शन प्रदान करेगा।",
    mr: "तुमच्या शब्दात काय झाले ते सांगा. आमचे AI तुमच्या परिस्थितीचे विश्लेषण करेल आणि वैयक्तिक मार्गदर्शन देईल.",
  },
  "search.placeholder": {
    en: "e.g., My landlord won't return my security deposit...",
    hi: "जैसे, मेरा मकान मालिक मेरी सुरक्षा जमा राशि वापस नहीं कर रहा...",
    mr: "उदा., माझा मकानमालक माझी सिक्युरिटी डिपॉझिट परत करत नाही...",
  },
  "search.button": {
    en: "Get AI Guidance",
    hi: "AI मार्गदर्शन प्राप्त करें",
    mr: "AI मार्गदर्शन मिळवा",
  },
  "search.analyzing": {
    en: "Analyzing with AI...",
    hi: "AI से विश्लेषण हो रहा है...",
    mr: "AI सह विश्लेषण होत आहे...",
  },
  "search.commonSearches": {
    en: "Common searches:",
    hi: "सामान्य खोज:",
    mr: "सामान्य शोध:",
  },
  "search.recommendedSteps": {
    en: "Recommended Steps:",
    hi: "अनुशंसित कदम:",
    mr: "शिफारस केलेले पाऊले:",
  },
  "search.relevantLaw": {
    en: "Relevant Law:",
    hi: "संबंधित कानून:",
    mr: "संबंधित कायदा:",
  },
  "search.learnMore": {
    en: "Learn more about this topic",
    hi: "इस विषय के बारे में और जानें",
    mr: "या विषयाबद्दल अधिक जाणून घ्या",
  },
  "search.professionalAdvice": {
    en: "This matter may require professional legal assistance. Consider consulting a lawyer for personalized advice.",
    hi: "इस मामले में पेशेवर कानूनी सहायता की आवश्यकता हो सकती है। व्यक्तिगत सलाह के लिए वकील से परामर्श लें।",
    mr: "या प्रकरणात व्यावसायिक कायदेशीर मदतीची आवश्यकता असू शकते. वैयक्तिक सल्ल्यासाठी वकिलाचा सल्ला घ्या.",
  },
  "scan.title": {
    en: "AI Scam Scanner",
    hi: "AI स्कैम स्कैनर",
    mr: "AI स्कॅम स्कॅनर",
  },
  "scan.description": {
    en: "Paste a suspicious message, email, or WhatsApp text. Our AI will analyze it for scam indicators.",
    hi: "संदिग्ध संदेश, ईमेल, या WhatsApp टेक्स्ट पेस्ट करें। हमारा AI इसे स्कैम संकेतकों के लिए विश्लेषण करेगा।",
    mr: "संशयास्पद संदेश, ईमेल किंवा WhatsApp मजकूर पेस्ट करा. आमचे AI स्कॅम निर्देशकांसाठी त्याचे विश्लेषण करेल.",
  },
  "scan.info": {
    en: "Our AI is trained to detect common Indian scams including lottery fraud, fake job offers, UPI scams, and phishing attempts.",
    hi: "हमारा AI लॉटरी धोखाधड़ी, नकली नौकरी के प्रस्ताव, UPI घोटाले और फ़िशिंग प्रयासों सहित आम भारतीय घोटालों का पता लगाने के लिए प्रशिक्षित है।",
    mr: "आमचे AI लॉटरी फसवणूक, बनावट नोकरीच्या ऑफर, UPI घोटाळे आणि फिशिंग प्रयत्नांसह सामान्य भारतीय घोटाळे शोधण्यासाठी प्रशिक्षित आहे.",
  },
  "scan.placeholder": {
    en: "Paste the message here...\n\nExample: 'Congratulations! You've won ₹50,000 in our lottery. Send ₹500 processing fee to claim your prize...'",
    hi: "संदेश यहाँ पेस्ट करें...\n\nउदाहरण: 'बधाई हो! आपने हमारी लॉटरी में ₹50,000 जीते हैं। अपना पुरस्कार प्राप्त करने के लिए ₹500 प्रोसेसिंग शुल्क भेजें...'",
    mr: "संदेश येथे पेस्ट करा...\n\nउदाहरण: 'अभिनंदन! तुम्ही आमच्या लॉटरीमध्ये ₹50,000 जिंकलात. तुमचे बक्षीस मिळवण्यासाठी ₹500 प्रोसेसिंग शुल्क पाठवा...'",
  },
  "scan.button": {
    en: "Scan for Scams",
    hi: "स्कैम के लिए स्कैन करें",
    mr: "स्कॅमसाठी स्कॅन करा",
  },
  "scan.scamDetected": {
    en: "⚠️ Scam Detected",
    hi: "⚠️ स्कैम का पता चला",
    mr: "⚠️ स्कॅम आढळला",
  },
  "scan.analysisComplete": {
    en: "Analysis Complete",
    hi: "विश्लेषण पूर्ण",
    mr: "विश्लेषण पूर्ण",
  },
  "scan.redFlags": {
    en: "Red Flags Detected:",
    hi: "चेतावनी संकेत मिले:",
    mr: "इशारा चिन्हे आढळली:",
  },
  "scan.whatToDo": {
    en: "What You Should Do:",
    hi: "आपको क्या करना चाहिए:",
    mr: "तुम्ही काय करावे:",
  },
  "scan.reportTo": {
    en: "Report This Scam To:",
    hi: "इस स्कैम की रिपोर्ट करें:",
    mr: "या स्कॅमची तक्रार करा:",
  },
  "scan.learnProtection": {
    en: "Learn how to protect yourself from scams",
    hi: "जानें कि खुद को स्कैम से कैसे बचाएं",
    mr: "स्कॅमपासून स्वतःचे संरक्षण कसे करावे ते जाणून घ्या",
  },
  "upload.title": {
    en: "AI Document Analyzer",
    hi: "AI दस्तावेज़ विश्लेषक",
    mr: "AI दस्तऐवज विश्लेषक",
  },
  "upload.description": {
    en: "Upload or paste document text (rental agreements, contracts, notices) and our AI will help you understand it. Ask follow-up questions about your document!",
    hi: "दस्तावेज़ टेक्स्ट अपलोड करें या पेस्ट करें (किराये के समझौते, अनुबंध, नोटिस) और हमारा AI इसे समझने में आपकी मदद करेगा। अपने दस्तावेज़ के बारे में फॉलो-अप प्रश्न पूछें!",
    mr: "दस्तऐवज मजकूर अपलोड करा किंवा पेस्ट करा (भाडे करार, करार, नोटिसा) आणि आमचे AI ते समजून घेण्यात मदत करेल. तुमच्या दस्तऐवजाबद्दल फॉलो-अप प्रश्न विचारा!",
  },
  "upload.disclaimer": {
    en: "Understanding Assistance Only",
    hi: "केवल समझने में सहायता",
    mr: "फक्त समजून घेण्यासाठी मदत",
  },
  "upload.disclaimerDesc": {
    en: "This feature helps you understand documents better. For important legal documents, always consult a qualified lawyer.",
    hi: "यह सुविधा दस्तावेजों को बेहतर समझने में मदद करती है। महत्वपूर्ण कानूनी दस्तावेजों के लिए, हमेशा एक योग्य वकील से परामर्श करें।",
    mr: "हे वैशिष्ट्य दस्तऐवज अधिक चांगल्या प्रकारे समजून घेण्यात मदत करते. महत्त्वाच्या कायदेशीर दस्तऐवजांसाठी, नेहमी पात्र वकिलाचा सल्ला घ्या.",
  },
  "upload.uploadFile": {
    en: "Click to upload a document",
    hi: "दस्तावेज़ अपलोड करने के लिए क्लिक करें",
    mr: "दस्तऐवज अपलोड करण्यासाठी क्लिक करा",
  },
  "upload.supportedFormats": {
    en: "TXT files supported. We will try to extract text from PDF/DOC automatically; if extraction fails, please copy-paste the text.",
    hi: "TXT फाइलें समर्थित हैं। हम PDF/DOC से टेक्स्ट स्वचालित रूप से निकालने का प्रयास करेंगे; यदि निष्कर्षण विफल होता है, तो कृपया टेक्स्ट कॉपी-पेस्ट करें।",
    mr: "TXT फायली समर्थित आहेत. आम्ही PDF/DOC मधून मजकूर स्वयंचलितपणे काढण्याचा प्रयत्न करू; निष्कर्षण अयशस्वी झाल्यास कृपया मजकूर कॉपी-पेस्ट करा.",
  },
  "upload.orPaste": {
    en: "or paste text below",
    hi: "या नीचे टेक्स्ट पेस्ट करें",
    mr: "किंवा खाली मजकूर पेस्ट करा",
  },
  "upload.placeholder": {
    en: "Paste your document text here...\n\nExamples: Rental agreement clauses, employment contract terms, legal notices, terms and conditions...",
    hi: "अपने दस्तावेज़ का टेक्स्ट यहाँ पेस्ट करें...\n\nउदाहरण: किराये के समझौते की धाराएं, रोजगार अनुबंध की शर्तें, कानूनी नोटिस, नियम और शर्तें...",
    mr: "तुमच्या दस्तऐवजाचा मजकूर येथे पेस्ट करा...\n\nउदाहरणे: भाडे कराराचे कलम, रोजगार कराराच्या अटी, कायदेशीर नोटिसा, नियम आणि अटी...",
  },
  "upload.analyze": {
    en: "Analyze Document",
    hi: "दस्तावेज़ का विश्लेषण करें",
    mr: "दस्तऐवजाचे विश्लेषण करा",
  },
  "upload.analyzing": {
    en: "Analyzing Document...",
    hi: "दस्तावेज़ का विश्लेषण हो रहा है...",
    mr: "दस्तऐवजाचे विश्लेषण होत आहे...",
  },
  "upload.keyTerms": {
    en: "Key Terms Explained:",
    hi: "प्रमुख शब्दों की व्याख्या:",
    mr: "मुख्य संज्ञांचे स्पष्टीकरण:",
  },
  "upload.yourRights": {
    en: "Your Rights:",
    hi: "आपके अधिकार:",
    mr: "तुमचे हक्क:",
  },
  "upload.yourObligations": {
    en: "Your Obligations:",
    hi: "आपके दायित्व:",
    mr: "तुमच्या जबाबदाऱ्या:",
  },
  "upload.concerns": {
    en: "Points of Concern:",
    hi: "चिंता के बिंदु:",
    mr: "चिंतेचे मुद्दे:",
  },
  "upload.questionsToAsk": {
    en: "Questions to Ask:",
    hi: "पूछने के लिए प्रश्न:",
    mr: "विचारायचे प्रश्न:",
  },
  "upload.recommendation": {
    en: "Recommendation:",
    hi: "सिफारिश:",
    mr: "शिफारस:",
  },
  "upload.askQuestions": {
    en: "Ask Questions About This Document",
    hi: "इस दस्तावेज़ के बारे में प्रश्न पूछें",
    mr: "या दस्तऐवजाबद्दल प्रश्न विचारा",
  },
  "upload.chatWelcome": {
    en: "I've analyzed your document. What would you like to know more about? You can ask me about specific clauses, terms, or anything you didn't understand.",
    hi: "मैंने आपके दस्तावेज़ का विश्लेषण कर दिया है। आप किसके बारे में और जानना चाहेंगे? आप मुझसे विशिष्ट धाराओं, शर्तों, या जो कुछ भी आपको समझ नहीं आया उसके बारे में पूछ सकते हैं।",
    mr: "मी तुमच्या दस्तऐवजाचे विश्लेषण केले आहे. तुम्हाला कशाबद्दल अधिक जाणून घ्यायचे आहे? तुम्ही मला विशिष्ट कलमे, अटी किंवा तुम्हाला समजले नाही असे काहीही विचारू शकता.",
  },
  "upload.askAboutDocument": {
    en: "Ask about this document...",
    hi: "इस दस्तावेज़ के बारे में पूछें...",
    mr: "या दस्तऐवजाबद्दल विचारा...",
  },
  "upload.backToAnalysis": {
    en: "Back to Analysis",
    hi: "विश्लेषण पर वापस जाएं",
    mr: "विश्लेषणावर परत जा",
  },
  "upload.documentLoaded": {
    en: "Document loaded",
    hi: "दस्तावेज़ लोड हो गया",
    mr: "दस्तऐवज लोड झाला",
  },
  "upload.reference": {
    en: "For reference documents, check our",
    hi: "संदर्भ दस्तावेजों के लिए, हमारे देखें",
    mr: "संदर्भ दस्तऐवजांसाठी, आमचे पहा",
  },
  "upload.legalTemplates": {
    en: "Legal Templates",
    hi: "कानूनी टेम्पलेट्स",
    mr: "कायदेशीर टेम्पलेट्स",
  },
  "upload.or": {
    en: "or",
    hi: "या",
    mr: "किंवा",
  },
  "upload.browseLegalTopics": {
    en: "browse Legal Topics",
    hi: "कानूनी विषय देखें",
    mr: "कायदेशीर विषय पहा",
  },
  "upload.fileTooLarge": {
    en: "File too large",
    hi: "फाइल बहुत बड़ी है",
    mr: "फाइल खूप मोठी आहे",
  },
  "upload.fileTooLargeDesc": {
    en: "Please upload a file smaller than 5MB",
    hi: "कृपया 5MB से छोटी फाइल अपलोड करें",
    mr: "कृपया 5MB पेक्षा लहान फाइल अपलोड करा",
  },
  "upload.invalidFile": {
    en: "Invalid file type",
    hi: "अमान्य फाइल प्रकार",
    mr: "अवैध फाइल प्रकार",
  },
  "upload.invalidFileDesc": {
    en: "Please upload a TXT, PDF, DOC, or DOCX file",
    hi: "कृपया TXT, PDF, DOC, या DOCX फाइल अपलोड करें",
    mr: "कृपया TXT, PDF, DOC किंवा DOCX फाइल अपलोड करा",
  },
  "upload.pdfNotice": {
    en: "PDF/DOC files",
    hi: "PDF/DOC फाइलें",
    mr: "PDF/DOC फायली",
  },
  "upload.pdfNoticeDesc": {
    en: "We will try to extract text from PDFs/DOCs automatically. If extraction fails, please paste the text manually for best results.",
    hi: "हम PDF/DOC से टेक्स्ट स्वचालित रूप से निकालने का प्रयास करेंगे। यदि निष्कर्षण विफल होता है, तो सर्वोत्तम परिणामों के लिए कृपया टेक्स्ट मैन्युअल रूप से पेस्ट करें।",
    mr: "आम्ही PDF/DOC मधून मजकूर स्वयंचलितपणे काढण्याचा प्रयत्न करू. निष्कर्षण अयशस्वीरित्या झाल्यास सर्वोत्तम निकालांसाठी कृपया मजकूर हस्ते पेस्ट करा.",
  },
  "upload.extracted": {
    en: "Text extracted",
    hi: "टेक्स्ट निकाला गया",
    mr: "मजकूर काढला",
  },
  "upload.extractedDesc": {
    en: "We extracted text from your file. Please review it below before analyzing.",
    hi: "हमने आपकी फाइल से टेक्स्ट निकाला है। कृपया विश्लेषण से पहले नीचे इसकी समीक्षा करें।",
    mr: "आम्ही तुमच्या फाईलमधून मजकूर काढला आहे. कृपया विश्लेषित करण्यापूर्वी खाली तपासा.",
  },
  "upload.enterDocument": {
    en: "Please enter document text",
    hi: "कृपया दस्तावेज़ टेक्स्ट दर्ज करें",
    mr: "कृपया दस्तऐवज मजकूर प्रविष्ट करा",
  },
  "upload.enterDocumentDesc": {
    en: "Paste the document content you want to understand.",
    hi: "जो दस्तावेज़ सामग्री आप समझना चाहते हैं उसे पेस्ट करें।",
    mr: "तुम्हाला समजून घ्यायची असलेली दस्तऐवज सामग्री पेस्ट करा.",
  },
  "upload.tooShort": {
    en: "Document too short",
    hi: "दस्तावेज़ बहुत छोटा है",
    mr: "दस्तऐवज खूप लहान आहे",
  },
  "upload.tooShortDesc": {
    en: "Please provide more content for meaningful analysis.",
    hi: "सार्थक विश्लेषण के लिए कृपया अधिक सामग्री प्रदान करें।",
    mr: "अर्थपूर्ण विश्लेषणासाठी कृपया अधिक सामग्री प्रदान करा.",
  },
  "upload.analysisError": {
    en: "Analysis Error",
    hi: "विश्लेषण त्रुटि",
    mr: "विश्लेषण त्रुटी",
  },
  "upload.error": {
    en: "Something went wrong",
    hi: "कुछ गलत हो गया",
    mr: "काहीतरी चूक झाली",
  },
  "upload.errorDesc": {
    en: "Please try again in a moment.",
    hi: "कृपया कुछ क्षणों में पुनः प्रयास करें।",
    mr: "कृपया काही क्षणांत पुन्हा प्रयत्न करा.",
  },
  "upload.chatError": {
    en: "Chat Error",
    hi: "चैट त्रुटि",
    mr: "चॅट त्रुटी",
  },
  "chat.title": {
    en: "Legal AI Assistant",
    hi: "कानूनी AI सहायक",
    mr: "कायदेशीर AI सहाय्यक",
  },
  "chat.description": {
    en: "Chat with our AI about any legal questions. Get guidance on Indian law topics.",
    hi: "किसी भी कानूनी प्रश्न के बारे में हमारे AI से बात करें। भारतीय कानून विषयों पर मार्गदर्शन प्राप्त करें।",
    mr: "कोणत्याही कायदेशीर प्रश्नांबद्दल आमच्या AI शी बोला. भारतीय कायदा विषयांवर मार्गदर्शन मिळवा.",
  },
  "chat.welcome": {
    en: "Tell me what's happening — I'll help you understand your options.",
    hi: "आज मैं आपकी कैसे मदद कर सकता हूँ?",
    mr: "आज मी तुम्हाला कशी मदत करू शकतो?",
  },
  "chat.welcomeSubtitle": {
    en: "Ask about landlord issues, consumer problems, scams, FIRs, or other India-specific legal matters.",
    hi: "मुझसे किरायेदार अधिकार, उपभोक्ता शिकायत, स्कैम, FIR, या भारत से संबंधित किसी भी कानूनी विषय के बारे में पूछें।",
    mr: "मला भाडेकरू अधिकार, ग्राहक तक्रारी, स्कॅम, FIR किंवा भारताशी संबंधित कोणत्याही कायदेशीर विषयाबद्दल विचारा.",
  },
  "chat.placeholder": {
    en: "Type your legal question...",
    hi: "अपना कानूनी प्रश्न टाइप करें...",
    mr: "तुमचा कायदेशीर प्रश्न टाइप करा...",
  },
  "chat.newChat": {
    en: "New Chat",
    hi: "नई चैट",
    mr: "नवीन चॅट",
  },
  "chat.thinking": {
    en: "Thinking...",
    hi: "सोच रहा हूँ...",
    mr: "विचार करत आहे...",
  },
  "chat.disclaimer": {
    en: "AI provides general guidance only. Consult a lawyer for legal advice.",
    hi: "AI केवल सामान्य मार्गदर्शन प्रदान करता है। कानूनी सलाह के लिए वकील से परामर्श करें।",
    mr: "AI फक्त सामान्य मार्गदर्शन देते. कायदेशीर सल्ल्यासाठी वकिलाचा सल्ला घ्या.",
  },
  "common.priority": {
    en: "Priority",
    hi: "प्राथमिकता",
    mr: "प्राधान्य",
  },
  "common.high": {
    en: "High",
    hi: "उच्च",
    mr: "उच्च",
  },
  "common.medium": {
    en: "Medium",
    hi: "मध्यम",
    mr: "मध्यम",
  },
  "common.low": {
    en: "Low",
    hi: "निम्न",
    mr: "कमी",
  },
  "common.confidence": {
    en: "Confidence",
    hi: "विश्वास",
    mr: "विश्वास",
  },
  "trust.note": {
    en: "Our assistant offers clear guidance to help you understand your situation. For specific legal action or formal advice, consult a qualified lawyer.",
    hi: "LegalEase AI आपकी स्थिति को समझने में मदद करने के लिए मार्गदर्शन और स्पष्टता प्रदान करता है। विशिष्ट कानूनी मामलों के लिए, हम एक योग्य कानूनी पेशेवर से परामर्श करने की सलाह देते हैं।",
    mr: "LegalEase AI तुमची परिस्थिती समजून घेण्यात मदत करण्यासाठी मार्गदर्शन आणि स्पष्टता प्रदान करते. विशिष्ट कायदेशीर बाबींसाठी, आम्ही पात्र कायदेशीर व्यावसायिकांशी सल्लामसलत करण्याची शिफारस करतो.",
  },
  "language.en": {
    en: "English",
    hi: "English",
    mr: "English",
  },
  "language.hi": {
    en: "हिंदी",
    hi: "हिंदी",
    mr: "हिंदी",
  },
  "language.mr": {
    en: "मराठी",
    hi: "मराठी",
    mr: "मराठी",
  },
  
  // ===== AUTH =====
  "auth.welcomeBack": {
    en: "Welcome back",
    hi: "वापस स्वागत है",
    mr: "पुन्हा स्वागत आहे",
  },
  "auth.createAccount": {
    en: "Create your account",
    hi: "अपना खाता बनाएं",
    mr: "तुमचे खाते तयार करा",
  },
  "auth.signInSubtitle": {
    en: "Sign in to save your chat history and preferences",
    hi: "अपनी चैट इतिहास और प्राथमिकताएं सहेजने के लिए साइन इन करें",
    mr: "तुमचा चॅट इतिहास आणि प्राधान्ये जतन करण्यासाठी साइन इन करा",
  },
  "auth.signUpSubtitle": {
    en: "Join LegalEase to save your conversations and get personalized help",
    hi: "अपनी बातचीत सहेजने और व्यक्तिगत सहायता पाने के लिए LegalEase से जुड़ें",
    mr: "तुमची संभाषणे जतन करण्यासाठी आणि वैयक्तिक मदत मिळवण्यासाठी LegalEase मध्ये सामील व्हा",
  },
  "auth.email": {
    en: "Email",
    hi: "ईमेल",
    mr: "ईमेल",
  },
  "auth.password": {
    en: "Password",
    hi: "पासवर्ड",
    mr: "पासवर्ड",
  },
  "auth.signIn": {
    en: "Sign In",
    hi: "साइन इन करें",
    mr: "साइन इन करा",
  },
  "auth.signUp": {
    en: "Sign Up",
    hi: "साइन अप करें",
    mr: "साइन अप करा",
  },
  "auth.signingIn": {
    en: "Signing in...",
    hi: "साइन इन हो रहा है...",
    mr: "साइन इन होत आहे...",
  },
  "auth.creatingAccount": {
    en: "Creating account...",
    hi: "खाता बनाया जा रहा है...",
    mr: "खाते तयार होत आहे...",
  },
  "auth.haveAccount": {
    en: "Already have an account?",
    hi: "पहले से खाता है?",
    mr: "आधीच खाते आहे?",
  },
  "auth.noAccount": {
    en: "Don't have an account?",
    hi: "खाता नहीं है?",
    mr: "खाते नाही?",
  },
  "auth.signOut": {
    en: "Sign Out",
    hi: "साइन आउट करें",
    mr: "साइन आउट करा",
  },
  "auth.benefits": {
    en: "Save your chat history • Sync language preferences • Get personalized guidance",
    hi: "अपनी चैट इतिहास सहेजें • भाषा प्राथमिकताएं सिंक करें • व्यक्तिगत मार्गदर्शन प्राप्त करें",
    mr: "तुमचा चॅट इतिहास जतन करा • भाषा प्राधान्ये सिंक करा • वैयक्तिक मार्गदर्शन मिळवा",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("legalease-language");
    return (saved as Language) || "en";
  });
  const [user, setUser] = useState<User | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load language preference from database for logged-in users
  const loadLanguagePreference = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("preferred_language")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data?.preferred_language) {
        setLanguageState(data.preferred_language as Language);
        localStorage.setItem("legalease-language", data.preferred_language);
      }
    } catch (error) {
      console.error("Failed to load language preference:", error);
    }
  }, [user]);

  useEffect(() => {
    loadLanguagePreference();
  }, [loadLanguagePreference]);

  // Update language and save to database
  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("legalease-language", lang);

    if (user) {
      try {
        await supabase
          .from("profiles")
          .update({ preferred_language: lang })
          .eq("user_id", user.id);
      } catch (error) {
        console.error("Failed to save language preference:", error);
      }
    }
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
