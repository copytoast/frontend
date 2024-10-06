/**
 * 주어진 퍼센트만큼 색상을 음영 처리합니다.
 * @param color - 16진수 색상 코드 (예: "#RRGGBB").
 * @param percent - 음영 처리할 퍼센트 (어둡게 하려면 음수, 밝게 하려면 양수).
 * @returns 음영 처리된 16진수 색상 코드.
 */
export default function shadeColor(color: string, percent: number): string {
  if (color.length !== 7 || color[0] !== "#") return "#000000";

  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + (R * percent) / 100));
  G = Math.min(255, Math.max(0, G + (G * percent) / 100));
  B = Math.min(255, Math.max(0, B + (B * percent) / 100));

  const toHex = (n: number) => n.toString(16).padStart(2, "0");

  return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
}
