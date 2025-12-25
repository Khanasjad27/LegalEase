import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, MessageCircle, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-navy-light to-accent py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("index.hero.badge")}</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {t("index.hero.title1")}{" "}
            <span className="text-teal-light">{t("index.hero.title2")}</span>
            <br />
            {t("index.hero.title3")}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("index.hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-help">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto group">
                {t("index.hero.cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="ghost" size="xl" className="w-full sm:w-auto text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                {t("index.hero.learnMore")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 40% 98%)" />
        </svg>
      </div>
    </section>
  );
};

const ReassuranceSection = () => {
  const { t } = useLanguage();
  
  const items = [
    {
      icon: Shield,
      title: t("index.reassurance.notAlone.title"),
      description: t("index.reassurance.notAlone.description"),
    },
    {
      icon: MessageCircle,
      title: t("index.reassurance.noJudgment.title"),
      description: t("index.reassurance.noJudgment.description"),
    },
    {
      icon: FileText,
      title: t("index.reassurance.clearSteps.title"),
      description: t("index.reassurance.clearSteps.description"),
    },
  ];
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("index.reassurance.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("index.reassurance.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-soft flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksPreview = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      step: "1",
      title: t("index.howItWorks.step1.title"),
      description: t("index.howItWorks.step1.description"),
    },
    {
      step: "2",
      title: t("index.howItWorks.step2.title"),
      description: t("index.howItWorks.step2.description"),
    },
    {
      step: "3",
      title: t("index.howItWorks.step3.title"),
      description: t("index.howItWorks.step3.description"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("index.howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("index.howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              {t("index.howItWorks.learnMore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const CommonIssuesSection = () => {
  const { t } = useLanguage();
  
  const issues = [
    { title: t("index.issues.rent"), emoji: "🏠" },
    { title: t("index.issues.scams"), emoji: "🚨" },
    { title: t("index.issues.jobs"), emoji: "💼" },
    { title: t("index.issues.consumer"), emoji: "🛍️" },
    { title: t("index.issues.fir"), emoji: "📋" },
    { title: t("index.issues.contracts"), emoji: "📝" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("index.issues.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("index.issues.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {issues.map((issue, index) => (
            <motion.div
              key={issue.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to="/topics"
                className="block bg-card rounded-xl p-5 text-center shadow-soft hover:shadow-card border border-border/50 hover:border-accent/30 transition-all group"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                  {issue.emoji}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {issue.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/topics">
            <Button variant="soft" size="lg">
              {t("index.issues.explore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-navy-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("index.cta.title")}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            {t("index.cta.subtitle")}
          </p>
          <Link to="/get-help">
            <Button variant="heroOutline" size="xl" className="group">
              {t("index.cta.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ReassuranceSection />
      <HowItWorksPreview />
      <CommonIssuesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
