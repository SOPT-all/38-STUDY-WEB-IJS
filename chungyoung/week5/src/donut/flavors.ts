import type { Flavor } from "./types";

export const flavors: Flavor[] = [
  {
    eyebrow: "Classic Glaze",
    name: "Golden loop, slow melt",
    note: "Vanilla glaze wraps around a warm cake ring with a soft studio sheen.",
    metric: "01 / Vanilla",
    base: "#c47a3f",
    icing: "#f7e6c9",
    accent: "#f2bd45",
    bg: "#fff4d1",
    bg2: "#f0a847",
    ink: "#27180d",
  },
  {
    eyebrow: "Choco Ring",
    name: "Dark coat, bright crunch",
    note: "A deeper glaze takes over as the ring turns through the light.",
    metric: "02 / Cacao",
    base: "#c47a3f",
    icing: "#3b201a",
    accent: "#ffde7d",
    bg: "#f1d7a5",
    bg2: "#7e3e2d",
    ink: "#211513",
  },
  {
    eyebrow: "Berry Orbit",
    name: "Pink gloss, sharp sparkle",
    note: "Berry icing shifts the scene cooler while sprinkles catch the rim.",
    metric: "03 / Berry",
    base: "#c47a3f",
    icing: "#f08bb6",
    accent: "#8b2ce0",
    bg: "#ffd7ea",
    bg2: "#7f78dc",
    ink: "#251029",
  },
  {
    eyebrow: "Fresh Drop",
    name: "Matcha drift, clean finish",
    note: "The last pass pulls the camera back for a balanced product reveal.",
    metric: "04 / Matcha",
    base: "#c47a3f",
    icing: "#8fb85d",
    accent: "#fff5cf",
    bg: "#e7f3d3",
    bg2: "#43917f",
    ink: "#11241d",
  },
];

export function getFlavorIndexFromProgress(progress: number) {
  return Math.min(flavors.length - 1, Math.floor(progress * flavors.length + 0.001));
}
