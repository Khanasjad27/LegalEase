import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Target, Users, Lightbulb, Code, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Empathy First",
      description: "We understand that facing a legal issue can be scary. Our first priority is making you feel heard and supported.",
    },
    {
      icon: Lightbulb,
      title: "Clarity Over Complexity",
      description: "Legal systems are complex, but understanding them shouldn't be. We translate confusion into clear next steps.",
    },
    {
      icon: Users,
      title: "Youth-Centered",
      description: "Built specifically for Indians aged 18-30 who are navigating legal challenges for the first time.",
    },
    {
      icon: Target,
      title: "Action-Oriented",
      description: "We don't just explain—we guide you to specific, practical actions you can take right now.",
    },
  ];

  const team = [
    { name: "Team NeuroX", role: "Creators", avatar: "🧠" },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-navy-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>24-Hour Hackathon Project</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              About LegalEase
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              We started with a simple question: Why is understanding your legal rights so complicated? 
              LegalEase is our answer — a platform that turns legal confusion into clarity, 
              designed specifically for India's youth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                To empower young Indians to understand their legal situations and take confident next steps — 
                without fear, confusion, or jargon.
              </p>
            </motion.div>

            {/* What We Are / Aren't */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-teal-soft/50 rounded-2xl p-8 border border-teal/20"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">✓</span> What LegalEase IS
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li>• A guidance platform for understanding legal issues</li>
                  <li>• A step-by-step helper for taking the right next actions</li>
                  <li>• A resource for common templates and information</li>
                  <li>• A safe space to learn about your rights</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/50 rounded-2xl p-8 border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">✗</span> What LegalEase is NOT
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Not a replacement for professional legal advice</li>
                  <li>• Not a law firm or legal service provider</li>
                  <li>• Not a guarantee of legal outcomes</li>
                  <li>• Not a substitute for consulting a lawyer when needed</li>
                </ul>
              </motion.div>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-card border border-border/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-soft flex items-center justify-center shrink-0">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Code className="w-4 h-4" />
              <span>Built with ❤️ in 24 hours</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Created by Team NeuroX
            </h2>
            <p className="text-muted-foreground mb-8">
              A team of passionate developers and designers who believe that access to legal 
              understanding is a fundamental right, not a privilege.
            </p>

            <div className="inline-flex items-center justify-center gap-4 bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
                🧠
              </div>
              <div className="text-left">
                <h3 className="font-bold text-foreground text-lg">Team NeuroX</h3>
                <p className="text-sm text-muted-foreground">Hackathon Project • Designed for India's Youth</p>
              </div>
            </div>
          </motion.div>
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
              Ready to understand your situation?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Take the first step towards clarity. It's what we built LegalEase for.
            </p>
            <Link to="/get-help">
              <Button variant="heroOutline" size="xl" className="group">
                Get Legal Help
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
