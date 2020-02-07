import { Todo, Project, ProjectDirectory } from "./todo-constructors.js";
import {
  renderProjectsTabs,
  renderProjectTodos,
  getProjectName,
  popUp,
  getTodo,
  closePopUp,
  toggleModifiersDisplay,
  renameProject
} from "./view.js";

const date1 = new Date("1994-11-02 GMT");
let exampleTodo1 = new Todo(
  "laundry",
  "wash it",
  date1,
  1,
  "notes",
  false,
  1234
);

const date2 = new Date("2004-11-02 GMT");
let exampleTodo2 = new Todo(
  "groceries",
  "buy it",
  date2,
  3,
  "notesssss",
  false,
  123
);

const date3 = new Date("1971-11-02 GMT");
let exampleTodo3 = new Todo(
  "milk",
  "lactose free pls",
  date3,
  2,
  "notes on notes",
  true,
  100000000
);
let exampleProject = new Project("My First Project", []);
exampleProject.addTodo(exampleTodo3);
exampleProject.addTodo(exampleTodo2);
exampleProject.addTodo(exampleTodo1);

let projectDirectory = new ProjectDirectory("MyDirectory", [exampleProject]);

projectDirectory.activate(projectDirectory.projectList[0]);
renderProjectsTabs(projectDirectory);

renderProjectTodos(projectDirectory.projectList[0]);

document.getElementById("button--add-project").addEventListener("click", () => {
  makeNewProject(getProjectName());
});

document.getElementById("button--add-todo").addEventListener("click", () => {
  popUp();
});

document.getElementById("submit").addEventListener("click", () => {
  let activeProject = projectDirectory.activeProject();
  let newTodo = getTodo();
  activeProject.addTodo(newTodo);
  renderProjectTodos(activeProject);
  closePopUp();
});

document
  .getElementById("button--modify-project")
  .addEventListener("click", () => {
    toggleModifiersDisplay();
  });

document
  .getElementById("button--rename-project")
  .addEventListener("click", () => {
    console.log("werking");
    let activeProject = projectDirectory.activeProject();
    renameProject(activeProject);
    renderProjectTodos(activeProject);
    renderProjectsTabs(projectDirectory);
  });

document
  .getElementById("button--delete-project")
  .addEventListener("click", () => {
    let activeProject = projectDirectory.activeProject();
    projectDirectory.removeProject(activeProject);
    projectDirectory.activate(projectDirectory.projectList[0]);
    renderProjectsTabs(projectDirectory);
    renderProjectTodos(projectDirectory.activeProject());
  });

const select = document.getElementById("select--order-by");
select.addEventListener("change", e => {
  const activeProject = projectDirectory.activeProject();
  if (select.value === "date-added") {
    orderProjectByDate(activeProject);
  } else if (select.value === "priority") {
    orderProjectByPriority(activeProject);
  } else if (select.value === "due-date") {
    console.log("order by due date");
  }

  renderProjectsTabs(projectDirectory);
  renderProjectTodos(projectDirectory.activeProject());
});

const makeNewProject = function(newProjectName) {
  if (newProjectName == "") {
    newProjectName = "New Project";
  }
  let newProject = new Project(newProjectName, []);
  projectDirectory.addProject(newProject);
  renderProjectsTabs(projectDirectory); //loads projects on the left
  projectDirectory.activate(
    projectDirectory.projectList[projectDirectory.projectList.length - 1]
  );

  document.getElementById("container--modify-project").classList.add("hidden");
  renderProjectTodos(
    projectDirectory.projectList[projectDirectory.projectList.length - 1]
  ); //loads the new project on the right
};

const orderProjectByDate = function(project) {
  //get project todolist
  let todoList = project.todoList;

  //reorder todo list by date from old to new(note: same as default), using dateAdded param of Todo constructor
  todoList.sort((a, b) => parseFloat(b.dateAdded) - parseFloat(a.dateAdded));

  //make project.todoList = reordered todoList
  project.todoList = todoList;
};

const orderProjectByPriority = function(project) {
  let todoList = project.todoList;

  //reorder project by priority, high to low.
  todoList.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));

  project.todoList = todoList;
};

// const orderProjectByDueDate = function(project) {
//   const todoList = project.todoList;

//   console.log(todoList[1].dueDate.getTime());

//   todoList.sort((a, b) => a.dueDate.getTime() - b.DueDate.getTime());

//   project.todoList = todoList;
// };

// orderProjectByDueDate(exampleProject);
// console.log(exampleProject.todoList);

// import { formatDistance, subDays } from "date-fns";

// console.log(formatDistance(subDays(new Date(), 3), new Date()));
// //=> "3 days ago"
