// Select Elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Load Tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save Tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {

  taskList.innerHTML = "";

  // Show/Hide Empty Message
  emptyMessage.style.display =
    tasks.length === 0 ? "block" : "none";

  // Create Task Items
  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div class="task-left">

        <button class="complete-btn">
          ${task.completed ? "✅" : "⭕"}
        </button>

        <span class="task-text">
          ${task.text}
        </span>

      </div>

      <div class="task-actions">
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Complete Button
    const completeButton =
      li.querySelector(".complete-btn");

    completeButton.addEventListener(
      "click",
      () => {
        toggleTask(index);
      }
    );

    // Delete Button
    const deleteButton =
      li.querySelector(".delete-btn");

    deleteButton.addEventListener(
      "click",
      () => {
        deleteTask(index);
      }
    );

    taskList.appendChild(li);
  });
}

// Add Task
function addTask() {

  const taskText =
    taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  // Add New Task
  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();

  renderTasks();

  // Clear Input
  taskInput.value = "";
}

// Toggle Task
function toggleTask(index) {

  tasks[index].completed =
    !tasks[index].completed;

  saveTasks();

  renderTasks();
}

// Delete Task
function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  renderTasks();
}

// Add Button Click
addButton.addEventListener(
  "click",
  addTask
);

// Enter Key Support
taskInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      addTask();
    }

  }
);

// Initial Render
renderTasks();