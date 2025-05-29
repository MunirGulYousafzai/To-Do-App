window.addEventListener("resize", hideLongWords);
window.addEventListener("resize", makesButtonSmall);
// event litener to dispaly tasks and handle long words 
window.addEventListener("DOMContentLoaded",function(){
    displayTask();
    hideLongWords();
})
// event listener to make button small
window.addEventListener("DOMContentLoaded", function(){
    makesButtonSmall();
})


let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // this is an array which stores all the tasks 
let currentTheme = JSON.parse(localStorage.getItem("currentTheme")) || "light";

const inputTask = document.getElementById("inputTask");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
let currentFilter = "all";
// this function store the task on local storage 
function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// it's delete the task 
function handleDelete(index){
        tasks.splice(index, 1);
        saveTask();
        displayTask();
}

// it's edit the task
function handleEdit(index){
    const newText = prompt("Enter your task: ", tasks[index].text);
    // if the user enter nothing it will show the alert and then ask for to enter again and it will continue
    if(newText !== null && newText.trim() !== ""){
        tasks[index].text = newText;
        saveTask();
        displayTask();
    }
    else if(newText !== null){
        alert("Enter a valid task");
        newText = prompt("Enter your task: ", tasks[index].text);
        if(newText !== null && newText.trim() !== ""){
            tasks[index].text = newText;
            saveTask();
            displayTask();
        }
        else if(newText !== null){
            alert("Enter a valid task");
        }
    }
}


// this function add all the task in the tasklist (area) and update it also 

function displayTask(){
    // it's clear tasklist for the first time 
    
        
    
    taskList.innerHTML = "";

    // for each loop to add task to tasklist

    tasks.forEach((taskItem, index)=> {
        // logic for filtering completed and not completed tasks
        if((currentFilter === "completed" && !taskItem.completed) || (currentFilter === "notCompleted" && taskItem.completed)){
            return;
        }
        // first it will li 
        const li = document.createElement("li");

        // loop will create li left side
        // 1.create div
        const divLeft = document.createElement("div");
        divLeft.id = "Button_paragraph";
        // create label
        const label = document.createElement("label");
        label.id = "checkBoxButton";
        // create input type checkbox
        const inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        inputCheckBox.checked = taskItem.completed;

        // changing the checkbox
        inputCheckBox.addEventListener("change", function(){
            tasks[index].completed = inputCheckBox.checked;
            saveTask();
            displayTask();
        })
        // create span
        const span = document.createElement("span");
        span.className = "custom-checkbox";
        // create p for displaying the text of task
        const taskText = document.createElement("p");
        taskText.className = "inline-block task-text text-black dark:text-white pt-0.5";
        taskText.textContent = taskItem.text;
        if(taskItem.completed){
            taskText.style.textDecoration = "line-through";
            taskText.style.fontStyle = "italic";
        }
        // adds all the created to child to lable 
        label.appendChild(inputCheckBox);
        label.appendChild(span);
        label.appendChild(taskText);
        // add label to left div
        divLeft.appendChild(label);

        // now we will create the right side of task list area
        const divRight = document.createElement("div");
        divRight.id = "editBtn_deleteBtn";

        // create edit button 
        const editButton = document.createElement("button");
        editButton.innerHTML = '<img class="w-6 mr-5 mt-1 " src="./images/icons8-edit-64.png" alt="edit-icon">'
                
        // we will add event listener on clicking edit button
        editButton.addEventListener("click", () => handleEdit(index));

        // will create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<img class="w-6 mt-1 " src="./images/icons8-delete-60.png" alt="delete-icon">';

        // we will add event listener on clicking delete button
        deleteButton.addEventListener("click", () => handleDelete(index));

        // now will these child element to the parent which is divRight
        divRight.appendChild(editButton);
        divRight.appendChild(deleteButton);

        // last we will add left div and right div to the li
        li.appendChild(divLeft);
        li.appendChild(divRight);

        // finally we will add li to tasklist
        taskList.appendChild(li);
        
    });
    hideLongWords();
    makesButtonSmall();
}

