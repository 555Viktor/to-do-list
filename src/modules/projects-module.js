export { createProject, createProjectItem, createProjectUi, createProjectTasksContainer }
import { createTaskUi } from './tasks-module.js'
import { createTaskModalUi } from './modals-module.js'

// Project object factory
function createProject (name, description, taskList = []) {
    let project = {
        name,
        description,
        taskList,
        addTask(task) {
            this.taskList.push(task);
        },
        removeTask(currTask) {
            this.taskList = this.taskList.filter(task => task !== currTask);
        },
    };

    return project;
};

// Project Ui components creation
function createProjectItem (project) {
    const projectItemEl = document.createElement('li');
    projectItemEl.classList.add('project-item');
    projectItemEl.textContent = project.name;

    return projectItemEl;
};

function createProjectContainer () {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');

    return projectContainer;
};

function createProjectOverviewContainer () {
    const overviewContainer = document.createElement('div');
    overviewContainer.classList.add("project-overview-container");

    return overviewContainer;
};

function createProjectNameHeader (name) {
    const projectName = document.createElement("h1");
    projectName.classList.add("project-name");
    projectName.textContent = name;

    return projectName;
};

function createProjectDescriptionEl (description) {
    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-description");
    projectDescription.textContent = description;

    return projectDescription;
};

function createNewTaskButton () {
    const newTaskButton = document.createElement("button");
    newTaskButton.classList.add("btn", "btn-create-task");
    newTaskButton.textContent = "New task";

    return newTaskButton;
}

function createProjectOverview (project) {
    const overviewContainer = createProjectOverviewContainer();

    const projectNameHeader = createProjectNameHeader(project.name);
    const projectDescriptionEl = createProjectDescriptionEl(project.description);
    const btnNewTask = createNewTaskButton();

    btnNewTask.addEventListener('click', () => {
        // Open the modal Ui
        document.body.append(createTaskModalUi(project, document.querySelector('#main-content .project-tasks-container')));
    });

    overviewContainer.append(projectNameHeader, projectDescriptionEl, btnNewTask);
    return overviewContainer;
}

function createProjectTasksContainer (project) {
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("project-tasks-container");

    project.taskList.forEach(task => {
        const taskItem = createTaskUi(task, project);

        tasksContainer.append(taskItem);
    });

    return tasksContainer;
};

// Create project Ui
function createProjectUi (project) {
    const projectContainer = createProjectContainer();
    const overview = createProjectOverview(project);
    const tasksContainer = createProjectTasksContainer(project);

    projectContainer.append(overview, tasksContainer);

    return projectContainer;
};
