// categories is the main data structure for the app; it looks like this:

// ex. [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = []; // Holds the current set of random category objects
const NUM_CATEGORIES = 6; // Number of categories to display
const NUM_QUESTIONS_PER_CAT = 5; // Number of clues/questions per category

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
  try {
    const response = await axios.get(
      "https://rithm-jeopardy.herokuapp.com/api/categories?count=20"
    );
    const catIds = response.data.map((category) => category.id); // Extract IDs from API response
    const randomIds = _.sampleSize(catIds, NUM_CATEGORIES); // Randomly pick NUM_CATEGORIES IDs

    return randomIds;
  } catch (error) {
    console.error(`There was an error processing your request: ${error}`);
  }
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
  try {
    const response = await axios.get(
      `https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`
    );

    //Builds category object from the response data.
    const category = {
      title: response.data.title,
      clues: response.data.clues.map(({ question, answer }) => ({
        question,
        answer,
        showing: null,
      })),
    };

    return category;
  } catch (error) {
    console.error(`There was an error processing your request: ${error}`);
  }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
  //Create table elements and wrapper.
  const boardWrapper = document.createElement("div");
  boardWrapper.setAttribute("id", "board-wrapper");
  const board = document.createElement("table");
  board.setAttribute("id", `jeopardy-board`);

  //Create table head row with category titles
  const tableHead = document.createElement("thead");
  tableHead.setAttribute("id", `category-heading`);
  const headerRow = document.createElement("tr");
  for (const category of categories) {
    const thTag = document.createElement("th");
    thTag.textContent = category.title.toUpperCase();
    headerRow.appendChild(thTag);
  }
  tableHead.appendChild(headerRow);

  //Create table body rows and cells
  const tableBody = document.createElement("tbody");
  tableBody.setAttribute(`id`, `panels`);

  for (let clueIndex = 0; clueIndex < NUM_QUESTIONS_PER_CAT; clueIndex++) {
    const row = document.createElement("tr");
    for (let catIndex = 0; catIndex < NUM_CATEGORIES; catIndex++) {
      const panel = document.createElement("td");
      panel.textContent = "?";
      panel.setAttribute("id", "panel");
      panel.setAttribute("data-category", catIndex);
      panel.setAttribute("data-clue", clueIndex);
      panel.setAttribute(
        "data-showing",
        categories[catIndex].clues[clueIndex].showing
      );
      row.appendChild(panel);
    }

    tableBody.appendChild(row);
  }

  //Append full table to the page
  board.appendChild(tableHead);
  board.appendChild(tableBody);
  boardWrapper.appendChild(board);
  body.appendChild(boardWrapper);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  // Retrieve the clicked panel and its clue/question information
  const panel = evt.target;
  const catIndex = +panel.getAttribute("data-category");
  const clueIndex = +panel.getAttribute("data-clue");
  const clue = categories[catIndex].clues[clueIndex];

  if (clue.showing === null) {
    panel.textContent = clue.question;
    clue.showing = "question";
  } else if (clue.showing === "question") {
    panel.textContent = clue.answer;
    panel.classList.add("revealed");
    clue.showing = "answer";
    panel.removeEventListener("click", handleClick); // Disable further clicks
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  button.setAttribute("disabled", "");
  const existingBoard = document.querySelector("#board-wrapper");
  if (existingBoard) {
    existingBoard.remove();
    categories = []; //Clear previous category data.
  }

  //Loading view creation.
  const loadingWrapper = document.createElement("div");
  loadingWrapper.setAttribute("id", "spinner-wrapper");
  const loadingImg = document.createElement("img");
  loadingImg.src = "./loading.png";
  loadingImg.setAttribute("id", "spinner");
  loadingWrapper.appendChild(loadingImg);
  body.appendChild(loadingWrapper);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  const spinnerWrapper = document.querySelector("#spinner-wrapper");
  spinnerWrapper.remove();
  button.textContent = "Restart";
  button.removeAttribute("disabled"); //Re-enables button
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  showLoadingView();
  const temp = await getCategoryIds();
  for (const id of temp) {
    categories.push(await getCategory(id));
  }
  fillTable();
  hideLoadingView();
}

/** On click of start / restart button, set up game. */
// Create and append game title
const body = document.querySelector("body");
const titleWrapper = document.createElement("div");
titleWrapper.setAttribute("id", "title-wrapper");
const title = document.createElement("h1");
title.setAttribute("id", "title");
title.textContent = "Jeopardy!";
titleWrapper.appendChild(title);
body.appendChild(titleWrapper);

// Create and append Start/Restart button
const buttonWrapper = document.createElement("div");
buttonWrapper.setAttribute("id", "button-wrapper");
const button = document.createElement("button");
button.setAttribute("id", "start-button");
button.textContent = "Start";
buttonWrapper.appendChild(button);
body.appendChild(buttonWrapper);

//Attach event listener to Start/Restart button.
button.addEventListener("click", function (event) {
  setupAndStart();
});

/** On page load, event handler for clicking clues */
document.addEventListener("DOMContentLoaded", function (event) {
  document.addEventListener("click", function (evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === "panel") {
      handleClick(evt);
    }
  });
});
