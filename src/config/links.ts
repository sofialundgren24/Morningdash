export type MorningLink = {
  id: string;
  label: string;
  url: string;
  description?: string;
  color: string;
  custom?: boolean;
};

export const morningLinks: MorningLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com",
    description: "Social media",
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "aftonbladet",
    label: "Aftonbladet",
    url: "https://www.aftonbladet.se",
    description: "News",
    color: "from-red-500 to-orange-400",
  },
  {
    id: "smhi",
    label: "SMHI",
    url: "https://www.smhi.se",
    description: "Weather",
    color: "from-sky-500 to-cyan-400",
  },
  {
    id: "mail",
    label: "Gmail",
    url: "https://mail.google.com",
    description: "Email",
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "calendar",
    label: "Calendar",
    url: "https://calendar.google.com",
    description: "Today's schedule",
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com",
    description: "Morning music",
    color: "from-emerald-500 to-green-400",
  },
  
];
