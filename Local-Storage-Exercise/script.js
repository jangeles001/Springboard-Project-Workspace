document.addEventListener("DOMContentLoaded", function () {
  const noteContainer = document.getElementById("note-container");
  const newNoteButton = document.getElementById("new-note-button");
  const colorForm = document.getElementById("color-form");
  const colorInput = document.getElementById("color-input");

  let noteColor = localStorage.getItem(`localNoteColor`) ?? null; // Stores the selected note color from the form.
  let noteIdCounter = parseInt(localStorage.getItem("noteIdCounter")) || 0; // Counter for assigning unique IDs to new notes.

  loadNotes(); //Initial call to load saved notes.

  /**
   * Populates notes-container with the notes stored in local storage.
   */
  function loadNotes() {
    for (let index = 0; index < localStorage.length; index++) {
      const dataKey = localStorage.key(index);

      // Skip keys used for settings. Only process keys that represent notes.
      if (
        dataKey &&
        dataKey !== "localNoteColor" &&
        dataKey !== "noteIdCounter"
      ) {
        const note = document.createElement("textarea");
        let localData = JSON.parse(localStorage.getItem(dataKey));
        note.setAttribute("data-note-id", localData.id.toString()); // Stores the note ID to its data attribute.
        note.value = localData.value; //Sets the saved content of the note.
        note.className = localData.className; // Sets a CSS class.
        note.style.backgroundColor = localData.backgroundColor; // Sets the note's background color using the last selected note color.
        noteContainer.appendChild(note); // Appends it to the note container element as its child.
      }
    }
  }

  /**
   * Creates new note and appends it to the note-container.
   */
  function addNewNote() {
    const id = noteIdCounter;
    const content = `Note ${id}`;

    const note = document.createElement("textarea");
    note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
    note.value = content; //Sets the saved content of the note.
    note.className = "note"; // Sets a CSS class.
    note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
    noteContainer.appendChild(note); // Appends it to the note container element as its child.

    noteIdCounter++; // Increments the counter since the ID is used for this note.

    // Saves the new note data to localStorage.
    const noteData = {
      id: note.getAttribute("data-note-id"),
      className: note.className,
      value: note.value,
      backgroundColor: noteColor,
    };
    localStorage.setItem(
      note.getAttribute(`data-note-id`),
      JSON.stringify(noteData)
    );
    localStorage.setItem("noteIdCounter", noteIdCounter.toString()); //Adds noteIdCounter to local storage.
  }

  colorForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default event.

    const newColor = colorInput.value.trim(); // Removes whitespaces.

    const notes = document.querySelectorAll(".note");
    for (const note of notes) {
      note.style.backgroundColor = newColor;
      //Updates the color of the notes in local storage to the new color
      const noteId = note.getAttribute("data-note-id"); //Stores key for note retrieval.
      const localData = JSON.parse(localStorage.getItem(noteId)); // Gets note information.
      localData.backgroundColor = newColor; // Sets new background color;
      localStorage.setItem(noteId, JSON.stringify(localData)); //Places note back into local storage.
    }

    colorInput.value = ""; // Clears the color input field after from submission.

    noteColor = newColor; // Updates the stored note color with the new selection.

    //Updates the note color in the local storage.
    localStorage.setItem(`localNoteColor`, newColor);
  });

  newNoteButton.addEventListener("click", function () {
    addNewNote();
  });

  document.addEventListener("dblclick", function (event) {
    if (event.target.classList.contains("note")) {
      event.target.remove(); // Removes the clicked note.

      //Deletes the note from the saved notes in the local storage.
      localStorage.removeItem(event.target.getAttribute("data-note-id"));
    }
  });

  noteContainer.addEventListener(
    "blur",
    function (event) {
      if (event.target.classList.contains("note")) {
        //Updates the note of a focused box and saves the updated note to the corresponding note local storage.
        let dataId = event.target.getAttribute(`data-note-id`); //Stores key for note retrieval.
        let localData = JSON.parse(localStorage.getItem(dataId)); // Gets note information.
        localData.value = event.target.value; //Updates note text.
        localStorage.setItem(dataId, JSON.stringify(localData)); //Places updated note into local storage.
      }
    },
    true
  );

  window.addEventListener("keydown", function (event) {
    /* Ignores key presses made for color and note content inputs. */
    if (event.target.id === "color-input" || event.target.type === "textarea") {
      return;
    }

    /* Adds a new note when the "n" key is pressed. */
    if (event.key === "n" || event.key === "N") {
      addNewNote(); // Adds a new note.
    }
  });
});
