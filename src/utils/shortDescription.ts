export function shortDescription(text: string, limit = 200): {
  content: string;
  isTruncated: boolean;
} {
  if (text.length <= limit) {
    return { content: text, isTruncated: false };
  }

  return {
    content: text.slice(0, limit) + "...",
    isTruncated: true,
  };
}
