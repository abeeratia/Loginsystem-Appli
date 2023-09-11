// ? html elements
var root = document.querySelector(":root");
var modeBtn = document.getElementById("mode");
var AddBtn = document.getElementById("newTask");
var modal = document.getElementById("modal");
var hidetask = document.getElementById("addBtn");
var statusInput = document.getElementById("status");
var categoryInput =document.getElementById("category");
var titleInput = document.getElementById("title");
var descriptionInput =document.getElementById("description");
var addTaskinput = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var container={
    nextUp:document.getElementById("nextUp"),
    inProgress:document.getElementById("inProgress"),
    done:document.getElementById("done")
  
}
var sections = document.querySelectorAll("section");
var gridBtn = document.getElementById("gridBtn");
var barsBtn = document.getElementById("barsBtn");
var tasksContainer = document.querySelectorAll(".tasks");
// ? app variables
var updateindex = 0;
var arryTasks=JSON.parse(localStorage.getItem("tasks")) || [];

var titleRegex= /^[a-z]{3,}$/;
var descriptionRegex= /^[a-z]{5,100}$/;

for (let i = 0; i < arryTasks .length; i++) {
  displayTask(i)
};



// ?functions

function showModal (){
    modal.classList.replace("d-none","d-flex");
    document.body.style.overflow="hidden";
    scroll(0,0);
}
function hidemodal(){
    modal.classList.replace("d-flex","d-none");
    document.body.style.overflow="visible";
}
function addTask() {
    if (validate(titleRegex,titleInput) && validate(descriptionRegex,descriptionInput)) {
        
    var task = {
        status:statusInput.value ,
        category:categoryInput.value,
        title:titleInput.value,
        description:descriptionInput.value
    }
    arryTasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(arryTasks));
   displayTask(arryTasks.length-1);
   resetInput()
}
else{
    console.log("errror");
}
}

function displayTask(index) {
    var taskHtml=`
    <div class="task">
    <h3 class="text-capitalize">${arryTasks[index]?.title}</h3>
    <p class="description text-capitalize">${arryTasks[index]?.description}</p>
    <h4 class="category ${arryTasks[index]?.category} text-capitalize">${arryTasks[index]?.category}</h4>
    <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
      <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
      <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
      <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
    </ul>
</div>
    
    `
    document.getElementById("toDo")
   container[arryTasks[index].status].querySelector(".tasks").innerHTML+=taskHtml;
}

function generateColor() {
    var colorCharacter=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
    var color = "#";

    for (var i = 1; i <= 6; i++) {
       var random = Math.trunc(Math.random() * colorCharacter.length);
       color += colorCharacter[random]
        
    }

    return color + "22"
}

function changeColor(e) {
   e.target.parentElement.parentElement.parentElement.style.backgroundColor = generateColor();
 
}
function deleteTask(index) {
    emptyContainers()
    arryTasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(arryTasks));
    for (let i = 0; i < arryTasks .length; i++) {
        displayTask(i)
      }
}
function emptyContainers() {
    for (x in container) {
       console.log(container[x]);
       container[x].querySelector(".tasks").innerHTML=""
    }
}
function getTaskInfo(index) {
    showModal();
    statusInput.value=arryTasks[index].status;
    categoryInput.value=arryTasks[index].category;
    titleInput.value=arryTasks[index].title;
    descriptionInput.value=arryTasks[index].description;
   addTaskinput.classList.add("d-none");
   updateBtn.classList.replace("d-none","d-block");
   updateindex=index;
}

function updateTask(index) {
    arryTasks[updateindex].status = statusInput.value
    arryTasks[updateindex].category = categoryInput.value
    arryTasks[updateindex].title = titleInput.value
    arryTasks[updateindex].description = descriptionInput.value
    localStorage.setItem("tasks",JSON.stringify(arryTasks));
    emptyContainers()
    for (let i = 0; i < arryTasks .length; i++) {
        displayTask(i)
      }
      hidemodal()
      addTaskinput.classList.remove("d-none");
      updateBtn.classList.replace("d-block","d-none");
      resetInput()
}
function resetInput() {
    statusInput.value="nextUp";
   categoryInput.value="education";
   titleInput.value="";
   descriptionInput.value="";
    
}
function changeMode() {
    if (modeBtn.dataset.mode == "night") {
      root.style.setProperty("--main-black", "#f1f1f1");
      root.style.setProperty("--sec-black", "#ddd");
      root.style.setProperty("--text-color", "#222");
      root.style.setProperty("--gray-color", "#333");
      root.style.setProperty("--mid-gray", "#f1f1f1");
      modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
      modeBtn.dataset.mode = "light";
    } else if (modeBtn.dataset.mode == "light") {
      root.style.setProperty("--main-black", "#0d1117");
      root.style.setProperty("--sec-black", "#161b22");
      root.style.setProperty("--text-color", "#a5a6a7");
      root.style.setProperty("--gray-color", "#dadada");
      root.style.setProperty("--mid-gray", "#474a4e");
      modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
      modeBtn.dataset.mode = "night";
    }
  }

function validate(regex,element) {
    if(regex.test(element.value)){
element.classList.add("is-valid");
element.classList.remove("is-invalid");
element.parentElement.nextElementSibling.classList.add("d-none")
        return true
    }
    else{ 
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.parentElement.nextElementSibling.classList.remove("d-none")
        return false
    }
    
}
function changeToBars() {
    gridBtn.classList.remove("active");
    barsBtn.classList.add("active");
  
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.remove("col-md-6", "col-lg-4");
      sections[i].style.overflow = "auto";
    }
  
    for (var j = 0; j < tasksContainer.length; j++) {
      tasksContainer[j].setAttribute("data-view", "bars");
    }
  }
  
  function changeToGrid() {
    barsBtn.classList.remove("active");
    gridBtn.classList.add("active");
  
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.add("col-md-6", "col-lg-4");
    }
  
    for (var j = 0; j < tasksContainer.length; j++) {
      tasksContainer[j].removeAttribute("data-view");
    }
  }
  









// ? Events

AddBtn.addEventListener("click",showModal );
// ! Hide modal
hidetask.addEventListener("click",hidemodal);
document.addEventListener("keydown" , function(e) {
if (e.key==" ") {
    hidemodal()
}
})
modal.addEventListener("click", function (e) {
if (e.target.id=="modal") {
    hidemodal() 
}
    
})
addTaskinput.addEventListener("click",function () {
    addTask()
});
updateBtn.addEventListener("click",updateTask);
modeBtn.addEventListener("click", changeMode);
titleInput.addEventListener("input",function () {
    validate(titleRegex,titleInput)
})
descriptionInput.addEventListener("input",function () {
    validate(descriptionRegex,descriptionInput)
})
barsBtn.addEventListener("click",changeToBars);
gridBtn.addEventListener("click",changeToGrid);