const todoInput = document.querySelector("#task");
const addTask = document.querySelector(".add-task-btn");
const todoUl = document.querySelector("ul");
const listContent = document.querySelector(".list-container");
const options = document.querySelectorAll(".options span");

function saveData() {
    const todoListContent = todoUl.innerHTML;
    localStorage.setItem("data", todoListContent);
}

function showTasks() {
    todoUl.innerHTML = localStorage.getItem("data") || '';
}

function filterTasks(status) {
    const tasks = document.querySelectorAll("ul li");
    tasks.forEach(task => {
        const isChecked = task.classList.contains("checked");
        if ((status === "pending" && !isChecked) || (status === "completed" && isChecked) || status === "all") {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

addTask.addEventListener("click", function () {
    const task = todoInput.value;

    if (task == "") {
        alert("You must provide a task to add it to the list.");
    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.textContent = task;

        li.appendChild(p);
        todoUl.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        todoInput.value = "";

        saveData();
        showTasks();
        filterTasks(document.querySelector(".active").id);
    }
});

options.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        filterTasks(btn.id);
    });
});

listContent.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        var isAlreadyChecked = e.target.classList.contains("checked");

        e.target.classList.toggle("checked");

        e.target.style.backgroundColor = isAlreadyChecked ? "" : "#90ee90";
        saveData();

    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
        filterTasks(document.querySelector(".active").id);
    }
});

showTasks();
