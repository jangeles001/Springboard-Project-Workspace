function debounce(func, delay) {
  let timeoutId; // ID of the current timeout, used to cancel previous delays

  return function (...args) {
    clearTimeout(timeoutId); // Clear any existing timeout to reset the delay
    // Set a new timeout to invoke the function after the specified delay
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function greet() {
  console.log(`Hello!`);
}

//const debouncedGreet = debounce(greet, 50000); // Create a debounced version of greet that delays execution by 50 seconds after the last call
const debounced = addOne(1);

//The variable values in addOne are preserved in the debounced variable. Each debounced call will essentially continue to add on to the result of the previous counter.
console.log(debounced(1));
console.log(debounced(2));
console.log(debounced(3));
//debouncedGreet(); //Calls debounce greet function

function addOne(counter) {
  let count = counter;

  return function (num) {
    count += num ?? 0;
    return count;
  };
}

/**
 * ----------Real world implementation using flush---------------
 *
 * const debouncedFetch = debounce(fetchResults, 500); // Create a debounced version of fetchResults that delays execution by 500ms after the last call
 *
 * // This waits until user stops typing for 500ms
 * input.addEventListener("input", debouncedFetch);
 *
 * // But this forces the fetch to happen immediately
 * button.addEventListener("click", () => {
 * debouncedFetch.flush();
 * });
 *
 * */
