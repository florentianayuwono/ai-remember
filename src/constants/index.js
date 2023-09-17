import {
  mobile,
  backend,
  creator,
  web,
  logo2,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  shopee,
  nus,
  ncl,
  incareasia,
  carrent,
  jobit,
  soconnect,
  groundzero,
  classroom360,
  digitalit,
  tripguide,
  threejs,
  java,
  flutter,
  c,
  python,
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
  }
];

const features = [
  {
    title: "Effortless Memory Capture",
    icon: logo2,
    description: "Record life's moments, no precious moment goes undocumented."
  },
  {
    title: "Empathetic AI Companion",
    icon: logo2,
    description: "Chat, laugh, and cry with AI that understands you."
  },
  {
    title: "Community Connection",
    icon: logo2,
    description:"Share and connect over your cherished stories."
  },
  {
    title: "Personalized Keepsakes",
    icon: logo2,
    description: "Craft unique diaries with music, photos, and stickers."
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "C",
    icon: c,
  },
  {
    name: "flutter",
    icon: flutter,
  },
  // {
  //   name: "Redux Toolkit",
  //   icon: redux,
  // },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  // {
  //   name: "MongoDB",
  //   icon: mongodb,
  // },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  // {
  //   name: "docker",
  //   icon: docker,
  // },
];

const othersWords = [
  {
    title: "Machine Translation Intern",
    company_name: "Shopee",
    icon: shopee,
    iconBg: "#383E56",
    date: "May 2023 - Present",
    points: [
      "Develop algorithm to automate classification of training datasets for Shopee homegrown Large Language Models.",
      "Conduct data extraction, manipulation, and analysis to optimize product titles using PrestoSQL, Pandas, and Seaborn.",
    ],
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
    points: [
      "Conducted market research and competitor analysis on biodegradable packaging products.",
      "Design prototypes for packaging products for various F&B Industry needs.",
    ],
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
    description: 
    "Experience an AI companion like no other. Our AI is designed to understand your emotions, providing a unique and empathetic interaction that enhances your memories.",
    image: "🤗",
  },
  {
    name: "Personalization",
    description:
      "Your diaries are not just records; they're artful creations. Customize them with photos, music, and stickers to make each memory uniquely yours.",
    image: "🎨",
  },
  {
    name: "Community & Connection",
    description:
      "Join a vibrant community of like-minded individuals who appreciate the power of storytelling. Share your stories and connect with others who understand and empathize.",
    image: "✨",
  },
];

export { features, technologies, othersWords, reasons };
