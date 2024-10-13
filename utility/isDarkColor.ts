/**
 * 주어진 색상이 어두운 색인지 확인합니다.
 *
 * @param color - 16진수 문자열 형식의 색상 코드 (예: "#000000"은 검정색)
 * @returns 색상이 어두운 색이면 true, 그렇지 않으면 false를 반환합니다.
 */
export default function isDarkColor(color: string): boolean {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 <= 186;
}
