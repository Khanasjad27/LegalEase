import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText, Home, Briefcase, AlertTriangle, ShoppingBag, Copy, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const templateContents: Record<string, string> = {
  "Security Deposit Return Request": `To,
[Landlord's Name]
[Landlord's Address]
[City, PIN Code]

Date: [Current Date]

Subject: Request for Return of Security Deposit

Dear Sir/Madam,

I, [Your Full Name], was a tenant at [Property Address] from [Start Date] to [End Date] as per our rental agreement dated [Agreement Date].

As per the terms of our agreement, I had paid a security deposit of ₹[Amount] at the time of taking possession of the property. I vacated the premises on [Vacation Date] and handed over the keys to you on the same date.

The property was left in good condition, and I have fulfilled all my obligations under the rental agreement. I kindly request you to return my security deposit of ₹[Amount] within [15/30] days of this letter.

Please transfer the amount to:
Bank Name: [Your Bank Name]
Account Number: [Your Account Number]
IFSC Code: [IFSC Code]

If there are any deductions, kindly provide an itemized list of the same.

I trust you will process this request at the earliest. In case of non-compliance, I may be compelled to seek legal remedies.

Thanking you,

[Your Full Name]
[Your Address]
[Phone Number]
[Email Address]`,

  "Rental Agreement Termination Notice": `To,
[Landlord's Name]
[Landlord's Address]
[City, PIN Code]

Date: [Current Date]

Subject: Notice of Termination of Tenancy

Dear Sir/Madam,

I, [Your Full Name], currently residing as a tenant at [Property Address], am writing to formally notify you of my intention to terminate the tenancy agreement dated [Agreement Date].

As per the terms of our agreement requiring [30/60] days' notice, I wish to vacate the premises on [Proposed Vacation Date].

I request you to:
1. Arrange for a final inspection of the property on or before [Vacation Date]
2. Process the return of my security deposit of ₹[Amount]
3. Provide any necessary documentation for the termination of utilities

I will ensure the property is handed over in good condition, normal wear and tear excepted.

Please confirm receipt of this notice and acknowledge the vacation date.

Thanking you,

[Your Full Name]
[Phone Number]
[Email Address]`,

  "Maintenance Issue Complaint": `To,
[Landlord's Name]
[Landlord's Address]
[City, PIN Code]

Date: [Current Date]

Subject: Urgent - Maintenance Issue at [Property Address]

Dear Sir/Madam,

I am writing to bring to your immediate attention a maintenance issue at the above-mentioned property where I am a tenant as per our agreement dated [Agreement Date].

Issue Description:
[Describe the issue in detail - e.g., water leakage from ceiling, electrical fault, plumbing issue, etc.]

Date Issue Noticed: [Date]
Severity: [High/Medium] - This issue is affecting [daily living/safety/health]

Previous Communication:
[Mention if you have already informed verbally or through other means]

As per the terms of our rental agreement and applicable tenancy laws, structural and major repairs are the responsibility of the landlord. I request you to arrange for repair/resolution of this issue within [7] days.

If the issue remains unaddressed, I may be compelled to:
1. Get the repair done and deduct the cost from future rent
2. Approach the Rent Control Authority

I hope for your immediate attention to this matter.

Thanking you,

[Your Full Name]
[Phone Number]`,

  "Salary Due Reminder Letter": `To,
[HR Manager/Employer Name]
[Company Name]
[Company Address]

Date: [Current Date]

Subject: Request for Payment of Pending Salary

Dear Sir/Madam,

I, [Your Full Name], Employee ID: [Employee ID], working as [Designation] in [Department], am writing to bring to your notice the non-payment of my salary for [Month(s)/Period].

Details:
- Salary pending for: [Month/Period]
- Amount due: ₹[Amount]
- Last salary received: [Date and Month]

As per my employment agreement and the Payment of Wages Act, 1936, salary must be paid within [7/10] days of the wage period. The delay has caused me significant financial hardship.

I request you to kindly process the pending salary at the earliest and confirm the payment date.

If the salary is not paid within [7/15] days of this letter, I may be compelled to approach the Labour Commissioner's office for redressal.

Looking forward to your immediate action.

Thanking you,

[Your Full Name]
[Employee ID]
[Department]
[Phone Number]
[Email Address]`,

  "Experience Certificate Request": `To,
[HR Manager Name]
[Company Name]
[Company Address]

Date: [Current Date]

Subject: Request for Experience Certificate

Dear Sir/Madam,

I, [Your Full Name], worked as [Designation] in [Department] at [Company Name] from [Start Date] to [End Date]. My Employee ID was [Employee ID].

I completed all exit formalities and served my notice period as per the company policy. I request you to kindly issue my Experience Certificate/Relieving Letter at the earliest.

I need this document for [reason - e.g., new employment, higher studies, etc.].

Please include the following details in the certificate:
1. Duration of employment
2. Designation/Role
3. Brief description of responsibilities (optional)

I would appreciate if this could be processed within [7-10] days.

Thanking you,

[Your Full Name]
[Last Employee ID]
[Phone Number]
[Email Address]`,

  "Resignation Letter Template": `To,
[Reporting Manager/HR Manager Name]
[Company Name]
[Company Address]

Date: [Current Date]

Subject: Resignation from the Position of [Your Designation]

Dear Sir/Madam,

I, [Your Full Name], working as [Designation] in [Department], hereby tender my resignation from my position at [Company Name], effective [Last Working Date].

As per my employment contract, I am serving a notice period of [Notice Period - e.g., 30 days/60 days]. My last working day will be [Last Working Date].

I am grateful for the opportunities for professional and personal growth that [Company Name] has provided me during my tenure of [Duration]. I will ensure a smooth handover of my responsibilities during the notice period.

I request you to:
1. Accept this resignation
2. Process my full and final settlement
3. Issue my Experience Certificate and Relieving Letter

Please let me know the formalities I need to complete before my last working day.

Thanking you,

[Your Full Name]
[Employee ID]
[Department]
[Phone Number]`,

  "Product Refund Request": `To,
[Company Name/Seller Name]
[Customer Service Department]
[Address]

Date: [Current Date]

Subject: Request for Refund - Order Number [Order ID]

Dear Sir/Madam,

I am writing to request a refund for my purchase made on [Purchase Date]. The details are as follows:

Order Details:
- Order Number: [Order ID]
- Product: [Product Name]
- Purchase Date: [Date]
- Amount Paid: ₹[Amount]
- Payment Method: [Payment Method]

Reason for Refund:
[Select and elaborate - Defective product/Product not as described/Damaged during delivery/Wrong product delivered]

I have [attached photos/enclosed the product] as evidence. As per the Consumer Protection Act, 2019, and your company's refund policy, I am entitled to a full refund.

I request you to process the refund of ₹[Amount] to my original payment method within [7-15] days.

If this issue is not resolved satisfactorily, I may be compelled to file a complaint with the Consumer Forum.

Thanking you,

[Your Full Name]
[Order ID]
[Registered Email/Phone]
[Address]`,

  "Service Complaint Letter": `To,
[Service Provider Name]
[Company Name]
[Address]

Date: [Current Date]

Subject: Complaint Regarding Unsatisfactory Service

Dear Sir/Madam,

I am writing to formally complain about the unsatisfactory service I received from your company.

Service Details:
- Service Availed: [Service Name]
- Date of Service: [Date]
- Invoice/Reference Number: [Number]
- Amount Paid: ₹[Amount]

Nature of Complaint:
[Describe the issue - service not delivered/poor quality/incomplete work/delayed service]

Expected Resolution:
[What do you want - refund/redo service/compensation]

I have previously contacted your customer service on [Date] but have not received a satisfactory response.

As per the Consumer Protection Act, 2019, I am entitled to receive the service as promised. I request you to resolve this matter within [15] days.

Failure to do so will compel me to approach the Consumer Forum for redressal.

Thanking you,

[Your Full Name]
[Phone Number]
[Email Address]`,

  "Consumer Forum Complaint Draft": `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL FORUM
[District Name], [State]

Consumer Complaint No. _____ of [Year]

COMPLAINANT:
[Your Full Name]
S/o or D/o [Parent's Name]
R/o [Complete Address]
Phone: [Number]
Email: [Email]

VERSUS

OPPOSITE PARTY:
[Company/Seller Name]
Through its [Manager/Proprietor/Director]
[Complete Address]
[Contact Details if known]

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

The complainant most respectfully submits as under:

1. That the complainant is a consumer as defined under the Consumer Protection Act, 2019.

2. That on [Date], the complainant purchased/availed [Product/Service] from the Opposite Party for a consideration of ₹[Amount].

3. [Brief facts of the case - What was purchased, what was the defect/deficiency, when it was discovered, what action was taken]

4. That despite repeated requests/complaints, the Opposite Party has failed to [refund/replace/repair/provide service].

5. That due to the deficiency in service/defect in goods, the complainant has suffered:
   - Financial loss of ₹[Amount]
   - Mental agony and harassment

PRAYER:
The complainant prays that this Hon'ble Forum may be pleased to:
1. Direct the Opposite Party to [refund/replace/compensate]
2. Award compensation of ₹[Amount] for mental agony
3. Award cost of litigation

VERIFICATION:
I, [Your Name], do hereby verify that the contents of the above complaint are true and correct to the best of my knowledge.

Date: [Date]
Place: [City]

[Your Signature]
COMPLAINANT`,

  "Cybercrime Complaint Format": `CYBERCRIME COMPLAINT

To,
The Cyber Crime Cell/Police Station
[City/District]

Date: [Current Date]

Subject: Complaint Regarding [Type of Cybercrime - Online Fraud/Phishing/Hacking/etc.]

Respected Sir/Madam,

I, [Your Full Name], wish to file a complaint regarding a cybercrime incident. The details are as follows:

COMPLAINANT DETAILS:
Name: [Your Full Name]
Address: [Complete Address]
Phone: [Mobile Number]
Email: [Email Address]
ID Proof: [Aadhaar/PAN Number]

INCIDENT DETAILS:
Date of Incident: [Date]
Time: [Approximate Time]
Platform/Website: [Name of website/app/platform]
Type of Crime: [Fraud/Phishing/Hacking/Harassment/Other]

DESCRIPTION OF INCIDENT:
[Provide detailed description of what happened - how you were contacted, what information was shared, how money was lost, etc.]

FINANCIAL LOSS (if any):
Amount Lost: ₹[Amount]
Transaction Details:
- Date: [Date]
- Transaction ID/Reference: [Number]
- Bank/UPI App Used: [Name]

EVIDENCE ATTACHED:
1. Screenshots of communication
2. Bank/UPI transaction statements
3. Email/message records
4. Any other relevant documents

ACCUSED/SUSPECT DETAILS (if known):
- Phone Number: [Number]
- Email/Username: [Details]
- Bank Account/UPI ID: [If shared]
- Any other identifying information

I request you to kindly investigate this matter and take appropriate action against the accused.

I declare that all the information provided above is true to the best of my knowledge.

Thanking you,

[Your Signature]
[Your Full Name]
[Date]`,

  "Bank Fraud Report Letter": `To,
The Branch Manager
[Bank Name]
[Branch Address]
[City, PIN Code]

Date: [Current Date]

Subject: Complaint Regarding Unauthorized Transaction - Account No. [Account Number]

Dear Sir/Madam,

I am writing to report unauthorized transaction(s) from my account. The details are as follows:

ACCOUNT HOLDER DETAILS:
Name: [Your Full Name]
Account Number: [Account Number]
Account Type: [Savings/Current]
Branch: [Branch Name]
Registered Mobile: [Number]

UNAUTHORIZED TRANSACTION DETAILS:
| Date | Time | Amount | Transaction Type | Reference No. |
|------|------|--------|------------------|---------------|
| [Date] | [Time] | ₹[Amount] | [UPI/NEFT/Card] | [Ref No.] |

Total Unauthorized Amount: ₹[Total Amount]

CIRCUMSTANCES:
[Explain how you discovered the fraud - Did you receive OTP? Did you share any information? Was your card lost/stolen?]

I DID NOT authorize these transactions and DID NOT share my OTP/PIN/CVV with anyone.

ACTIONS ALREADY TAKEN:
1. [Blocked card/Changed password on - Date]
2. [Called customer care on - Date, Complaint No: ___]

As per RBI circular on "Limiting Liability of Customers in Unauthorised Electronic Banking Transactions," I am reporting this within [3 days/24 hours] of the transaction.

I request you to:
1. Block my account/card immediately
2. Investigate the unauthorized transactions
3. Refund the amount as per RBI guidelines
4. Provide me with a written acknowledgment

I have also filed/will file a complaint with the Cyber Crime Cell.

Thanking you,

[Your Signature]
[Your Full Name]
[Account Number]
[Registered Mobile Number]
[Email Address]

Enclosures:
1. Copy of bank statement highlighting unauthorized transactions
2. Copy of ID proof
3. Any other relevant documents`
};

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const templates = [
    {
      category: t("templates.rentHousing"),
      icon: Home,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      items: [
        {
          title: "Security Deposit Return Request",
          description: "Formal letter to landlord requesting return of security deposit",
          difficulty: t("templates.easy"),
        },
        {
          title: "Rental Agreement Termination Notice",
          description: "Notice to landlord about ending your tenancy",
          difficulty: t("templates.easy"),
        },
        {
          title: "Maintenance Issue Complaint",
          description: "Letter to landlord about urgent repairs needed",
          difficulty: t("templates.easy"),
        },
      ],
    },
    {
      category: t("templates.employment"),
      icon: Briefcase,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      items: [
        {
          title: "Salary Due Reminder Letter",
          description: "Professional letter requesting pending salary",
          difficulty: t("templates.easy"),
        },
        {
          title: "Experience Certificate Request",
          description: "Formal request for employment verification",
          difficulty: t("templates.easy"),
        },
        {
          title: "Resignation Letter Template",
          description: "Professional resignation with proper notice",
          difficulty: t("templates.easy"),
        },
      ],
    },
    {
      category: t("templates.consumerComplaints"),
      icon: ShoppingBag,
      color: "bg-green-50 text-green-600 border-green-100",
      items: [
        {
          title: "Product Refund Request",
          description: "Formal complaint for defective product or refund",
          difficulty: t("templates.medium"),
        },
        {
          title: "Service Complaint Letter",
          description: "Template for unsatisfactory service complaints",
          difficulty: t("templates.easy"),
        },
        {
          title: "Consumer Forum Complaint Draft",
          description: "Basic structure for filing consumer complaints",
          difficulty: t("templates.medium"),
        },
      ],
    },
    {
      category: t("templates.scamReporting"),
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600 border-red-100",
      items: [
        {
          title: "Cybercrime Complaint Format",
          description: "Template for reporting online fraud to cyber cell",
          difficulty: t("templates.medium"),
        },
        {
          title: "Bank Fraud Report Letter",
          description: "Letter to bank reporting unauthorized transactions",
          difficulty: t("templates.medium"),
        },
      ],
    },
  ];

  const handleCopy = () => {
    if (selectedTemplate && templateContents[selectedTemplate]) {
      navigator.clipboard.writeText(templateContents[selectedTemplate]);
      setCopied(true);
      toast({
        title: t("templates.templateCopied"),
        description: t("templates.templateCopiedDesc"),
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (selectedTemplate && templateContents[selectedTemplate]) {
      const blob = new Blob([templateContents[selectedTemplate]], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedTemplate.replace(/\s+/g, "_")}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: t("templates.templateDownloaded"),
        description: t("templates.templateDownloadedDesc"),
      });
    }
  };

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
              {t("templates.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("templates.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {templates.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((template) => (
                    <div
                      key={template.title}
                      className="bg-card rounded-xl p-5 shadow-soft border border-border/50 hover:shadow-card hover:border-accent/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.difficulty === t("templates.easy") 
                            ? "bg-green-50 text-green-600" 
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          {template.difficulty}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{template.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <Button 
                        variant="soft" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedTemplate(template.title)}
                      >
                        <Download className="w-4 h-4" />
                        {t("templates.useTemplate")}
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedTemplate}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="bg-secondary/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>{t("templates.howToUse")}</strong> {t("templates.howToUseDesc")}
              </p>
            </div>
            <pre className="bg-card border border-border rounded-lg p-4 text-sm whitespace-pre-wrap font-mono text-foreground overflow-x-auto">
              {selectedTemplate ? templateContents[selectedTemplate] : ""}
            </pre>
          </div>
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t("templates.copied") : t("templates.copy")}
            </Button>
            <Button variant="accent" className="flex-1" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              {t("templates.download")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Note */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
            {t("templates.note")}
          </p>
          <Link to="/get-help">
            <Button variant="outline" size="default">
              {t("templates.needHelp")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Templates;
