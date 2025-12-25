import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, AlertTriangle, Briefcase, ShoppingBag, FileText, Shield, Users, CreditCard } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Topics = () => {
  const { t } = useLanguage();

  const topics = [
    {
      id: "rent-housing",
      icon: Home,
      title: t("topics.rentHousing"),
      description: t("topics.rentHousing.desc"),
      color: "bg-blue-50 text-blue-600",
      issues: ["Security deposit not returned", "Illegal eviction", "Rental agreement disputes", "Maintenance issues"],
    },
    {
      id: "scams-fraud",
      icon: AlertTriangle,
      title: t("topics.scamsFraud"),
      description: t("topics.scamsFraud.desc"),
      color: "bg-red-50 text-red-600",
      issues: ["Online shopping fraud", "Phishing attacks", "Lottery/prize scams", "UPI fraud"],
    },
    {
      id: "employment-issues",
      icon: Briefcase,
      title: t("topics.employment"),
      description: t("topics.employment.desc"),
      color: "bg-amber-50 text-amber-600",
      issues: ["Fake job offers", "Unpaid salary", "Wrongful termination", "Notice period disputes"],
    },
    {
      id: "consumer-rights",
      icon: ShoppingBag,
      title: t("topics.consumer"),
      description: t("topics.consumer.desc"),
      color: "bg-green-50 text-green-600",
      issues: ["Product refund denied", "Warranty claims", "Service not delivered", "Hidden charges"],
    },
    {
      id: "legal-documents",
      icon: FileText,
      title: t("topics.legalDocs"),
      description: t("topics.legalDocs.desc"),
      color: "bg-purple-50 text-purple-600",
      issues: ["Contract review", "Legal notice received", "Agreement terms", "Document verification"],
    },
    {
      id: "police-fir",
      icon: Shield,
      title: t("topics.police"),
      description: t("topics.police.desc"),
      color: "bg-indigo-50 text-indigo-600",
      issues: ["How to file FIR", "Cybercrime complaint", "Police not registering FIR", "What is NCR vs FIR"],
    },
    {
      id: "family-matters",
      icon: Users,
      title: t("topics.family"),
      description: t("topics.family.desc"),
      color: "bg-pink-50 text-pink-600",
      issues: ["Property inheritance", "Joint property disputes", "Succession basics", "Documentation help"],
    },
    {
      id: "banking-finance",
      icon: CreditCard,
      title: t("topics.banking"),
      description: t("topics.banking.desc"),
      color: "bg-teal-50 text-teal-600",
      issues: ["Unauthorized transactions", "Loan harassment", "Credit score issues", "EMI disputes"],
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-navy-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("topics.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("topics.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/topics/${topic.id}`}
                  className="block bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated hover:border-accent/30 transition-all group h-full"
                >
                  <div className={`w-14 h-14 rounded-xl ${topic.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <topic.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                  <div className="space-y-2">
                    {topic.issues.slice(0, 3).map((issue) => (
                      <div
                        key={issue}
                        className="text-xs bg-secondary px-3 py-1.5 rounded-full inline-block mr-2"
                      >
                        {issue}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("topics.explore")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            {t("topics.cta")}
          </p>
          <Link to="/get-help">
            <Button variant="accent" size="lg">
              {t("topics.getHelp")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Topics;
