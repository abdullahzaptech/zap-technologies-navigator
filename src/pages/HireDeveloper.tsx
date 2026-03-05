import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Code2, Smartphone, Layout, Server, Palette, Users, Target, Trophy,
  Clock, Zap, ChevronRight, Star, Quote, CheckCircle2, Send,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

/* ─── Data ─── */
const usps = [
  { icon: Code2, title: "Expertise in Multiple Technologies", desc: "Our developers are proficient in React, Node.js, Python, Swift, Flutter, and more." },
  { icon: Target, title: "Tailored Solutions", desc: "We deliver custom solutions that meet the specific needs of your business, ensuring scalable and efficient products." },
  { icon: Trophy, title: "Proven Track Record", desc: "With over 8 years of experience, we have successfully delivered projects across e-commerce, healthcare, and finance." },
  { icon: Users, title: "Flexible Hiring Models", desc: "Choose the model that works for you: full-time, part-time, or project-based engagement." },
  { icon: Clock, title: "On-Time Delivery", desc: "We pride ourselves on meeting deadlines and delivering projects within the agreed timeframe." },
];

const roles = [
  { icon: Code2, title: "Full-Stack Developers", desc: "Handle both front-end and back-end development, providing complete end-to-end solutions for your project." },
  { icon: Layout, title: "Front-End Developers", desc: "Build responsive, user-friendly interfaces using React, Next.js, Vue.js, and modern CSS frameworks." },
  { icon: Server, title: "Back-End Developers", desc: "Ensure your application runs smoothly with secure, scalable server-side logic using Node.js, Python, and more." },
  { icon: Smartphone, title: "Mobile App Developers", desc: "Create native and hybrid apps for Android & iOS using React Native, Flutter, and Swift." },
  { icon: Palette, title: "UI/UX Designers", desc: "Create visually appealing and intuitive designs that improve user experiences and drive engagement." },
];

const steps = [
  { num: "01", title: "Tell Us About Your Project", desc: "Submit your project requirements through our simple form — we'll review and understand your needs." },
  { num: "02", title: "Match with the Right Developer", desc: "Our team matches you with the most suitable developer(s) based on your project's tech stack and goals." },
  { num: "03", title: "Get Started", desc: "After agreement on terms, we begin development with constant communication and feedback loops." },
];

const pricingModels = [
  { title: "Hourly Rate", desc: "Hire our developers on an hourly basis for smaller projects or ongoing support.", cta: "Get Hourly Quote", highlight: false },
  { title: "Full-Time Developer", desc: "Hire a dedicated full-time developer committed to your project for maximum productivity.", cta: "Hire Full-Time", highlight: true },
  { title: "Project-Based", desc: "Need a one-time project? Our developers can be hired on a fixed-price contract.", cta: "Get Project Quote", highlight: false },
];

const testimonials = [
  { quote: "Zap Technologies delivered our project on time and within budget. Their development team was responsive, professional, and incredibly skilled.", name: "Rajesh Kumar", role: "CTO, FinTech Solutions", initials: "RK" },
  { quote: "We hired a full-stack developer from Zap and the quality of work exceeded our expectations. They integrated seamlessly with our existing team.", name: "Amanda Chen", role: "VP Engineering, CloudNine", initials: "AC" },
  { quote: "The mobile app developer we hired built an exceptional product. Our app store rating jumped from 3.1 to 4.7 stars within weeks of launch.", name: "David Okafor", role: "Founder, HealthTrack", initials: "DO" },
];

