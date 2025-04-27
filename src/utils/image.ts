type ImageSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

export function getImageUrl(path: string | null, size: ImageSize = "original") {
  if (!path) return "";
  const base = `https://image.tmdb.org/t/p/${size}`;
  return `${base}${path}`;
}