// event listener while clicking the add button
addButton.addEventListener("click", function(event){
    event.preventDefault();
    const inputText = inputTask.value.trim();

    if(inputText !== null && inputText !== ""){
        tasks.push(
            {
                text : inputText,
                completed : false,
            }
        )
        inputTask.value = "";
        saveTask();
        displayTask();
    }
    else{
        alert("you can't add task without name");
    }
})

// adding eventlistener by filtering all, completed ,not completed buttons

// for clickin on all button
document.getElementById("all").addEventListener("click", function(event){
    taskList.classList.add("fade-out");
    event.preventDefault();
    setTimeout(() => {
    currentFilter = "all";
    displayTask();
    taskList.classList.remove("fade-out");
    taskList.classList.add("fade-in");
    setTimeout(() => {
        taskList.classList.remove("fade-in");
    }, 300);
    },300);
})


// for clicking on not completed button
document.getElementById("not-completed").addEventListener("click", function(event){
    taskList.classList.add("fade-out");
    event.preventDefault();
    setTimeout(() => {
    currentFilter = "notCompleted";
    displayTask();
    taskList.classList.remove("fade-out");
    taskList.classList.add("fade-in");
    setTimeout(() => {
        taskList.classList.remove("fade-in");
    }, 300);
    },300);
})

// for clicking on completed button
document.getElementById("completed").addEventListener("click", function(event){
    taskList.classList.add("fade-out");
    event.preventDefault();
    setTimeout(() => {
    currentFilter = "completed";
    displayTask();
    taskList.classList.remove("fade-out");
    taskList.classList.add("fade-in");
    setTimeout(() => {
        taskList.classList.remove("fade-in");
    }, 300);
    },300);
})



// it's a function to handle long words for different screen sizes
function hideLongWords(){
    if(window.innerWidth <= 600){
        document.querySelectorAll(".task-text").forEach((tasks) =>{
            const fullText = tasks.textContent;
            const words = fullText;
            if(words.length > 14){
                tasks.textContent = words.slice(0,11) + "...";
            }
        });
    }
    else if(window.innerWidth >= 601 && window.innerWidth <= 760){
        document.querySelectorAll(".task-text").forEach((tasks) =>{
            const words = tasks.textContent;
            if(words.length > 40){
                tasks.textContent = words.slice(0,20) + "...";
            }
        });
    }
    else if(window.innerWidth >= 761 && window.innerWidth <= 920){
        document.querySelectorAll(".task-text").forEach((tasks) =>{
            const words = tasks.textContent;
            if(words.length > 15){
                tasks.textContent = words.slice(0,11) + "...";
            }
        });
    }
    else if(window.innerWidth >= 920){
        document.querySelectorAll(".task-text").forEach((tasks) =>{
            const words = tasks.textContent;
            if(words.length > 40){
                tasks.textContent = words.slice(0,30) + "...";
            }
        });
    }
}



// click toggle button it's change the theme from dark to light and vice versa

window.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.querySelector("#toggleTheme input");
  // Apply the theme when the page loads
    if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    // the position of toggle button is loaded and the previous one will be assigned
    if(toggleBtn){
        toggleBtn.checked = true;
    }
    }

  toggleBtn.addEventListener("change", function (event) {
    event.preventDefault();
    document.documentElement.classList.toggle("dark");

    // Update theme in localStorage
    const isDark = document.documentElement.classList.contains("dark");
    // this is ternary operator which works like if else statement
    // first we check the condition in this case it is idDark ? 
    // if isDark is true it will return "dark" otherwise it will return "light"
    localStorage.setItem("currentTheme", JSON.stringify(isDark ? "dark" : "light"));
  });
});




// it's for smalling the fontsize of buttons when the scree is small
function makesButtonSmall(){
    if(window.innerWidth <= 395){
        document.getElementById("all").style.fontSize = "12px";
        document.getElementById("not-completed").style.fontSize = "12px";
        document.getElementById("completed").style.fontSize = "12px";
    }
}

