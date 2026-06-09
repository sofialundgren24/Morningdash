export type MorningLink = {
  id: string;
  label: string;
  url: string;
  description?: string;
  color: string;
};

export const morningLinks: MorningLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com",
    description: "Sociala medier",
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "aftonbladet",
    label: "Aftonbladet",
    url: "https://www.aftonbladet.se",
    description: "Nyheter",
    color: "from-red-500 to-orange-400",
  },
  {
    id: "smhi",
    label: "SMHI",
    url: "https://www.smhi.se",
    description: "Väder",
    color: "from-sky-500 to-cyan-400",
  },
  {
    id: "mail",
    label: "Gmail",
    url: "https://mail.google.com",
    description: "E-post",
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "calendar",
    label: "Kalender",
    url: "https://calendar.google.com",
    description: "Dagens schema",
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com",
    description: "Morgonmusik",
    color: "from-emerald-500 to-green-400",
  },
];
