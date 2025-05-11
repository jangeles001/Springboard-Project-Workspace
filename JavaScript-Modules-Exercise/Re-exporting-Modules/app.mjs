import {
  isEven,
  factorial,
  roundTo,
  capitalize,
  toKebabCase,
  reverseString,
} from "./utils/index.mjs";

console.log(isEven(22));
console.log(factorial(5));
console.log(roundTo(25.56398, 4));
console.log(roundTo(25.56398) + "\n");

console.log(capitalize("jaime"));
console.log(toKebabCase("This string will be converted to kebab case!"));
console.log(
  "Reversed: " +
    reverseString(toKebabCase("This string will be converted to kebab case!"))
);
