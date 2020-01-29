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

export default Todo;
export default Project;
