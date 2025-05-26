/**
 * Task #1: Changing text inside of task1 p tag
 */
const task1 = document.querySelector("#task1");
task1.innerText = "Changed using 'innerText'.";

/**
 * Task #2: Adding button to task2 p tag
 */
const task2 = document.querySelector("#task2");
task2.innerHTML = `<button>Click Me!</button>`;

/**
 * Task #3: Change background color of the page
 */
const task3 = document.querySelector("body");
task3.style.backgroundColor = "#232323";

/**
 * Task #4: Make all the elements that have class 'item' have a border:
 */
const borderItems = document.querySelectorAll(".item");
for (const items of borderItems) {
  items.style.border = "2px solid black";
}

/**
 * Task #5: Change the href attribute of task5 link to 'https://www.springboard.com/'.
 */
const link = document.querySelector("#task5");
link.setAttribute("href", "https://www.springboard.com/");

/**
 * Task #6: Change the value of default text in the input to Dom Master
 */
const textBox = document.querySelector("#task6");
textBox.value = "DOM Master";

/**
 * Task #7: Use classList to add 'new-class' to to task7 element.
 */
const task7 = document.querySelector("#task7");
task7.classList.add("new-class");

/**
 * Task #8: Append a new button under task8 div element.
 */
const element = document.querySelector("#task8");
const newButton = document.createElement("Button");
newButton.textContent = `Click Me!`;
element.appendChild(newButton);

/**
 * Task #9: Remove task9 div element.
 */
const task9 = document.querySelectorAll(".task");
const node = document.querySelector("#task9");
task9[8].removeChild(node);
