let btn = document.querySelector(".button");
let id = 0;
let leftul = document.querySelector(".left-content").querySelector("ul");
let rightul = document.querySelector(".right-content").querySelector("ul");
let tasksToDo = JSON.parse(localStorage.getItem("tasksToDo")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// let count = localStorage.length>1?Number(localStorage.getItem("count")):0;
let count = localStorage.getItem("count") || 0;
let leftCount = localStorage.getItem("lower") || 0;

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

// localStorage.setItem(localStorage.key(0),count);
// let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
// tasks.forEach(element => {
//     leftul.appendChild(element);
// });
// if(count>0){
//     for(let i=0;i<=count;i++){
//         let st=localStorage.getItem(`task${i}`);
//         // console.log(st)
//         if(st!=undefined){
//             let task = JSON.parse(st);
//             let li = document.createElement("li");
//             li.id=`task${i}`
//             li.innerHTML = task;
//             leftul.appendChild(li);
//         }
//     }
//     for(let i=0;i<=count;i++){
//         let st=localStorage.getItem(`ctask${i}`);
//         // console.log(st)
//         if(st!=undefined){
//             let task = JSON.parse(st);
//             let li = document.createElement("li");
//             li.innerHTML = task;
//             li.id=`ctask${i}`
//             li.querySelector("input").checked=true;
//             rightul.appendChild(li);
//         }
//     }
// for(let i=0;i<localStorage.length;i++){
//     let key = localStorage.key(i);
//     console.log(key);
//     // console.log(localStorage.getItem(key))
//     if(key.startsWith("task")){
//         let st=localStorage.getItem(key);
//         let task = JSON.parse(st);
//         let li = document.createElement("li");
//         li.innerHTML = task;
//         li.id=key;
//         li.querySelector("input").checked=false;
//         leftul.appendChild(li);
//     }
//     else if(key.startsWith("ctask")){
//         let st=localStorage.getItem(key);
//         let task = JSON.parse(st);
//         let li = document.createElement("li");
//         li.id=key;
//         li.innerHTML = task;
//         li.querySelector("input").checked=true;
//         rightul.appendChild(li);
//     }
// }
// }

btn.addEventListener("click", () => {
    // console.log("Selected")
    // let item = document.createElement("li");
    // let task = document.createElement("input");
    // let checkbox = document.createElement("input");
    // let content = document.querySelector(".left-content").querySelector("ul");
    // checkbox.type="checkbox";
    // checkbox.className="c-box";
    // task.type = "text";
    // task.className = "input";
    // item.appendChild(checkbox)
    // item.appendChild(task)
    // content.appendChild(item);
    let body = document.body;
    let newTaskWindow = document.createElement("div");
    let input = document.createElement("textarea");
    let done = document.createElement("button");
    let cancel = document.createElement("button");
    let overlay = document.createElement("div");
    let buttons = document.createElement("div");
    let ul = document.querySelector(".left-content").querySelector("ul");
    // input.type="text";
    input.name = "task";
    input.className = "task";
    input.placeholder = "Enter Task";
    overlay.className = "overlay";
    newTaskWindow.className = "modal";
    buttons.className = "buttons";
    // newTaskWindow.className+=" box";
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
    // btn.ariaHidden()
    // btn.setAttribute("hidden", "hidden");
    btn.style.display = "none";
    cancel.addEventListener("click", () => {
        btn.removeAttribute('style');
        overlay.remove();
        newTaskWindow.remove();
    })
    done.addEventListener("click", () => {
        // console.log("clicked");
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
            // li.appendChild(input.value.trim().length);
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
    // if (e.key === "Enter" && document.querySelector(".modal").input.focus()) {
    //     document.querySelector(".done")?.click(); // triggers the Add Task button
    // }
    const modal = document.querySelector(".modal");
    const textarea = modal?.querySelector(".task");
    if (e.key === "Enter" && document.activeElement === textarea) {
        e.preventDefault(); // prevents newline in textarea
        document.querySelector(".done")?.click();
    }
});



// let ul = document.querySelector("ul");
if (leftul) {
    leftul.addEventListener("click", (e) => {
        // console.log("Checked")
        if (e.target.type === "checkbox") {
            // console.log(e.target.checked);
            if (e.target.checked) {
                let task = e.target.closest("li");
                let p = task.querySelector("p");
                p.innerHTML = `<s>${p.textContent}</s>`
                // task.id=`c${task.id}`;
                // console.log(task.innerHTML)
                // console.log(task)
                // rightul.appendChild(task);
                task.querySelector("input").checked = true;
                completedTasks.push(task.id);
                localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
                // tasksToDo.slice();
                // console.log(task)
                let index = tasksToDo.findIndex(t => t === task.id);
                if (index !== -1) {
                    tasksToDo.splice(index, 1);
                }
                localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
                // console.log(JSON.stringify(task.innerHTML))
                // localStorage.setItem(task.id,JSON.stringify(task.innerHTML));
                // localStorage.removeItem(task.id);
                rightul.appendChild(task);
            }
        }
    })
}
if (rightul) {
    rightul.addEventListener("click", (e) => {
        // console.log("Checked")
        if (e.target.type === "checkbox") {
            // console.log(e.target.checked);
            if (!e.target.checked) {
                let task = e.target.closest("li");
                // console.log(task.querySelector("input"))
                let p = task.querySelector("p");
                p.innerHTML = p.textContent
                task.querySelector("input").checked = false;
                // console.log(task.innerHTML)
                // console.log(localStorage.setItem(task.id,JSON.stringify(task.innerHTML)))
                tasksToDo.push(task.id);
                localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
                // tasksToDo.slice();
                let index = completedTasks.findIndex(t => t === task.id);
                if (index !== -1) {
                    completedTasks.splice(index, 1);
                }
                localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
                // console.log(typeof (task.id))
                // let id = task.id;
                // if (id.startsWith("c")) {
                //     task.id = id.substring(1);
                // }
                // console.log(task.id)
                // localStorage.setItem(task.id,JSON.stringify(task.innerHTML));
                // localStorage.removeItem(`c${task.id}`);
                leftul.appendChild(task);
            }
        }
    })
}

leftul.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        let task = e.target.closest("li");
        // console.log("working")
        // localStorage.removeItem(e.target.closest("li").id);
        let index = tasksToDo.findIndex(t => t === task.id);
        if (index !== -1) {
            tasksToDo.splice(index, 1);
        }
        localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
        localStorage.removeItem(task.id);
        task.remove();

        // if(localStorage.length<=1){
        //     count=0;
        //     localStorage.setItem("count",0);
        // }
    }
})
rightul.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        let task = e.target.closest("li");

        // console.log("working")
        // console.log(e.target.closest("li").id);
        // localStorage.removeItem(e.target.closest("li").id);
        // localStorage.removeItem(`c${e.target.closest("li").id}`);
        let index = completedTasks.findIndex(t => t === task.id);
        if (index !== -1) {
            completedTasks.splice(index, 1);
        }
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        localStorage.removeItem(task.id);
        task.remove();

        // if(localStorage.length<=1){
        //     count=0;
        //     localStorage.setItem("count",0);
        // }
    }
})

// document.addEventListener('contextmenu', function(e) {
//     if (e.target.closest('ul') && e.target.closest('ul').className === 'leftul') {
//         console.log("Clicked");
//         console.log(e.target.closest("li"));
//         e.preventDefault(); // Prevent default menu if desired
//     }
// });

// let done = document.querySelector(".done");
// let cancel = document.getElementsByClassName(".cancel");
// // if(cancel){
//     cancel[0].addEventListener("click", () => {
//         console.log("Selected")
//     });
// // }