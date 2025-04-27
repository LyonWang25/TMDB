// src/utils/slugify.ts
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // 把非字母數字變成 -
    .replace(/(^-|-$)/g, ""); // 移除開頭結尾的 -
}
