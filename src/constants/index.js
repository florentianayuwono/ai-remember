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
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
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
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
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
        "Teach fundamental computing concepts for CS1101S Programming Methodology I, ranging from Data Abstraction & Structures, Modularity, State, Streams (5.0/5.0 teaching feedback rating)."
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
        "Design prototypes for packaging products for various F&B Industry needs."
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
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };