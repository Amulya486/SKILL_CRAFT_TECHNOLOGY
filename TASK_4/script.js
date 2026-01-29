let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskText").value;
    const dateTime = document.getElementById("taskDateTime").value;

    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks.push({
        text: text,
        dateTime: dateTime,
        completed: false
    });

    saveTasks();
    renderTasks();

    document.getElementById("taskText").value = "";
    document.getElementById("taskDateTime").value = "";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "task-info";
        info.innerHTML = `
            <strong class="${task.completed ? 'completed' : ''}">${task.text}</strong><br>
            <small>${task.dateTime ? task.dateTime : ''}</small>
        `;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "✔";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleComplete(index);

        const editBtn = document.createElement("button");
        editBtn.innerText = "✏";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(actions);

        list.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task", tasks[index].text);
    if (newText !== null && newText !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();
