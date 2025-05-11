// Capitalizes the first letter of a string
export function capitalize(str) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Converts a string to kebab-case ex. this-is-kebab-case
export function toKebabCase(str) {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

// Reverses a string
export function reverseString(str) {
  if (typeof str !== "string") return "";
  return str.split("").reverse().join("");
}
