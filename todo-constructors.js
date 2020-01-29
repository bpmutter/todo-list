//constructors for Todo and Project and associated mrethods
const Todo = class {
    constructor(title, description, dueDate, priority, notes, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
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
    constructor(name, todoList) {
        this.name = name;
        this.todoList = todoList;
    }

    addTodo(todo) { //fxn takes a todo and adds to list
        this.todoList.push(todo);
    }

    //later add other methods for sorting project by name, date, etc.
}


let projectDirectory = [];
const addProject = function (project) {
    projectDirectory.push(project);
}

let exampleTodo1 = new Todo("laundry", "wash it", "11/2/1994", 4, "", false);
let exampleTodo2 = new Todo("groceries", "buy it", "11/2/2004", 3, "", false);
let activeProject = new Project("Test Project", []);
activeProject.addTodo(exampleTodo1);
activeProject.addTodo(exampleTodo2);

export default { Todo, Project, projectDirectory, addProject };






