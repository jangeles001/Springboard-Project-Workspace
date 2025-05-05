/* Task 1: Compile Participant Details with Shorthand Property Names */
const name = "James";
const age = 30;
const studyField = "Software Development";

const Participant = {
  name,
  age,
  studyField,
};

/* Task 2: Implement a Shorthand Function for Participant Info */
copyOfParticipant = {
  ...Participant,
  displayInfo() {
    console.log(
      `name: ${this.name}\nAge: ${this.age}\nField of Study: ${this.studyField}\n`
    );
  },
};

copyOfParticipant.displayInfo();

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
anotherCopyOfParticipant = {
  ...Participant,
  displayInfo: () => {
    console.log(
      `name: ${this.name}\nAge: ${this.age}\nField of Study: ${this.studyField}\n`
    );
  },
};

anotherCopyOfParticipant.displayInfo();
/*
 * Observations:
 * The arrow function inherits `this` from the global object and since the global object `this` doesn't have values for the variables they return as undefined.
 */

/* Task 4: Using Computed Property Names */
const updateParticipantInfo = function (propertyName, newValue, currObject) {
  const newObject = {
    ...currObject,
    [propertyName]: newValue,
  };
  return newObject;
};

const updatedParticipant = updateParticipantInfo("age", 31, copyOfParticipant);
updatedParticipant.displayInfo();
