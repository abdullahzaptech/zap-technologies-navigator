import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";

export interface ProjectData {
  image: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: { languages: string[]; tools: string[] };
  projectLink?: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const projects: ProjectData[] = [
  {
    image: portfolio1,
    title: "XYZ Retail E-commerce Store",
    category: "Web Development",
    description: "A fully integrated online store, boosting sales by 30% with enhanced user experience and efficient payment gateways.",
    fullDescription: "XYZ Retail required an e-commerce platform that could integrate multiple payment methods and offer a seamless shopping experience. We designed and developed a fully responsive platform that optimized product displays, increased sales, and improved customer satisfaction.",
    technologies: {
      languages: ["HTML", "CSS", "JavaScript", "React"],
      tools: ["Node.js", "Express.js", "MySQL", "AWS"],
    },
    projectLink: "#",
    challenge: "The website faced slow performance due to poor infrastructure during high traffic.",
    solution: "We migrated the platform to AWS and implemented cloud load balancing to ensure smooth performance during peak traffic periods.",
    results: ["Increased sales by 30% in the first quarter", "Improved user experience leading to a 50% decrease in bounce rates"],
  },
  {
    image: portfolio2,
    title: "SecurePay FinTech App",
    category: "Mobile App Development",
    description: "A secure mobile banking app with biometric authentication, real-time transactions, and smart budgeting tools.",
    fullDescription: "SecurePay needed a modern mobile banking solution that prioritized security without sacrificing user experience. We built a cross-platform app with biometric login, real-time transaction tracking, and AI-powered budgeting insights.",
    technologies: {
      languages: ["TypeScript", "React Native", "Python"],
      tools: ["Firebase", "Stripe API", "PostgreSQL", "Docker"],
    },
    projectLink: "#",
    challenge: "Ensuring bank-grade security while maintaining a smooth, intuitive mobile experience.",
    solution: "We implemented end-to-end encryption, biometric authentication, and tokenized payment processing with regular security audits.",
    results: ["4.8-star rating on App Store within 2 months", "200K+ downloads in the first quarter"],
  },
  {
    image: portfolio3,
    title: "MediTrack Healthcare Dashboard",
    category: "UI/UX Design",
    description: "A comprehensive patient management platform with appointment scheduling, data visualization, and compliance tracking.",
    fullDescription: "MediTrack needed a unified dashboard for healthcare providers to manage patients, appointments, and compliance requirements. We designed an intuitive interface with real-time data visualizations and HIPAA-compliant architecture.",
    technologies: {
      languages: ["React", "TypeScript", "D3.js"],
      tools: ["AWS", "MongoDB", "Figma", "Storybook"],
    },
    challenge: "Complex data visualization requirements while maintaining HIPAA compliance and usability for non-technical staff.",
    solution: "We created a component-based design system with role-based access controls and simplified data visualization modules.",
    results: ["Reduced patient check-in time by 60%", "100% HIPAA compliance achieved"],
  },
  {
    image: portfolio4,
    title: "InsightAI Analytics Platform",
    category: "AI Based SaaS",
    description: "Machine learning–powered analytics dashboard providing predictive insights and automated reporting for enterprises.",
    fullDescription: "InsightAI required a scalable SaaS platform that could process millions of data points and deliver actionable insights. We built a multi-tenant platform with custom ML models, automated report generation, and real-time dashboards.",
    technologies: {
      languages: ["Python", "React", "TensorFlow"],
      tools: ["AWS SageMaker", "Kubernetes", "Redis", "PostgreSQL"],
    },
    projectLink: "#",
    challenge: "Processing large datasets in real-time while keeping costs manageable for a SaaS pricing model.",
    solution: "We implemented data streaming with Apache Kafka and optimized ML inference pipelines for cost-effective real-time processing.",
    results: ["Processes 10M+ data points daily", "Reduced client reporting time by 80%"],
  },
  {
    image: portfolio5,
    title: "QuickBite Food Delivery App",
    category: "Mobile App Development",
    description: "A full-stack food delivery solution with real-time order tracking, restaurant management, and payment processing.",
    fullDescription: "QuickBite wanted to compete with major food delivery platforms by offering a superior user experience. We built a complete ecosystem including customer app, restaurant dashboard, and delivery driver app with real-time GPS tracking.",
    technologies: {
      languages: ["React Native", "Node.js", "TypeScript"],
      tools: ["Google Maps API", "Stripe", "Firebase", "MongoDB"],
    },
    projectLink: "#",
    challenge: "Building real-time order tracking and coordinating between customers, restaurants, and delivery drivers simultaneously.",
    solution: "We implemented WebSocket-based real-time updates with GPS integration and an intelligent order dispatch system.",
    results: ["50K+ orders in the first month", "Average delivery time reduced to 25 minutes"],
  },
];
