export { createTaskModalUi, createProjectModalUi };
import { createTask, createTaskUi } from './tasks-module.js';
import { createProject, createProjectItem, createProjectUi } from './projects-module.js';

// Modal Ui components creation
function createModalBackdrop () {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop');
    
    return modalBackdrop;
};

function createModalFormEl () {
    const formEl = document.createElement('form');
    formEl.classList.add('modal-form');

    return formEl;
};

function createModalFieldContainer () {
    const modalField = document.createElement('div');
    modalField.classList.add('modal-field');

    return modalField;
};

function createModalLabel (labelText) {
    const modalLabel = document.createElement('label');
    modalLabel.textContent = labelText;

    return modalLabel;
};

function createModalInputTypeText () {
    const modalInputTypeText = document.createElement('input');   
    modalInputTypeText.required = true;
    
    return modalInputTypeText;
};

function createModalInputTypeDate () {
    const modalInputTypeDate = document.createElement('input');
    modalInputTypeDate.required = true;
    modalInputTypeDate.type = 'date';

    return modalInputTypeDate;
};

function createModalSelectOptions () {
    const modalSelectOptions = [];
    const optionValues = ['low', 'medium', 'high'];

    optionValues.forEach(optionValue => {
        const modalSelectOption = document.createElement('option');
        const capitalizedOptionValue = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);

        modalSelectOption.value = optionValue;
        modalSelectOption.textContent =  capitalizedOptionValue;

        modalSelectOptions.push(modalSelectOption);
    })

    return modalSelectOptions;
};

function createModalSelect () {
    const modalSelectField = document.createElement('select');

    return modalSelectField;
};

function createModalTextArea () {
    const modalTextArea = document.createElement('textarea');

    return modalTextArea;
}

function createModalSubmitBtn () {
    const submitBtn = document.createElement('button');

    return submitBtn;
}

// Task modal Ui creation + functionality
function createTaskModalUi (project, projectContainer) {
    const modalBackdrop = createModalBackdrop();
    const modalForm = createModalFormEl();

    // Field to input task name
    const MAX_NAME_LENGTH = 28;
    const modalFieldTaskName = createModalFieldContainer();
    const modalLabelTaskName = createModalLabel('Task Name');
    const modalInputTaskName = createModalInputTypeText();

    modalInputTaskName.id = modalInputTaskName.name = 'task-name';
    modalInputTaskName.maxLength = MAX_NAME_LENGTH;
    modalInputTaskName.placeholder = 'Enter task name';

    modalFieldTaskName.append(modalLabelTaskName, modalInputTaskName);

    // Field to input task due date
    const modalFieldDueDate = createModalFieldContainer();
    const modalLabelDueDate = createModalLabel('Due Date');
    const modalInputDueDate = createModalInputTypeDate();

    modalInputDueDate.id = modalInputDueDate.name = 'due-date';

    modalFieldDueDate.append(modalLabelDueDate, modalInputDueDate);

    // Field to select task priority
    const modalFieldPriority = createModalFieldContainer();
    const modalSelectPriorityLabel = createModalLabel('Priority');
    const modalSelectPriority = createModalSelect();
    const modalSelectOptions = createModalSelectOptions();

    modalSelectPriority.id = modalSelectPriority.name = 'priority';

    modalSelectOptions.forEach(option => {
        modalSelectPriority.append(option);
    });

    modalFieldPriority.append(modalSelectPriorityLabel, modalSelectPriority);

    // Modal submit button
    const modalAddTaskBtn = createModalSubmitBtn();
    modalAddTaskBtn.classList.add('btn', 'btn-add-task');
    modalAddTaskBtn.textContent = 'Add Task';

    // Task submit button functionality
    modalAddTaskBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const taskName = modalInputTaskName.value;
        const taskDueDate = modalInputDueDate.value;
        const taskPriority = modalSelectPriority.value;
    
        if (!taskName || !taskDueDate || !taskPriority) return;  

        const newTask = createTask(taskName, taskDueDate, taskPriority);
        project.addTask(newTask);

        const taskUi = createTaskUi(newTask, project);
        projectContainer.append(taskUi);

        modalBackdrop.remove();
    });

    // Appending form and backdrop
    modalForm.append(modalFieldTaskName, modalFieldDueDate, modalFieldPriority, modalAddTaskBtn);
    modalBackdrop.append(modalForm);

    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            modalBackdrop.remove();
        }
    })

    return modalBackdrop;
}

// Project modal Ui creation + functionality
function createProjectModalUi () {
    const modalBackdrop = createModalBackdrop();
    const modalForm = createModalFormEl();

    // Field to input project name
    const MAX_NAME_LENGTH = 16;
    const modalFieldProjectName = createModalFieldContainer();
    const modalLabelProjectName = createModalLabel('Project Name');
    const modalInputProjectName = createModalInputTypeText();

    modalInputProjectName.id = modalInputProjectName.name = 'project-name';
    modalInputProjectName.maxLength = MAX_NAME_LENGTH;
    modalInputProjectName.placeholder = 'Enter project name';
    modalFieldProjectName.append(modalLabelProjectName, modalInputProjectName);

    // Field to input project description
    const MAX_DESCRIPTION_LENGTH = 36;

    const modalFieldProjectDescription = createModalFieldContainer();
    const modalLabelProjectDescription = createModalLabel('Project Description');
    const modalTextareaProjectDescription = createModalTextArea();

    modalTextareaProjectDescription.id = modalTextareaProjectDescription.name = 'project-description';
    modalTextareaProjectDescription.required = true;
    modalTextareaProjectDescription.placeholder = 'Enter a brief description of your project...';
    modalTextareaProjectDescription.maxLength = MAX_DESCRIPTION_LENGTH;

    modalFieldProjectDescription.append(modalLabelProjectDescription, modalTextareaProjectDescription);

    // Modal submit button
    const modalAddProjectBtn = document.createElement('button');
    modalAddProjectBtn.type = 'submit';
    modalAddProjectBtn.classList.add('btn', 'btn-add-project');
    modalAddProjectBtn.textContent = 'Add Project';

    // Project submit functionality
    modalAddProjectBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const projectName = modalInputProjectName.value;
        const projectDescription = modalTextareaProjectDescription.value;

        if (!projectName || !projectDescription) return;

        const newProject = createProject(projectName, projectDescription);

        // Add project to projects-list container
        const projectsListContainer = document.querySelector('#nav-projects .projects-list');
        const newProjectItem = createProjectItem(newProject);

        newProjectItem.addEventListener('click', () => {
            const mainContainer = document.querySelector('#main-content');

            mainContainer.innerHTML = '';
            
            mainContainer.append(createProjectUi(newProject));
        });

        projectsListContainer.append(newProjectItem);

        modalBackdrop.remove();
    });

    // Appending modal form and backdrop
    modalForm.append(modalFieldProjectName, modalFieldProjectDescription, modalAddProjectBtn);
    modalBackdrop.append(modalForm);

    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) modalBackdrop.remove();
    })

    return modalBackdrop;
}
