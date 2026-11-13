/**
 * Minimal className joiner so exported portfolio components have zero
 * dependency on `clsx` or `tailwind-merge`.
 */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(" ");
}