/* ─── Component ─── */
const HireDeveloper = () => {
  const { toast } = useToast();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", description: "", budget: "", role: "", timeline: "" });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Save to database
      const subject = `Hire Developer — ${formData.role || "General"} | Budget: ${formData.budget || "Not specified"}`;
      const message = `Project Description:\n${formData.description}\n\nPreferred Role: ${formData.role || "Not specified"}\nBudget: ${formData.budget || "Not specified"}\nTimeline: ${formData.timeline || "Not specified"}\nPhone: ${formData.phone || "Not provided"}`;

      const { error: dbError } = await supabase.from("form_queries").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject,
        message,
      });
      if (dbError) throw dbError;

      // Send email notification
      await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiryType: "Hire a Developer",
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          message: formData.description,
        },
      });

      toast({ title: "Project details submitted!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", description: "", budget: "", role: "", timeline: "" });
    } catch (err: any) {
      console.error("Submit error:", err);
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(230,70%,30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(217,90%,60%,0.3),transparent_60%)]" />
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-24 right-[8%] h-20 w-20 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm" />
        <motion.div animate={{ y: [0, 16, 0], x: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-16 left-[5%] h-16 w-16 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm rotate-12" />

        <div className="container px-4 relative z-10 text-center max-w-3xl mx-auto">
          <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Hire a Developer</motion.p>
          <motion.h1 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Get Expert Developers for Your Project
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="mt-6 text-base sm:text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            At Zap Technologies, our developers are ready to bring your project to life. Whether you need web development, mobile app solutions, or custom software, our team of experts is here to help you achieve your goals.
          </motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="rounded-full px-8" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
              Hire Now <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              View Our Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Why Hire Us ── */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Why Choose Us</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Why Choose Zap Technologies?</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {usps.map((u, i) => (
              <motion.div key={u.title} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <u.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{u.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Expertise ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Our Expertise</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Our Developer Expertise</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roles.map((r, i) => (
              <motion.div key={r.title} {...fadeUp} transition={{ delay: i * 0.08 }} className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/20 transition-all text-center">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <r.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{r.desc}</p>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
                  Hire Now <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">How It Works</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">How to Hire a Developer</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp} transition={{ delay: i * 0.12 }} className="relative text-center">
                <div className="text-5xl font-black text-primary/10 mb-4">{s.num}</div>
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  {i === 0 && <Send className="h-6 w-6" />}
                  {i === 1 && <Users className="h-6 w-6" />}
                  {i === 2 && <Zap className="h-6 w-6" />}
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8">
                    <ChevronRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="text-center mt-12">
            <Button variant="cta" size="lg" className="rounded-full px-8" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Pricing</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Flexible Pricing & Engagement Models</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingModels.map((p, i) => (
              <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.1 }} className={`rounded-2xl border p-8 text-center transition-all ${p.highlight ? "border-primary bg-primary text-primary-foreground shadow-lg scale-[1.02]" : "border-border bg-card shadow-sm hover:shadow-md"}`}>
                <h3 className={`font-bold text-xl mb-3 ${p.highlight ? "text-primary-foreground" : "text-foreground"}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</p>
                <Button variant={p.highlight ? "cta" : "outline"} className="rounded-full px-6" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
                  {p.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Testimonials</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">What Our Clients Say</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm">
              <Quote className="mx-auto mb-6 h-10 w-10 text-primary/20" />
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
              </div>
              <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 italic mb-8">"{testimonials[currentTestimonial].quote}"</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">{testimonials[currentTestimonial].initials}</div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <button onClick={() => setCurrentTestimonial((c) => (c - 1 + testimonials.length) % testimonials.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => setCurrentTestimonial((c) => (c + 1) % testimonials.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors" aria-label="Next testimonial">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/30"}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(230,70%,30%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="container px-4 relative z-10 text-center max-w-3xl mx-auto">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to Hire a Developer?</motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-primary-foreground/70 text-base sm:text-lg mb-8 leading-relaxed">
            Whether you're building a website, a mobile app, or a custom software solution, our developers are here to help bring your vision to life.
          </motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="rounded-full px-8" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}>
              Get a Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact-form" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Get In Touch</motion.p>
            <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Tell Us About Your Project</motion.h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-accent" />
          </div>
          <motion.form {...fadeUp} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                <Input id="name" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input id="email" type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description <span className="text-destructive">*</span></Label>
              <Textarea id="description" placeholder="Describe your project requirements..." rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Budget Range <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                  <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<5k">Under $5,000</SelectItem>
                    <SelectItem value="5k-15k">$5,000 – $15,000</SelectItem>
                    <SelectItem value="15k-50k">$15,000 – $50,000</SelectItem>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Role <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullstack">Full-Stack Developer</SelectItem>
                    <SelectItem value="frontend">Front-End Developer</SelectItem>
                    <SelectItem value="backend">Back-End Developer</SelectItem>
                    <SelectItem value="mobile">Mobile App Developer</SelectItem>
                    <SelectItem value="uiux">UI/UX Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Timeline <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })}>
                <SelectTrigger><SelectValue placeholder="When do you need this?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As soon as possible</SelectItem>
                  <SelectItem value="1month">Within 1 month</SelectItem>
                  <SelectItem value="3months">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="cta" size="lg" className="w-full rounded-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Project Details"} <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HireDeveloper;
