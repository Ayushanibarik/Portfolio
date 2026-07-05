export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string, baseUrl: string) {
  return new URL(path, baseUrl).toString();
}
