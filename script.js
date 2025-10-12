let btn = document.querySelector(".button");
let leftul = document.querySelector(".left-content").querySelector("ul");
let rightul = document.querySelector(".right-content").querySelector("ul");
let tasksToDo = JSON.parse(localStorage.getItem("tasksToDo")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

let count = localStorage.getItem("count") || 0;

for (const element of tasksToDo) {
    let li = document.createElement("li");
    li.id = element;
    li.innerHTML = JSON.parse(localStorage.getItem(element));
    li.querySelector("input").checked = false;
    leftul.appendChild(li);
}
for (const element of completedTasks) {
    let li = document.createElement("li");
    li.id = element;
    li.innerHTML = JSON.parse(localStorage.getItem(element));
    // let task = e.target.closest("li");
    let p = li.querySelector("p");
    p.innerHTML = `<s>${p.textContent}</s>`
    li.querySelector("input").checked = true;
    rightul.appendChild(li);
}

btn.addEventListener("click", () => {
    let body = document.body;
    let newTaskWindow = document.createElement("div");
    let input = document.createElement("textarea");
    let done = document.createElement("button");
    let cancel = document.createElement("button");
    let overlay = document.createElement("div");
    let buttons = document.createElement("div");
    let ul = document.querySelector(".left-content").querySelector("ul");
    input.name = "task";
    input.className = "task";
    input.placeholder = "Enter Task";
    overlay.className = "overlay";
    newTaskWindow.className = "modal";
    buttons.className = "buttons";
    cancel.textContent = "Cancel";
    cancel.className = "cancel"
    cancel.className += " done-cancel"
    done.textContent = "Add Task";
    done.className = "done";
    done.className += " done-cancel";
    newTaskWindow.appendChild(input);
    buttons.appendChild(cancel);
    buttons.appendChild(done);
    newTaskWindow.appendChild(buttons);
    body.append(overlay);
    body.append(newTaskWindow);
    input.focus();
    btn.style.display = "none";
    cancel.addEventListener("click", () => {
        btn.removeAttribute('style');
        overlay.remove();
        newTaskWindow.remove();
    })
    done.addEventListener("click", () => {
        if (input.value && input.value.trim().length) {
            let li = document.createElement("li");
            let checkbox = document.createElement("input");
            let p = document.createElement("p");
            let del = document.createElement("img");
            let div = document.createElement("div");
            del.src = "assets/delete-2-svgrepo-com.svg";
            del.alt = "del";
            del.style.width = "15px";
            checkbox.type = "checkbox";
            checkbox.name = "task";
            li.id = `task${count++}`;
            localStorage.setItem("count", count);
            tasksToDo.push(li.id);
            localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
            p.innerHTML = input.value.trim();
            div.append(checkbox);
            div.append(p);
            li.appendChild(div);
            li.appendChild(del);
            localStorage.setItem(li.id, JSON.stringify(li.innerHTML));
            ul.appendChild(li);
            btn.removeAttribute('style');
            overlay.remove();
            newTaskWindow.remove();
        }
        else {
            alert("Empty task can't be added");
        }
    })
});

document.body.addEventListener("keydown", (e) => {
    const modal = document.querySelector(".modal");
    const textarea = modal?.querySelector(".task");
    if (e.key === "Enter" && document.activeElement === textarea) {
        e.preventDefault(); // prevents newline in textarea
        document.querySelector(".done")?.click();
    }
});



if (leftul) {
    leftul.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                let task = e.target.closest("li");
                let p = task.querySelector("p");
                p.innerHTML = `<s>${p.textContent}</s>`
                task.querySelector("input").checked = true;
                completedTasks.push(task.id);
                localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
                let index = tasksToDo.findIndex(t => t === task.id);
                if (index !== -1) {
                    tasksToDo.splice(index, 1);
                }
                localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
                rightul.appendChild(task);
            }
        }
    })
}
if (rightul) {
    rightul.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            if (!e.target.checked) {
                let task = e.target.closest("li");
                let p = task.querySelector("p");
                p.innerHTML = p.textContent
                task.querySelector("input").checked = false;
                tasksToDo.push(task.id);
                localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
                // tasksToDo.slice();
                let index = completedTasks.findIndex(t => t === task.id);
                if (index !== -1) {
                    completedTasks.splice(index, 1);
                }
                localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
                leftul.appendChild(task);
            }
        }
    })
}

leftul.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        let task = e.target.closest("li");
        let index = tasksToDo.findIndex(t => t === task.id);
        if (index !== -1) {
            tasksToDo.splice(index, 1);
        }
        localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
        localStorage.removeItem(task.id);
        task.remove();
    }
})
rightul.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        let task = e.target.closest("li");
        let index = completedTasks.findIndex(t => t === task.id);
        if (index !== -1) {
            completedTasks.splice(index, 1);
        }
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        localStorage.removeItem(task.id);
        task.remove();
    }
})