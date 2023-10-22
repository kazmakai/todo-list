/*----- constants -----*/
let deleteTask;
let editTask;
let updatetask = "";
let count;
let soundEffect = new Audio();
let isMuted = false

/*----- app's state -----*/


/*----- cached elements -----*/
const inputField = document.querySelector('#new-task > input');
const newTaskButton = document.querySelector('#push')
const listContainer = document.querySelector('#list-container')
const muteButton = document.querySelector('#mute');

/*----- event listeners -----*/
listContainer.addEventListener('click', checkTask);
newTaskButton.addEventListener('click', addTask);
inputField.addEventListener("keypress", function(event) { // code snippet I got from W3School to activate button by pressing 'enter'.
  if (event.key === "Enter") {
    event.preventDefault();
    newTaskButton.click();
  }
});

muteButton.addEventListener('click', toggleMuted);

/*----- functions -----*/

// add and delete tasks
function addTask() {
  if (inputField.value === "") {
    alert("You need to enter something.");
  } else {
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

// check and uncheck tasks
function checkTask(event) {
  if (event.target.tagName === 'LI') { // making toggle
    event.target.classList.toggle('checked');
    if (event.target.classList.contains('checked')) { //
        soundEffect.src = "./audio/checked.mp3"
        soundEffect.play(); 
      }
    saveData();
  } else if (event.target.tagName === "SPAN") {
    soundEffect.src = "./audio/delete.mp3"
    soundEffect.play(); 
    event.target.parentElement.remove();
    saveData();
  }
}


// mute/unmute sound effects
function toggleMuted(event) {
    const muteButton = event.target;
    isMuted = !isMuted;

    if (isMuted) {
        muteButton.style.backgroundImage = 'url(../assets/audioOff.svg)';
        soundEffect.volume = 0
    } else {
        muteButton.style.backgroundImage = 'url(../assets/audioOn.svg)'
        soundEffect.volume = 1
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

