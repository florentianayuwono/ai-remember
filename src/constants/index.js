import {
  mobile,
  backend,
  creator,
  web,
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

const services = [
  {
    title: "Software Engineer",
    icon: web,
  },
  {
    title: "AI/ML Engineer",
    icon: mobile,
  },
  {
    title: "Product Manager",
    icon: backend,
  },
  {
    title: "Tutor",
    icon: creator,
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

const experiences = [
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

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "DigitalIT",
    description:
      "Web application focusing on making decisions and generating recommendations on growth strategy based on the user's business profile and condition.",
    tags: [
      {
        name: "react",
        color: "text-blue-600",
      },
      {
        name: "express",
        color: "text-yellow-300",
      },
      {
        name: "postgresql",
        color: "text-green-600",
      },
    ],
    image: digitalit,
    source_code_link: "https://github.com/florentianayuwono/DigitalIT",
  },
  {
    name: "SoConnect",
    description:
      "Desktop app built to help NUS SoC students stay better connected to their school life, in terms of social connections and academic tasks.",
    tags: [
      {
        name: "java",
        color: "text-amber-200",
      },
      {
        name: "javafx",
        color: "text-fuchsia-600",
      },
      {
        name: "gradle",
        color: "text-sky-500",
      },
    ],
    image: soconnect,
    source_code_link: "https://github.com/florentianayuwono/tp",
  },
  {
    name: "Ground Zero",
    description:
      "Web application built to promote and provide information for NES Ground Zero 2023, the largest student-run startathon in Singapore.",
    tags: [
      {
        name: "react",
        color: "text-blue-600",
      },
      {
        name: "tailwindcss",
        color: "text-teal-500",
      },
    ],
    image: groundzero,
    source_code_link: "https://github.com/florentianayuwono/groundzero-website",
  },
  {
    name: "Classroom360",
    description:
      "VR platform aims to provide an immersive virtual environment where students and teachers can interact and collaborate remotely.",
    tags: [
      {
        name: "react360",
        color: "text-rose-700",
      },
    ],
    image: classroom360,
    source_code_link: "https://github.com/florentianayuwono/pink-unicorn",
  },
];

export { services, technologies, experiences, testimonials, projects };
