export { createTask, createTaskUi }

// Task object factory
function createTask (name, dueDate, priority) {
    let task = {
        name,
        dueDate, 
        priority,
    };

    return task;
}

// Task Ui components creation
function createCheckbox () {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    return checkbox;
}

function createSpan (className, textContent) {
    const span = document.createElement("span");
    span.classList.add(className);
    span.textContent = textContent;

    return span;
}

function createDeleteButton () {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-delete-todo");

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-trash-can");

    deleteButton.append(icon);

    return deleteButton;
}

function createTaskUi (task, project) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo-item");

    // Store created elements in variables
    const taskCheckbox = createCheckbox();
    const nameSpan = createSpan("todo-name", task.name);

    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            taskDiv.classList.add('completed');
        } else {
            taskDiv.classList.remove('completed');
        }
    })

    const capitalizedTaskPriority = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    const prioritySpan = createSpan("todo-priority", capitalizedTaskPriority);
    prioritySpan.setAttribute("data-priority", task.priority);
    
    const dueDateSpan = createSpan("todo-due-date", task.dueDate);
    const deleteButton = createDeleteButton();

    deleteButton.addEventListener('click', event => {
        project.removeTask(task);
        event.target.closest('.todo-item').remove();
    });

    // Change task color on hovering delete button
    deleteButton.addEventListener('mouseover', () => {
        taskDiv.classList.add('btn-delete-hover');
    });

    deleteButton.addEventListener('mouseleave', () => {
        taskDiv.classList.remove('btn-delete-hover');
    });

    // Append elements to taskDiv
    taskDiv.append(taskCheckbox, nameSpan, prioritySpan, dueDateSpan, deleteButton);

    return taskDiv;
}
