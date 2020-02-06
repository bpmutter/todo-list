import { Todo } from "./todo-constructors.js";

//fucntions to render elements in the DOM

//render all the projects on the left side
const renderProjectsTabs = function(directory) {
  document.getElementById("container--projects").innerHTML = "";
  for (let i = 0; i < directory.projectList.length; i++) {
    let projectTab = document.createElement("div");
    projectTab.classList.add("tab--project");
    let projectName = document.createElement("p");
    projectName.classList.add("project-name");
    projectTab.id = directory.projectList[i].name;
    projectName.innerText = directory.projectList[i].name;
    projectTab.appendChild(projectName);

    projectTab.addEventListener("click", () => {
      for (let j = 0; j < directory.projectList.length; j++) {
        directory.projectList[j].active = false;
      }
      directory.activate(directory.projectList[i]);

      let elements = document.getElementsByClassName("tab--project");
      for (let k = 0; k < elements.length; k++) {
        if (elements[k].classList.contains("active")) {
          elements[k].classList.remove("active");
        }
      }

      renderProjectTodos(directory.projectList[i]);
    });

    document.getElementById("container--projects").appendChild(projectTab);
  }
};

const renderProjectTodos = function(project) {
  //clear the project space HTML
  document.getElementById("container--active-project-todos").innerHTML = "";

  //add project name to the top
  document.getElementById("active-project-name").innerText = project.name;

  //load all the todo tabs with event listeners
  for (let i = 0; i < project.todoList.length; i++) {
    let todoTab = document.createElement("div");
    todoTab.classList.add("card--todo");
    todoTab.id = "card" + i;

    let leftSpan = document.createElement("span");
    leftSpan.classList.add("card--items-left");

    let todoInput = document.createElement("input");
    todoInput.type = "checkbox";
    todoInput.name = "todo";
    todoInput.id = `card${i}-checkbox`;
    todoInput.classList.add("card--checkbox");
    //`<input type="checkbox" name="todo" id="card${i}-checkbox" class="card--checkbox">`;

    let todoName = document.createElement("h3");
    todoName.classList.add("card--todo-name");
    todoName.innerText = project.todoList[i].title;

    let todoDate = document.createElement("span");
    todoDate.classList.add("card--todo-date");
    todoDate.innerHTML = project.todoList[i].dueDate;

    leftSpan.appendChild(todoInput);
    leftSpan.appendChild(todoName);
    leftSpan.appendChild(todoDate);

    if (project.todoList[i].completed == true) {
      todoName.style.textDecoration = "line-through";
      todoInput.checked = true;
    } else {
      todoName.style.textDecoration = "none";
      todoInput.checked = false;
    }

    let todoPriority = document.createElement("span");
    todoPriority.classList.add("card--todo-priority");
    todoPriority.innerHTML = project.todoList[i].priority;

    todoTab.appendChild(leftSpan);
    todoTab.appendChild(todoPriority);
    document
      .getElementById("container--active-project-todos")
      .appendChild(todoTab);

    todoTab.addEventListener("click", e => {
      if (e.target.id == `card${i}-checkbox`) {
        project.todoList[i].complete();
        if (project.todoList[i].completed == true) {
          todoName.style.textDecoration = "line-through";
        } else {
          todoName.style.textDecoration = "none";
        }
      } else {
        loadTodoPopup(project.todoList[i]);
        popUp();
        document.getElementById("update").onclick = function() {
          let todoUpdate = getTodo();
          project.updateTodo(todoUpdate, i);
          closePopUp();
          debugger;
          console.log(project.todoList[i].completed);
          if (project.todoList[i].completed == true) {
            todoName.style.textDecoration = "line-through";
          } else {
            todoName.style.textDecoration = "none";
          }
          renderProjectTodos(project);
        };
        document.getElementById("delete").onclick = function() {
          project.removeTodo(i);
          closePopUp();
          renderProjectTodos(project);
        };
      }
    });
  }
};

const getProjectName = function() {
  let newProjectName = document.getElementById("input--add-project").value;
  return newProjectName;
};

const getTodo = function() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("dueDate").value;

  let radiosPriority = document.getElementsByName("priority");
  let priority;

  if (radiosPriority[0].checked) {
    priority = "🔥";
  } else if (radiosPriority[1].checked) {
    priority = "🔥🔥";
  } else if (radiosPriority[2].checked) {
    priority = "🔥🔥🔥";
  }

  let radiosCompleted = document.getElementsByName("completed");
  let completed;
  if (radiosCompleted[0].checked) {
    completed = true;
  } else completed = false;

  let notes = document.getElementById("notes").value;

  const dateAdded = Date.now(); //unique tracker for each date and lets sort by

  return new Todo(
    title,
    description,
    dueDate,
    priority,
    notes,
    completed,
    dateAdded
  );
};

const popUp = function() {
  // Get the modal
  const modal = document.getElementById("my-pop-up");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  const closer = document.getElementById("closer");

  // When the user clicks on <span> (x), close the modal
  closer.onclick = function() {
    modal.style.display = "none";
    clearPopUp();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none";
      clearPopUp();
    }
  };
};
const closePopUp = function() {
  const modal = document.getElementById("my-pop-up");
  modal.style.display = "none";
  clearPopUp();
};

const clearPopUp = function() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementsByName("priority")[1].checked = true;
  document.getElementsByName("completed")[1].checked = true;
  document.getElementById("notes").value = "";

  document.getElementById("submit").style.display = "inline-block";
  document.getElementById("update").style.display = "none";
  document.getElementById("delete").style.display = "none";
};

const loadTodoPopup = function(todo) {
  document.getElementById("title").value = todo.title;
  document.getElementById("description").value = todo.description;
  document.getElementById("dueDate").value = todo.dueDate;
  if (todo.priority === "🔥") {
    document.getElementsByName("priority")[0].checked = true;
  } else if (todo.priority === "🔥🔥") {
    document.getElementsByName("priority")[1].checked = true;
  } else if (todo.priority === "🔥🔥🔥") {
    document.getElementsByName("priority")[2].checked = true;
  }

  if (todo.completed === true) {
    document.getElementsByName("completed")[0].checked = true;
  } else {
    document.getElementsByName("completed")[1].checked = true;
  }
  document.getElementById("notes").value = todo.notes;

  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "inline-block";
  document.getElementById("delete").style.display = "inline-block";
};

const toggleModifiersDisplay = function() {
  let modifiersDisplay = document.getElementById("container--modify-project");

  if (modifiersDisplay.classList.contains("hidden")) {
    modifiersDisplay.classList.remove("hidden");
  } else {
    modifiersDisplay.classList.add("hidden");
  }
};
const renameProject = function(project) {
  let newName = prompt("what do you want your project name to be?");

  project.name = newName;
  console.log("Project name is:" + project.name);
};

export {
  renderProjectsTabs,
  renderProjectTodos,
  getProjectName,
  getTodo,
  popUp,
  closePopUp,
  clearPopUp,
  toggleModifiersDisplay,
  renameProject
};
