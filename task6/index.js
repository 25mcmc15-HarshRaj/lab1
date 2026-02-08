// Enum for task status
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
// Task class
var Task = /** @class */ (function () {
    function Task(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.toggleStatus = function () {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    };
    return Task;
}());
// Array to store tasks
var tasks = [];
// Add new task
function addTask() {
    var input = document.getElementById("taskInput");
    var dateInput = document.getElementById("dateInput");
    if (!input || !dateInput)
        return;
    if (input.value === "" || dateInput.value === "") {
        alert("Please enter task and date");
        return;
    }
    var newTask = new Task(input.value, new Date(dateInput.value));
    tasks.push(newTask);
    displayTasks();
    input.value = "";
    dateInput.value = "";
}
// Display tasks
function displayTasks() {
    var list = document.getElementById("taskList");
    if (!list)
        return;
    list.innerHTML = "";
    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        li.innerHTML = "\n            <span style=\"text-decoration:".concat(task.status === TaskStatus.Completed ? "line-through" : "none", "\">\n                ").concat(task.title, " (").concat(task.dueDate.toDateString(), ")\n            </span>\n            <div>\n                <button onclick=\"toggleTask(").concat(index, ")\">\u2714</button>\n                <button onclick=\"removeTask(").concat(index, ")\">\u274C</button>\n            </div>\n        ");
        list.appendChild(li);
    });
}
// Toggle task status
function toggleTask(index) {
    tasks[index].toggleStatus();
    displayTasks();
}
// Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}
