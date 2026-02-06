let tasks = [];   // Array to store tasks

/* ADD TASK */
function addTask() {
    let taskText = document.getElementById("taskInput").value;
    let dueDate = document.getElementById("dateInput").value;

    if (taskText === "" || dueDate === "") {
        alert("Please enter task and due date");
        return;
    }

    tasks.push({
        text: taskText,
        date: new Date(dueDate),
        completed: false
    });

    sortTasks();
    displayTasks(tasks);

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";
}

/* DISPLAY TASKS */
function displayTasks(taskArray) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    taskArray.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} (Due: ${task.date.toDateString()})
            </span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="removeTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

/* MARK TASK COMPLETE */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks(tasks);
}

/* REMOVE TASK */
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks(tasks);
}

/* FILTERS */
function showAll() {
    displayTasks(tasks);
}

function showCompleted() {
    let completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
}

function showPending() {
    let pendingTasks = tasks.filter(task => !task.completed);
    displayTasks(pendingTasks);
}

/* SORT TASKS BY DUE DATE */
function sortTasks() {
    tasks.sort((a, b) => a.date - b.date);
}
