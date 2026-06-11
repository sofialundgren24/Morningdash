import { cn } from "@/lib/utils";

export const categoryIcons: Record<string, string> = {
  "Social media": "/socialmedia.svg",
  News: "/news.svg",
  Weather: "/weather.svg",
  Email: "/mail.svg",
  Calendar: "/calendar.svg",
  Education: "/education.svg",
  Food: "/food.svg",
  Default: "/butterfly.svg",
};

export const linkCategories = Object.keys(categoryIcons).filter(
  (category) => category !== "Default"
);

export function getCategoryIconPath(category?: string) {
  return categoryIcons[category || "Default"] || categoryIcons.Default;
}

type CategoryIconProps = {
  category?: string;
  className?: string;
  size?: number;
  visited?: boolean;
};

export function CategoryIcon({
  category,
  className,
  size = 120,
  visited = false,
}: CategoryIconProps) {
  return (
    <img
      src={getCategoryIconPath(category)}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn(
        "shrink-0 object-contain",
        visited && "opacity-60 grayscale",
        className
      )}
    />
  );
}
