export function stringToColour(str: string) {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 6) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
}

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    // support shorthand like #f00
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function interpolateColor(
  value: number,
  minValue: number,
  maxValue: number,
  startHexColor: string,
  endHexColor: string
) {
  const t = (value - minValue) / (maxValue - minValue); // Normalize between 0 and 1
  const clampT = Math.min(1, Math.max(0, t)); // Clamp between 0 and 1

  // Parse the colors (assume they are in hex format like "#RRGGBB")
  const c1 = hexToRgb(startHexColor);
  const c2 = hexToRgb(endHexColor);

  const r = Math.round(c1.r + (c2.r - c1.r) * clampT);
  const g = Math.round(c1.g + (c2.g - c1.g) * clampT);
  const b = Math.round(c1.b + (c2.b - c1.b) * clampT);

  return `rgb(${r}, ${g}, ${b})`;
}
