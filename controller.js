import { Todo, Project, ProjectDirectory } from "./todo-constructors.js";
import { renderProjectsTabs, renderProjectTodos, getProjectName, popUp, getTodo, closePopUp, toggleModifiersDisplay, renameProject } from "./view.js";

let exampleTodo1 = new Todo("laundry", "wash it", "11/2/1994", "🔥", "", false);
let exampleTodo2 = new Todo("groceries", "buy it", "11/2/2004", "🔥🔥🔥", "", false);
let exampleProject = new Project("My First Project", []);
exampleProject.addTodo(exampleTodo1);
exampleProject.addTodo(exampleTodo2);

let projectDirectory = new ProjectDirectory("MyDirectory", [exampleProject]);


projectDirectory.activate(projectDirectory.projectList[0]);
renderProjectsTabs(projectDirectory);

renderProjectTodos(projectDirectory.projectList[0]);


document.getElementById("button--add-project").addEventListener("click", () => {
    makeNewProject(getProjectName());
})


document.getElementById("button--add-todo").addEventListener("click", () => {
    popUp();
});

document.getElementById("submit").addEventListener("click", () => {
    let activeProject = projectDirectory.activeProject();
    let newTodo = getTodo();
    activeProject.addTodo(newTodo);
    renderProjectTodos(activeProject);
    closePopUp();
})

document.getElementById("button--modify-project").addEventListener("click", () => {
    toggleModifiersDisplay();
})

document.getElementById("button--rename-project").addEventListener("click", () => {
    console.log("werking")
    let activeProject = projectDirectory.activeProject();
    renameProject(activeProject);
    renderProjectTodos(activeProject);
    renderProjectsTabs(projectDirectory);

})

document.getElementById("button--delete-project").addEventListener("click", () => {

    let activeProject = projectDirectory.activeProject()
    projectDirectory.removeProject(activeProject);
    projectDirectory.activate(projectDirectory.projectList[0]);
    renderProjectsTabs(projectDirectory);
    renderProjectTodos(projectDirectory.activeProject())
    //render sidebar and active project

});



let makeNewProject = function (newProjectName) {
    if (newProjectName == "") {
        newProjectName = "New Project"
    }
    let newProject = new Project(newProjectName, []);
    projectDirectory.addProject(newProject);
    renderProjectsTabs(projectDirectory); //loads projects on the left
    projectDirectory.activate(projectDirectory.projectList[projectDirectory.projectList.length - 1])
    renderProjectTodos(projectDirectory.projectList[projectDirectory.projectList.length - 1]) //loads the new project on the right
}


