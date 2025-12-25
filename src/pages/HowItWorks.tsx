import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Lightbulb, CheckCircle, MessageCircle, FileText, Shield, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t("hiw.step1.title"),
      description: t("hiw.step1.desc"),
      details: [
        t("hiw.step1.detail1"),
        t("hiw.step1.detail2"),
        t("hiw.step1.detail3"),
      ],
    },
    {
      icon: Lightbulb,
      title: t("hiw.step2.title"),
      description: t("hiw.step2.desc"),
      details: [
        t("hiw.step2.detail1"),
        t("hiw.step2.detail2"),
        t("hiw.step2.detail3"),
      ],
    },
    {
      icon: CheckCircle,
      title: t("hiw.step3.title"),
      description: t("hiw.step3.desc"),
      details: [
        t("hiw.step3.detail1"),
        t("hiw.step3.detail2"),
        t("hiw.step3.detail3"),
      ],
    },
  ];

  const principles = [
    {
      icon: MessageCircle,
      title: t("hiw.principle1.title"),
      description: t("hiw.principle1.desc"),
    },
    {
      icon: Shield,
      title: t("hiw.principle2.title"),
      description: t("hiw.principle2.desc"),
    },
    {
      icon: Users,
      title: t("hiw.principle3.title"),
      description: t("hiw.principle3.desc"),
    },
    {
      icon: FileText,
      title: t("hiw.principle4.title"),
      description: t("hiw.principle4.desc"),
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
              {t("hiw.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("hiw.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-6 md:gap-10">
                  {/* Step Number & Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center shadow-card">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-16">
                    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-soft flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3 text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("hiw.approach.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("hiw.approach.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-soft flex items-center justify-center shrink-0">
                    <principle.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-navy-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t("hiw.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {t("hiw.cta.subtitle")}
            </p>
            <Link to="/get-help">
              <Button variant="heroOutline" size="xl" className="group">
                {t("hiw.cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
