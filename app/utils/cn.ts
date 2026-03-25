/**
 * Tailwind 클래스 조건부 조합 유틸
 * @example cn("px-4", isActive && "bg-blue-500", "text-white")
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
