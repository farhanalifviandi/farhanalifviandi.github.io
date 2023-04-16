const taskList = document.getElementById('task-list');
const newTaskForm = document.getElementById('new-task-form');
const newTaskInput = document.getElementById('new-task-input');
const deleteCompletedButton = document.getElementById('delete-completed-button');

let tasks = [];


if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  const newTaskText = newTaskInput.value.trim();

  if (newTaskText) {
    tasks.push({
      text: newTaskText,
      completed: false
    });

    newTaskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('change', e => {
    const checkbox = e.target;
  
    if (checkbox.classList.contains('task-checkbox')) {
      const taskIndex = checkbox.parentElement.dataset.index;
      const task = tasks[taskIndex];
  
      task.completed = checkbox.checked;
  
      if (task.completed) {
        checkbox.parentElement.classList.add
    } else {
        checkbox.parentElement.classList.remove('task-completed');
      }
  
      saveTasks();
    }
  });
  
  taskList.addEventListener('click', e => {
    const deleteButton = e.target;
  
    if (deleteButton.classList.contains('delete-task-button')) {
      const taskIndex = deleteButton.parentElement.dataset.index;
  
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  });
  
  deleteCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
  });
  
  function renderTasks() {
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.dataset.index = index;
  
      const taskCheckbox = document.createElement('input');
      taskCheckbox.type = 'checkbox';
      taskCheckbox.checked = task.completed;
      taskCheckbox.classList.add('task-checkbox');
  
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.classList.add('task-completed');
      }
  
      const deleteTaskButton = document.createElement('button');
      deleteTaskButton.textContent = 'Delete';
      deleteTaskButton.classList.add('delete-task-button');
  
      const taskActions = document.createElement('div');
      taskActions.classList.add('task-actions');
      taskActions.appendChild(taskCheckbox);
      taskActions.appendChild(taskText);
      taskActions.appendChild(deleteTaskButton);
  
      taskElement.appendChild(taskActions);
  
      taskList.appendChild(taskElement);
    });
  
    saveTasks();
  }
  
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  