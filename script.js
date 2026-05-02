class TodoPro {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoProTasks')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());

        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const title = document.getElementById('taskInput').value.trim();
        const priority = document.getElementById('prioritySelect').value;
        const category = document.getElementById('categorySelect').value;
        const dueDate = document.getElementById('dueDateInput').value;

        if (!title) return alert("Task likho bhai!");

        const task = {
            id: Date.now(),
            title,
            priority, // 🔥 ye decide karega kis column me jayega
            category,
            dueDate: dueDate || null,
            completed: false
        };

        this.tasks.unshift(task);
        this.saveTasks();

        this.render();
        this.updateStats();

        // reset inputs
        document.getElementById('taskInput').value = "";
        document.getElementById('dueDateInput').value = "";
    }

    saveTasks() {
        localStorage.setItem('todoProTasks', JSON.stringify(this.tasks));
    }

    toggleComplete(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });

        this.saveTasks();
        this.render();
        this.updateStats();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
        this.updateStats();
    }

    render() {
        document.getElementById('highPriorityTasks').innerHTML = "";
        document.getElementById('mediumPriorityTasks').innerHTML = "";
        document.getElementById('lowPriorityTasks').innerHTML = "";

        this.tasks.forEach(task => {
            const el = this.createTask(task);

            if (task.priority === "high") {
                document.getElementById('highPriorityTasks').appendChild(el);
            } else if (task.priority === "medium") {
                document.getElementById('mediumPriorityTasks').appendChild(el);
            } else {
                document.getElementById('lowPriorityTasks').appendChild(el);
            }
        });
    }

    createTask(task) {
        const div = document.createElement('div');
        div.className = "task-item";

        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        if (isOverdue) div.classList.add("overdue");

        div.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title ${task.completed ? 'completed' : ''}">
                        ${task.title}
                    </div>
                    <div class="task-meta">
                        ${task.dueDate ? `<span>📅 ${task.dueDate}</span>` : ""}
                    </div>
                </div>

                <div class="task-actions">
                    <button class="action-btn complete-btn">
                        ✔
                    </button>
                    <button class="action-btn delete-btn">
                        🗑
                    </button>
                </div>
            </div>
        `;

        div.querySelector('.complete-btn').onclick = () => this.toggleComplete(task.id);
        div.querySelector('.delete-btn').onclick = () => this.deleteTask(task.id);

        return div;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        const overdue = this.tasks.filter(t => 
            t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
        ).length;

        document.getElementById('totalTasks').innerText = total;
        document.getElementById('completedTasks').innerText = completed;
        document.getElementById('pendingTasks').innerText = pending;
        document.getElementById('overdueTasks').innerText = overdue;
    }
}

// START APP
new TodoPro();

document.addEventListener("DOMContentLoaded", function () {
  addBtn.addEventListener("click", addTask);
});

console.log(addBtn);
form.addEventListener("submit", function(e){
  e.preventDefault();
});

addBtn.addEventListener("click", addTask);