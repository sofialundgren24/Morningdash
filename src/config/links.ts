export type MorningLink = {
  id: string;
  label: string;
  url: string;
  description?: string;
  color: string;
  custom?: boolean;
  category?: string;
};

export const morningLinks: MorningLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com",
    description: "Social media",
    color: "from-pink-500 to-rose-400",
    category: "Social media",
  },
  {
    id: "aftonbladet",
    label: "Aftonbladet",
    url: "https://www.aftonbladet.se",
    description: "News",
    color: "from-red-500 to-orange-400",
    category: "News",
  },
  {
    id: "smhi",
    label: "SMHI",
    url: "https://www.smhi.se",
    description: "Weather",
    color: "from-sky-500 to-cyan-400",
    category: "Weather",
  },
  {
    id: "mail",
    label: "Gmail",
    url: "https://mail.google.com",
    description: "Email",
    color: "from-violet-500 to-purple-400",
    category: "Email",
  },
  {
    id: "calendar",
    label: "Calendar",
    url: "https://calendar.google.com",
    description: "Today's schedule",
    color: "from-amber-500 to-yellow-400",
    category: "Calendar",
  },
  {
    id: "duolingo",
    label: "Duolingo",
    url: "https://sv.duolingo.com/",
    description: "Daily language learning",
    color: "from-emerald-500 to-green-500",
    category: "Education",
  },
  
];
