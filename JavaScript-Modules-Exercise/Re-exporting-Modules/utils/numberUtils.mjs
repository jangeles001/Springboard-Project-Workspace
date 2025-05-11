// Returns true if the number is even
export function isEven(num) {
  return num % 2 === 0;
}

// Returns the factorial of a number
export function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// Rounds a number to a given number of decimal places with the default round set to 2 decimal places.
export function roundTo(num, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}
