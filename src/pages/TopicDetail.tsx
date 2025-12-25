import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Lightbulb, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const topicDetails: Record<string, {
  title: string;
  description: string;
  whatIsIt: string;
  whyItMatters: string;
  steps: string[];
  tips: string[];
  resources: { title: string; description: string }[];
}> = {
  "rent-housing": {
    title: "Rent & Housing",
    description: "Understanding your rights as a tenant in India",
    whatIsIt: "Rent and housing disputes are disagreements between landlords and tenants about issues like security deposits, maintenance, rent increases, or eviction. These are governed by state-specific Rent Control Acts and the Indian Contract Act.",
    whyItMatters: "As a tenant, you have legal rights that protect you from unfair practices. Knowing these rights helps you negotiate confidently and take action when needed. Most disputes can be resolved through proper communication and documentation.",
    steps: [
      "Document everything — keep copies of your rental agreement, receipts, and all communication with your landlord",
      "Send a formal written notice to your landlord explaining the issue clearly",
      "If there's no response within 15 days, send a legal notice through a lawyer or use our template",
      "File a complaint with the Rent Control Court if the issue remains unresolved",
      "For urgent matters, approach the local police or consumer forum"
    ],
    tips: [
      "Always pay rent through bank transfer or UPI for proof of payment",
      "Take photos/videos of the property when moving in and out",
      "Keep a copy of your rental agreement — it's your primary evidence",
      "Security deposit should typically not exceed 2-3 months' rent"
    ],
    resources: [
      { title: "Rent Control Act", description: "Check your state's specific rent control legislation" },
      { title: "Consumer Forum", description: "File complaints for unfair landlord practices" },
      { title: "Legal Aid", description: "Free legal assistance for eligible individuals" }
    ]
  },
  "scams-fraud": {
    title: "Scams & Fraud",
    description: "Protecting yourself from online and offline scams",
    whatIsIt: "Scams are deceptive schemes designed to steal your money or personal information. Common types include phishing, lottery scams, job fraud, investment schemes, and UPI fraud. These are punishable under the IT Act and Indian Penal Code.",
    whyItMatters: "Scammers target young people through social media, job portals, and messaging apps. Acting quickly after a scam can help recover your money and prevent others from being victimized. Reporting also helps authorities track and catch scammers.",
    steps: [
      "Stop all communication with the scammer immediately",
      "If you shared bank details or made a payment, contact your bank RIGHT AWAY",
      "Take screenshots of all conversations, payment receipts, and scammer details",
      "File a complaint on cybercrime.gov.in or call the cybercrime helpline 1930",
      "File an FIR at your local police station with all evidence"
    ],
    tips: [
      "Never share OTP, PIN, or CVV with anyone — banks never ask for these",
      "If an offer seems too good to be true, it probably is",
      "Verify job offers by checking company websites and calling their official numbers",
      "Be suspicious of urgency — scammers create pressure to prevent you from thinking"
    ],
    resources: [
      { title: "Cybercrime Portal", description: "Report online fraud at cybercrime.gov.in" },
      { title: "Helpline 1930", description: "National cybercrime helpline for immediate assistance" },
      { title: "RBI Ombudsman", description: "For banking fraud complaints" }
    ]
  },
  "employment-issues": {
    title: "Employment Issues",
    description: "Know your workplace rights and protections",
    whatIsIt: "Employment issues include fake job offers, unpaid salaries, wrongful termination, and workplace harassment. These are governed by various labor laws including the Payment of Wages Act, Industrial Disputes Act, and POSH Act.",
    whyItMatters: "Understanding your employment rights protects you from exploitation and helps you take appropriate action. Many young professionals face these issues when starting their careers. Knowing the proper channels can help resolve disputes effectively.",
    steps: [
      "Gather all documentation — offer letter, salary slips, employment contract, communication records",
      "Approach your HR department first with a written complaint",
      "If unresolved, file a complaint with the Labour Commissioner's office",
      "For harassment cases, approach the Internal Complaints Committee (ICC)",
      "Consider legal action through Labour Court if other avenues fail"
    ],
    tips: [
      "Always get an offer letter before joining any company",
      "Keep copies of all salary slips and tax documents",
      "Verify company details on MCA portal before accepting offers",
      "Document any verbal agreements through follow-up emails"
    ],
    resources: [
      { title: "Labour Commissioner", description: "State-wise labour department contacts" },
      { title: "EPFO Portal", description: "Check your PF balance and employer contributions" },
      { title: "POSH Guidelines", description: "Understanding workplace harassment laws" }
    ]
  },
  "consumer-rights": {
    title: "Consumer Rights",
    description: "Your rights when buying products and services",
    whatIsIt: "Consumer rights protect you when purchasing goods or services. The Consumer Protection Act 2019 gives you the right to safety, information, choice, and redressal. This covers everything from defective products to misleading advertisements.",
    whyItMatters: "As a consumer, you have powerful legal protections. Companies must honor warranties, provide refunds for defective goods, and cannot engage in unfair trade practices. The consumer forum provides a quick and affordable way to resolve disputes.",
    steps: [
      "Contact the seller/company's customer service with your complaint in writing",
      "Keep all bills, warranty cards, and communication records",
      "If no response in 30 days, file a complaint on consumerhelpline.gov.in",
      "You can file a case in Consumer Forum (District, State, or National based on claim amount)",
      "No lawyer is required — you can represent yourself"
    ],
    tips: [
      "Always keep purchase receipts and warranty cards",
      "Take photos of defective products as evidence",
      "Check return and refund policies before purchasing",
      "Consumer Forum cases under ₹1 crore go to District Forum"
    ],
    resources: [
      { title: "Consumer Helpline", description: "Call 1800-11-4000 (toll-free) or file online" },
      { title: "E-Daakhil Portal", description: "File consumer complaints online" },
      { title: "CCPA", description: "Central Consumer Protection Authority for unfair practices" }
    ]
  },
  "legal-documents": {
    title: "Legal Documents",
    description: "Understanding contracts, agreements, and legal notices",
    whatIsIt: "Legal documents include contracts, agreements, legal notices, and terms & conditions. These create binding obligations between parties. Understanding them before signing protects you from unfavorable terms.",
    whyItMatters: "Many disputes arise from misunderstanding document terms. Reading and understanding before signing can prevent future legal problems. If you receive a legal notice, responding appropriately within the deadline is crucial.",
    steps: [
      "Read the entire document carefully, especially fine print",
      "Note key terms: payment, duration, termination, penalties",
      "Ask for clarification on any unclear clauses before signing",
      "If you receive a legal notice, note the deadline and don't ignore it",
      "Consult a lawyer if the document involves significant money or rights"
    ],
    tips: [
      "Never sign a blank document or one you don't understand",
      "Keep copies of all signed documents",
      "Legal notices typically require response within 15-30 days",
      "Email agreements can be legally binding too"
    ],
    resources: [
      { title: "E-Courts Services", description: "Check case status and cause lists" },
      { title: "Tele-Law", description: "Free legal advice via video call" },
      { title: "NALSA", description: "National Legal Services Authority for free legal aid" }
    ]
  },
  "police-fir": {
    title: "Police & FIR",
    description: "Understanding the complaint and FIR process",
    whatIsIt: "An FIR (First Information Report) is a document prepared by police when they receive information about a cognizable offense. It's the first step in the criminal justice process. Not all complaints require an FIR — some are handled through NCR (Non-Cognizable Report).",
    whyItMatters: "Filing an FIR is your right, and police are legally obligated to register it for cognizable offenses. Understanding when and how to file ensures your complaint is properly recorded and investigated.",
    steps: [
      "Go to the police station having jurisdiction over the area where the incident occurred",
      "Explain the incident clearly to the officer in charge",
      "Insist on getting your FIR registered — it's your legal right",
      "Get a copy of the FIR with the FIR number",
      "If police refuse, approach the SP or file a complaint with the magistrate"
    ],
    tips: [
      "You can file an FIR at any police station (Zero FIR concept)",
      "FIR can be filed in English or regional language",
      "Keep a copy of the FIR safely",
      "For cybercrimes, you can file online at cybercrime.gov.in"
    ],
    resources: [
      { title: "Cybercrime Portal", description: "Report cyber offenses online" },
      { title: "Women Helpline", description: "181 for women-related complaints" },
      { title: "Human Rights Commission", description: "For police misconduct complaints" }
    ]
  },
  "family-matters": {
    title: "Family Matters",
    description: "Understanding inheritance, property, and family documentation",
    whatIsIt: "Family legal matters include inheritance, property succession, and documentation like wills and succession certificates. These are governed by personal laws (Hindu Succession Act, Muslim Personal Law, etc.) and the Indian Succession Act.",
    whyItMatters: "Understanding succession and property rights helps prevent family disputes. Proper documentation ensures smooth transfer of assets. Many young people face these issues when dealing with ancestral property or after losing a family member.",
    steps: [
      "Identify whether the property is ancestral or self-acquired",
      "Gather all property documents, death certificates, and family tree records",
      "Apply for succession certificate from civil court if needed",
      "For disputes, try family mediation before court proceedings",
      "Register property transfers to avoid future disputes"
    ],
    tips: [
      "Daughters have equal rights to ancestral property (Hindu Succession Act 2005)",
      "A will should be registered for better legal standing",
      "Nomination is not the same as inheritance",
      "Keep all property documents in a safe place"
    ],
    resources: [
      { title: "District Court", description: "For succession certificates and property matters" },
      { title: "Sub-Registrar Office", description: "Property registration and searches" },
      { title: "Family Courts", description: "For matrimonial and family disputes" }
    ]
  },
  "banking-finance": {
    title: "Banking & Finance",
    description: "Dealing with financial fraud and banking issues",
    whatIsIt: "Banking issues include unauthorized transactions, loan harassment, credit score disputes, and EMI problems. These are regulated by RBI guidelines and banking ombudsman schemes.",
    whyItMatters: "Quick action in banking fraud cases can help recover your money. Understanding your rights as a borrower protects you from harassment by recovery agents. The banking ombudsman provides a free and effective dispute resolution mechanism.",
    steps: [
      "For unauthorized transactions, inform your bank within 3 days to limit liability",
      "File a written complaint with your bank's grievance cell",
      "If unresolved in 30 days, approach the Banking Ombudsman",
      "For loan harassment, file complaint with RBI and police",
      "Check and dispute incorrect entries in your credit report with CIBIL"
    ],
    tips: [
      "Enable SMS alerts for all transactions",
      "Never share card details, OTP, or PIN with anyone",
      "You have right to prepay loans without excessive penalty",
      "Recovery agents cannot harass, threaten, or visit before 7 AM or after 7 PM"
    ],
    resources: [
      { title: "RBI Ombudsman", description: "File complaints against banks and NBFCs" },
      { title: "CIBIL", description: "Check and dispute your credit score" },
      { title: "SEBI SCORES", description: "For investment-related complaints" }
    ]
  }
};

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  
  const topic = topicId ? topicDetails[topicId] : null;

  if (!topic) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground mb-6">The topic you're looking for doesn't exist.</p>
          <Link to="/topics">
            <Button variant="accent">View All Topics</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-navy-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => navigate("/topics")}
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              {topic.title}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {topic.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* What is it */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold">1</span>
                What is the issue?
              </h2>
              <p className="text-muted-foreground leading-relaxed">{topic.whatIsIt}</p>
            </motion.div>

            {/* Why it matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold">2</span>
                Why it matters
              </h2>
              <p className="text-muted-foreground leading-relaxed">{topic.whyItMatters}</p>
            </motion.div>

            {/* What you should do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">3</span>
                What you should do
              </h2>
              <div className="space-y-4">
                {topic.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-teal-soft flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-teal-soft/50 rounded-2xl p-6 md:p-8 border border-teal/20"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Helpful Tips
              </h2>
              <ul className="space-y-3">
                {topic.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="text-accent">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Helpful Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topic.resources.map((resource) => (
                  <div
                    key={resource.title}
                    className="bg-card rounded-xl p-4 shadow-soft border border-border/50 hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4 text-accent" />
                      <h3 className="font-medium text-foreground text-sm">{resource.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Need more specific guidance for your situation?
          </p>
          <Link to="/get-help">
            <Button variant="accent" size="lg">
              Get Personalized Help
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default TopicDetail;
