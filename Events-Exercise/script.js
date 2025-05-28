document.addEventListener(`DOMContentLoaded`, function (event) {
  const boxContainer = document.querySelector(`#box-container`);
  const newBoxButton = document.querySelector(`#new-box-button`);

  /**
   * Updates the IDs and displayed numbers of all existing boxes in the container.
   */
  function updateBoxIds() {
    const boxList = document.querySelectorAll(".box");
    let count = 1;
    boxList.forEach((box) => {
      box.setAttribute("id", count);
      box.querySelector("span").textContent = count;
      count++;
    });
  }

  /**
   * Creates a new div with class "box" and adds it to the container.
   *
   * Adds the following event listeners: (Since we will only be creating a small amount of boxes)
   * - dblclick: Removes the box from the container and updates IDs.
   * - mouseenter: Displays the box's page coordinates inside its span.
   * - mouseleave: Restores the box's ID in the span.
   */
  function addNewBox() {
    const newBox = document.createElement(`div`);
    newBox.classList.add(`box`);
    newBox.style.backgroundColor = currentBoxBackgroundColorValue;
    boxContainer.appendChild(newBox);

    const boxList = document.querySelectorAll(`.box`); // Stores updated class list.
    const displayId = document.createElement("span"); //  Span for the ID/page coordniates.

    newBox.setAttribute(`id`, String(boxList.length));
    displayId.textContent = `${newBox.id}`;
    newBox.appendChild(displayId);

    //New box double-click event listener.
    newBox.addEventListener(`dblclick`, function (event) {
      boxContainer.removeChild(event.target);
      updateBoxIds();
    });

    // Changes the box’s span text to display page coordinates on hover.
    const span = newBox.querySelector(`span`);
    newBox.addEventListener(`mouseenter`, function (event) {
      const rectObj = newBox.getBoundingClientRect(); //Element viewport relative position

      //Adds the current scroll offsets (if the user has scrolled).
      const xCoordinate = rectObj.left + window.scrollX;
      const yCoordinate = rectObj.top + window.scrollY;

      // Display the rounded page coordinates inside the box's span.
      span.textContent = `X:${Math.round(xCoordinate)}, Y:${Math.round(
        yCoordinate
      )}`;
    });

    //Changes a boxes span text back to the id once the mouse leaves the box area.
    newBox.addEventListener("mouseleave", function (event) {
      span.textContent = `${newBox.id}`;
    });
  }

  /**
   * Adds a new box to the container when the "New Box" button is clicked.
   */
  newBoxButton.addEventListener(`click`, function (event) {
    addNewBox();
  });

  /**
   * Adds a new box when the "n" key is pressed,
   * unless the user is typing in an input, textarea, or contenteditable element.
   */
  document.addEventListener(`keypress`, function (event) {
    //Prevents the user from creating a new node by pressing `n` when the input field is being used.
    if (event.target.matches('input, textarea, [contenteditable="true"]')) {
      return;
    }
    if (event.key === `n`) {
      addNewBox();
    }
  });

  /**
   * Sets the background color for all existing boxes and updates
   * the default color for future boxes when the color form is submitted.
   */
  const inputField = document.querySelector(`#color-form`);
  const newColorButton = inputField.querySelector(`button`);
  const colorInput = inputField.querySelector(`input`);
  let currentBoxBackgroundColorValue = `#FFFFFF00`;

  newColorButton.addEventListener(`click`, function (event) {
    event.preventDefault();
    const boxList = document.querySelectorAll(`.box`);
    currentBoxBackgroundColorValue = colorInput.value;
    for (const box of boxList) {
      box.style.backgroundColor = currentBoxBackgroundColorValue;
    }
    colorInput.value = "";
  });
});
