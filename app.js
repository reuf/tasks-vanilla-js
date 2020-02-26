// Define UI Vars.
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEvenetListners();

// Load all event listeners
function loadEvenetListners(){
  // DOM Load event to load tasks from local storage
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event - we will use event delegation
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', removeAllTasks);
  // Filter listener
  filter.addEventListener('keyup', filterTasks);
}

function addTask(e){
  if (taskInput.value === ''){
    alert('Add a task');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create a new link element for deletion
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input;
    taskInput.value = '';
    e.preventDefault();
  }
}

function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Remove the whole li
    if(confirm("Are you sure you want to delete?")){
      e.target.parentElement.parentElement.remove();

      // Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }  
}

function removeAllTasks(e){
  // Simple way
  // taskList.innerHTML = '';

  // Fast way
  // while(taskList.firstChild){ // This means while there is single element in the list
  //   taskList.removeChild(taskList.firstChild);
  // }

  // I came up with this
  if(confirm("Are you sure you want to delete all the tasks?")){
    let allLis = document.querySelectorAll('li.collection-item');
    allLis.forEach(element => {
      element.remove();
    });
  }

  // Remove from local storage
  removeAllTasksFromLocalStorage();
}

function filterTasks(e){
  const filterKeyword = e.target.value.toLowerCase();
  // console.log(filterKeyword);
  const allLis = document.querySelectorAll('li.collection-item');
  // console.log(allLis);
  allLis.forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterKeyword) !== -1){
      task.style.display= "block";
    } else {
      task.style.display= "none";
    }
  });
}

// Store task in local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Load tasks from local storage
function getTasks(e){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create a text node and append to li
      li.appendChild(document.createTextNode(task));
      
      // Create a new link element for deletion
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML='<i class="fa fa-remove"></i>';

      // Append the link to li
      li.appendChild(link);

      // Append li to the ul
      taskList.appendChild(li);
    });
  }
}

// Remove tasks from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove all tasks from storage
function removeAllTasksFromLocalStorage(){
  localStorage.removeItem('tasks');
  // Video way:
  // localStorage.clear();
}