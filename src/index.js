import "./styles.css";
import { createProject, createProjectUi } from './modules/projects-module.js';
import { createProjectModalUi } from './modules/modals-module.js';

// Helper vars for dom elements
const htmlBody = document.querySelector('body');
const mainContainer = document.querySelector('main');

// Default project
const generalProject = createProject('General', 'A general list of todos.');
const generalProjectItem = document.querySelector('#nav-projects .general-project-item');

generalProjectItem.addEventListener('click', () => {
    mainContainer.innerHTML = '';
          
    mainContainer.append(createProjectUi(generalProject));
})

mainContainer.appendChild(createProjectUi(generalProject))

// Open modal to create new project
const btnCreateProject = document.querySelector('#nav-projects .btn-create-project');

btnCreateProject.addEventListener('click', () => {
    htmlBody.appendChild(createProjectModalUi());
});
