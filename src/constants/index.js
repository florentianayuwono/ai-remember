import {
  logo2,
  shopee,
  nus,
  ncl,
  incareasia,
  logo,
} from "../assets";

export const navLinks = [
  {
    id: "features",
    title: "Features",
  },
  {
    id: "whyus",
    title: "Why Us?",
  },
  {
    id: "pricing",
    title: "Pricing",
  },
];

const features = [
  {
    title: "Effortless Memory Capture",
    icon: logo2,
    description: "Record life's moments, no precious moment goes undocumented.",
  },
  {
    title: "Empathetic AI Companion",
    icon: logo2,
    description: "Chat, laugh, and cry with AI that understands you.",
  },
  {
    title: "Community Connection",
    icon: logo2,
    description: "Share and connect over your cherished stories.",
  },
  {
    title: "Personalized Keepsakes",
    icon: logo2,
    description: "Craft unique diaries with music, photos, and stickers.",
  },
];

const othersWords = [
  {
    title: "Machine Translation Intern",
    company_name: "Shopee",
    icon: shopee,
    iconBg: "#383E56",
    date: "May 2023 - Present",
    points: ["Develop algorithm to automate classification of training datasets for Shopee homegrown Large Language Models.", "Conduct data extraction, manipulation, and analysis to optimize product titles using PrestoSQL, Pandas, and Seaborn."],
  },
  {
    title: "Teaching Assistant",
    company_name: "National University of Singapore",
    icon: nus,
    iconBg: "#E6DEDD",
    date: "August 2022 - Present",
    points: [
      "Mentor for relevant technology stack and Software Engineering principles as Adviser for CP2106 Orbital Summer Project 2023.",
      "Teach fundamental computing concepts for CS1101S Programming Methodology I, ranging from Data Abstraction & Structures, Modularity, State, Streams (5.0/5.0 teaching feedback rating).",
    ],
  },
  {
    title: "Frontend Engineer Intern",
    company_name: "National Cybersecurity R&D Laboratory",
    icon: ncl,
    iconBg: "#383E56",
    date: "May 2022 - July 2022",
    points: [
      "Teamed up with 4 other members to build a Flutter web application for visualization and gamification of cybersecurity threats and vulnerabilities.",
      "Automated creation of new learning pages using OOP and wrote comprehensive documentation to ease future maintenance for non-technical employees.",
      "Delivered new features and bug fixes using Dart, completing ~10 PRs in 2 months.",
    ],
  },
  {
    title: "Product Management Intern",
    company_name: "InCare Asia",
    icon: incareasia,
    iconBg: "#E6DEDD",
    date: "February 2022 - April 2022",
    points: ["Conducted market research and competitor analysis on biodegradable packaging products.", "Design prototypes for packaging products for various F&B Industry needs."],
  },
];

const testimonials = [
  {
    testimonial: "I can't imagine my life without this app now. It has turned my everyday conversations into beautiful memories in my personal diary.",
    name: "Sara Lee",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial: "For a diary enthusiast like me, this app is a dream come true. It turns my conversations into cherished memories effortlessly.",
    name: "Chris Brown",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial: "This diary app is my new best friend. It's like having a personal diary assistant that listens to my thoughts and helps me record them.",
    name: "Lisa Wang",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const reasons = [
  {
    name: "Seamless Technology",
    description: "Our advanced AI-driven platform simplifies memory capture and retrieval, making it easier than ever to document and relive your life's moments.",
    image: "🤖",
  },
  {
    name: "Emotional Connection",
    description: "Experience an AI companion like no other. Our AI is designed to understand your emotions, providing a unique and empathetic interaction that enhances your memories.",
    image: "🤗",
  },
  {
    name: "Personalization",
    description: "Your diaries are not just records; they're artful creations. Customize them with photos, music, and stickers to make each memory uniquely yours.",
    image: "🎨",
  },
  {
    name: "Community & Connection",
    description: "Join a vibrant community of like-minded individuals who appreciate the power of storytelling. Share your stories and connect with others who understand and empathize.",
    image: "✨",
  },
];

export { features, othersWords, testimonials, reasons };
