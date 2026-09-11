import {
  Camera,
  Fan,
  Gamepad2,
  Headphones,
  Laptop,
  Package,
  Refrigerator,
  Smartphone,
  Speaker,
  Tv,
  Watch,
  type LucideIcon,
} from "lucide-react";

const categoryIconMap: Record<string, LucideIcon> = {
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Camera,
  Watch,
  Gamepad2,
  Refrigerator,
  Fan,
  Speaker,
};

export function getCategoryIcon(icon: string | null): LucideIcon {
  if (!icon) {
    return Package;
  }

  return categoryIconMap[icon] ?? Package;
}
