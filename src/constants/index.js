import { crush, logo2 } from "../assets";

var APP_URL;

if (process.env.NODE_ENV === "development") {
  APP_URL = "http://localhost:3000/";
} else {
  APP_URL = "https://ai-remember.vercel.app/";
}
export const LANDING_PAGE = APP_URL;
export const LOGIN_PAGE = APP_URL + "login";
export const CONVERSATION_PAGE = APP_URL + "conversation";
export const DIARY_PAGE = APP_URL + "diary";
export const COMMUNITIES_PAGE = APP_URL + "communities";

export const CHAT_PLACEHOLDER = "Write to paw paw";

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

export const homeNavLinks = [
  {
    id: "conversation",
    title: "Chat",
  },
  {
    id: "diary",
    title: "Diary",
  },
  {
    id: "communities",
    title: "Community",
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

export const PROMO_CODE = "REMEMBERME?"

export { features, testimonials, reasons };
