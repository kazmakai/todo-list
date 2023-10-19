/*----- constants -----*/
let deleteTask;
let editTask;
let updatetask = "";
let count;

/*----- app's state -----*/


/*----- cached elements -----*/
const inputField = document.querySelector('#new-task > input');
const newTaskButton = document.querySelector('#push')
const listContainer = document.querySelector('#list-container')

/*----- event listeners -----*/
listContainer.addEventListener('click', checkTask);
newTaskButton.addEventListener('click', addTask);
inputField.addEventListener("keypress", function(event) { // code snippet I got from W3School to activate button by pressing 'enter'.
  if (event.key === "Enter") {
    event.preventDefault();
    newTaskButton.click();
  }
});


/*----- functions -----*/

// add tasks
function addTask() {
  if (inputField.value === "") {
    alert("You need to enter something.");
  } else {
    const soundEffect = new Audio();
    soundEffect.src = "./audio/Add.mp3"
    soundEffect.play(); 
    let list = document.createElement('li')
    list.innerHTML = inputField.value; // transferring inputField text to the list
    listContainer.appendChild(list); // display the list using the listContainer
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    list.appendChild(span);
  }
  inputField.value = ""; // clears the inputField when button is clicked
  saveData();
};

// check task
function checkTask(event) {
  if (event.target.tagName === 'LI') { // making toggle
    event.target.classList.toggle('checked');
    if (event.target.classList.contains('checked')) {
        const soundEffect = new Audio();
        soundEffect.src = "./audio/checked.mp3"
        soundEffect.play(); 
      }
    saveData();
  } else if (event.target.tagName === "SPAN") {
    const soundEffect = new Audio();
    soundEffect.src = "./audio/delete.mp3"
    soundEffect.play(); 
    event.target.parentElement.remove();
    saveData();
  }
}

// save data in local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML) // saving all the new tasks within the listContainer
}

// retrieve and show data in local storage
function showSavedData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showSavedData();




/* 
Default state:
- only the div > #new-task is active

1. 
when the "Add Task" button is clicked: 
- if, the text input is empty, return alert, 
- else, take the text and push it down to the tasks and empty the text input

2. 
when a task is checked: 
- change it to the one with the class ".completed". 
- revert it back when it's unchecked.

3. When the delete button is clicked:
- remove the list altogether


*/