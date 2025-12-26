import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Shield, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalBridge = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center shadow-card">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{t("legalBridge.title")}</h1>
            </div>

            <p className="text-muted-foreground mb-6">{t("legalBridge.subtitle")}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://legal-bridge-neurox-red.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="accent" size="lg">
                  {t("legalBridge.button")}
                </Button>
              </a>
              <Link to="/get-help" className="text-sm text-muted-foreground underline">
                {t("legalBridge.learnMore")}
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-3 py-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="font-medium">{t("legalBridge.trustedBadge")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalBridge;
