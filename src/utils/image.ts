export function getImageUrl(path: string | null) {
  if (!path) return "";
  const base = "https://image.tmdb.org/t/p/original";
  return `${base}${path}`;
}
