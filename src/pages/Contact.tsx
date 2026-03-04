import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, Send, ChevronDown,
  Linkedin, Twitter, Facebook, Instagram, MessageSquare,
  Headphones, Handshake, HelpCircle, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

/* ─── Data ─── */
const contactInfo = [
  { icon: Mail, label: "Email", value: "info@zaptechnologies.com", href: "mailto:info@zaptechnologies.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Address", value: "123 Innovation Drive, San Francisco, CA 94105", href: null },
  { icon: Clock, label: "Hours", value: "Mon – Fri: 9 AM – 6 PM PST", href: null },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const faqs = [
  {
    q: "How do I start a project with Zap Technologies?",
    a: "Simply fill out the contact form above or send us an email. We'll get back to you within 24 hours to discuss your project requirements, timeline, and budget.",
  },
  {
    q: "What are your pricing models?",
    a: "We offer flexible pricing: hourly rates for ongoing work, fixed-price contracts for well-defined projects, and dedicated full-time developer hiring. Let us know what fits your needs!",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes! We provide post-launch support and maintenance packages for all our projects, including bug fixes, feature updates, performance monitoring, and security patches.",
  },
  {
    q: "What technologies do you work with?",
    a: "Our team is proficient in React, Node.js, Python, Swift, Flutter, AWS, Azure, and many more. We choose the best technology stack based on your project requirements.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary based on scope and complexity. A simple website may take 2–4 weeks, while a full-scale application could take 3–6 months. We'll provide a detailed estimate after discussing your needs.",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Service Request",
  "Support Request",
  "Partnership Inquiry",
  "Other",
];

/* ─── Fade-in variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in name, email, and message.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setFormData({ name: "", email: "", phone: "", inquiryType: "", budget: "", timeline: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-nav pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_90%_25%)_0%,_hsl(220_40%_10%)_60%,_hsl(220_30%_6%)_100%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,_hsl(217_90%_60%)_0%,_transparent_50%)]" />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-primary-foreground">Get in Touch </span>
            <span className="text-accent">with Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 text-base sm:text-lg text-primary-foreground/70 max-w-2xl mx-auto"
          >
            Have a project in mind? Want to discuss how we can help your business grow with technology? Reach out to us today, and let's start the conversation!
          </motion.p>
        </div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="py-16 sm:py-24">
        <div className="container px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12"
          >
            We'd Love to <span className="text-primary">Hear From You</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your full name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required maxLength={255} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={20} />
                </div>
                <div className="space-y-2">
                  <Label>Inquiry Type</Label>
                  <Select value={formData.inquiryType} onValueChange={(v) => handleChange("inquiryType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Budget Range (optional)</Label>
                  <Select value={formData.budget} onValueChange={(v) => handleChange("budget", v)}>
                    <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< $5k">Less than $5,000</SelectItem>
                      <SelectItem value="$5k-$15k">$5,000 – $15,000</SelectItem>
                      <SelectItem value="$15k-$50k">$15,000 – $50,000</SelectItem>
                      <SelectItem value="$50k+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timeline (optional)</Label>
                  <Select value={formData.timeline} onValueChange={(v) => handleChange("timeline", v)}>
                    <SelectTrigger><SelectValue placeholder="When to start?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASAP">As soon as possible</SelectItem>
                      <SelectItem value="1-2 months">1 – 2 months</SelectItem>
                      <SelectItem value="3-6 months">3 – 6 months</SelectItem>
                      <SelectItem value="Not sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={5} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} required maxLength={2000} />
              </div>

              <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto rounded-full px-10 text-base gap-2">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </motion.form>

            {/* Sidebar: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">Other Ways to Reach Us</h3>
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="py-16 sm:py-20 bg-muted/40">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10"
          >
            Find Us <span className="text-primary">Here</span>
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="rounded-2xl overflow-hidden border border-border shadow-sm"
          >
            <iframe
              title="Zap Technologies Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e2ba7e63%3A0xf523d5042711a0f6!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 max-w-3xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Have Questions? <span className="text-primary">Check Our FAQ</span>
          </motion.h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Find quick answers to the most common questions about working with us.
          </p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-sm transition-shadow"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline gap-3">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_90%_25%)_0%,_hsl(220_40%_10%)_60%,_hsl(220_30%_6%)_100%)]" />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Rocket className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Let's turn your ideas into reality. Get in touch with us, and let's build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="cta"
                size="lg"
                className="rounded-full px-10 text-base"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Send Us a Message
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 text-base bg-primary-foreground text-foreground border-none hover:bg-primary-foreground/90 font-semibold"
                asChild
              >
                <a href="/hire">Request a Quote</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
