//constructors for Todo and Project and associated mrethods
const Todo = class {
    constructor(title, description, dueDate, priority, notes, completed, dateAdded) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
        this.dateAdded = dateAdded;
    }

    //creating fxn b.c this will be used often w various outcomes coming off of it..makes things easier
    complete() {
        if (this.completed === true) {
            this.completed = false;
        }
        else this.completed = true;
    }
}


const Project = class {
    constructor(name, todoList, active) {
        this.name = name;
        this.todoList = todoList;
        this.active = active;
    }

    addTodo(todo) { //fxn takes a todo and adds to list
        this.todoList.push(todo);
    }

    updateTodo(todo, position) { //replaces an existing todo with a new one
        debugger;
        this.todoList.splice(position, 1, todo);
    }

    removeTodo(index) {
        this.todoList.splice(index, 1);
    }

    //later add other methods for sorting project by name, date, etc.
}

const ProjectDirectory = class {
    constructor(name, projectList) {
        this.name = name;
        this.projectList = projectList;
    }


    //method to find which project is active
    activeProject() {
        for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].active === true) {
                return this.projectList[i];
            } else console.log("no active project..u got a bug")
        }
    }

    activate(project) { //makes a certain project the active one

        //disactivate all projects
        for (let i = 0; i < this.projectList.length; i++) {
            this.projectList[i].active = false;
        }

        for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].name == project.name) {
                return this.projectList[i].active = true;
            }
        }

    }

    addProject(project) {
        this.projectList.push(project);
    }

    removeProject(project) {
        if (this.projectList.length > 1) {
            this.projectList.splice(this.projectList.indexOf(project), 1);
        }
        else alert("sorry you can't delete your only project :(")

    }

}


export { Todo, Project, ProjectDirectory };







