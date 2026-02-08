// Enum for task status
enum TaskStatus {
    Pending,
    Completed
}

// Task class
class Task {
    title: string;
    dueDate: Date;
    status: TaskStatus;

    constructor(title: string, dueDate: Date) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }

    toggleStatus(): void {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    }
}

// Array to store tasks
let tasks: Task[] = [];

// Add new task
function addTask(): void {
    const input = document.getElementById("taskInput") as HTMLInputElement | null;
    const dateInput = document.getElementById("dateInput") as HTMLInputElement | null;

    if (!input || !dateInput) return;

    if (input.value === "" || dateInput.value === "") {
        alert("Please enter task and date");
        return;
    }

    const newTask = new Task(input.value, new Date(dateInput.value));
    tasks.push(newTask);

    displayTasks();

    input.value = "";
    dateInput.value = "";
}

// Display tasks
function displayTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement | null;
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((task: Task, index: number) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.status === TaskStatus.Completed ? "line-through" : "none"}">
                ${task.title} (${task.dueDate.toDateString()})
            </span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="removeTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Toggle task status
function toggleTask(index: number): void {
    tasks[index].toggleStatus();
    displayTasks();
}

// Remove task
function removeTask(index: number): void {
    tasks.splice(index, 1);
    displayTasks();
}
