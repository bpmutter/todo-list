//fucntions to render elements in the DOM


//render all the projects on the left side
const renderProjectsTabs = function (projectDirectory) {
    for (let i = 0; i < projectDirectory.length; i++) {
        let projectTab = document.createElement("div")
        projectTab.class = "tab--project";
        let projectName = document.createElement("p");
        projectName.class = "project-name";
        projectName.id = projectDirectory[i].name;
        projectName.innerText = projectDirectory[i].name;
        projectTab.appendChild(projectName);

        projectTab.addEventListener("click", () => {
            renderProjectTodos(projectDirectory[i]);
        })

        document.getElementById("container-projects").appendChild(projectTab);
    }
};

const renderProjectTodos = function (project) {
    //add project name to the top
    document.getElementById("active-project-name").innerText = project.name;

    //load all the todo tabs with event listeners
    for (let i = 0; i < project.todoList.length; i++) {
        let todoTab = document.createElement("div");
        todoTab.class = "card--todo";
        todoTab.id = "card" + i;

        let leftSpan = document.createElement("span");
        leftSpan.class = "card--items-left";

        let todoInput = `<input type="checkbox" name="todo" id="card${i}-checkbox" class="card--checkbox">`;
        let todoName = `<h3 class="card--todo-name">${project.todoList[i].title}</h3>`;
        let todoDate = `<span class="card--todo-date">${project.todoList[i].dueDate}</span>`;
        let todoPriority = `<span class="card--todo-priority">${project.todoList[i].priority}</span>`
        leftSpan.appendChild(todoInput + todoName + todoDate);
        todoTab.appendChild(leftSpan);
        todoTab.appendChild(todoPriority);
        todoTab.addEventListener("click", () => {
            alert("werking!"); //add function to load pop up with more info
        })
        document.getElementById("container--active-project-todos").appendChild(todoTab);
    }
}

export default { renderProjectsTabs, renderProjectTodos };
