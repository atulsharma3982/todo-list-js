let btn = document.querySelector(".button");
let leftul = document.querySelector(".left-content").querySelector("ul");
let rightul = document.querySelector(".right-content").querySelector("ul");
let tasksToDo = JSON.parse(localStorage.getItem("tasksToDo")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

let count = localStorage.getItem("count") || 0;

if(tasksToDo.length === 0 && completedTasks.length === 0){
    count = 0;
}

function createTask(id, data, checked = false) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    let p = document.createElement("p");
    let del = document.createElement("button");
    let img = document.createElement("img");
    let div = document.createElement("div");
    del.appendChild(img);
    del.className = "del";
    img.src = "assets/delete-2-svgrepo-com.svg";
    img.alt = "del";
    img.style.width = "15px";
    checkbox.type = "checkbox";
    checkbox.name = "task";
    // checkbox.checked = checked;
    li.id = id;
    p.innerHTML = data;
    div.append(checkbox);
    div.append(p);
    li.appendChild(div);
    li.appendChild(del);
    return li;
}



for (const element of tasksToDo) {
    let task = JSON.parse(localStorage.getItem(element));
    let li = createTask(task.id,task.data);
    li.querySelector("input").checked = false;
    leftul.appendChild(li);
}
for (const element of completedTasks) {
    let task = JSON.parse(localStorage.getItem(element));
    let li = createTask(task.id,task.data);
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
    cancel.addEventListener("click", cancelTask = () => {
        btn.removeAttribute('style');
        overlay.remove();
        newTaskWindow.remove();
        return;
    })
    done.addEventListener("click", () => {
        if (input.value.trim().length) {
            console.log("working")
            let task = {};
            let li = createTask(`task${count++}`, input.value.trim());
            localStorage.setItem("count", count);
            tasksToDo.push(li.id);
            task = {
                id : li.id,
                data : input.value.trim(),
                // checked : false
            }
            localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
            localStorage.setItem(li.id, JSON.stringify(task));
            ul.appendChild(li);
            btn.removeAttribute('style');
            overlay.remove();
            newTaskWindow.remove();
            cancel.removeEventListener("click" , cancelTask());
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
        let task = e.target.closest("li");
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                let p = task.querySelector("p");
                p.innerHTML = `<s>${p.textContent}</s>`
                task.querySelector("input").checked = true;
                completedTasks.push(task.id);
                localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
                let index = tasksToDo.findIndex(t => t === task.id);
                if (index !== -1) {
                    tasksToDo.splice(index, 1);
                }
                rightul.appendChild(task);
            }
        }
        if (e.target.closest(".del")) {
            let index = tasksToDo.findIndex(t => t === task.id);
            if (index !== -1) {
                tasksToDo.splice(index, 1);
            }
            localStorage.removeItem(task.id);
            task.remove();
        }
        localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
    })
}
if (rightul) {
    rightul.addEventListener("click", (e) => {
        let task = e.target.closest("li");
        if (e.target.type === "checkbox") {
            if (!e.target.checked) {
                let p = task.querySelector("p");
                p.innerHTML = p.textContent
                task.querySelector("input").checked = false;
                tasksToDo.push(task.id);
                localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
                let index = completedTasks.findIndex(t => t === task.id);
                if (index !== -1) {
                    completedTasks.splice(index, 1);
                }
                leftul.appendChild(task);
            }
        }
        if (e.target.closest(".del")) {
            let index = completedTasks.findIndex(t => t === task.id);
            if (index !== -1) {
                completedTasks.splice(index, 1);
            }
            localStorage.removeItem(task.id);
            task.remove();
        }
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    })
}
