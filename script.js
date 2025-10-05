let btn = document.querySelector(".button");
let id = 0;
let count = 0;
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
    // btn.ariaHidden()
    // btn.setAttribute("hidden", "hidden");
    btn.style.display = "none";
    cancel.addEventListener("click", () => {
        btn.removeAttribute('style');
        overlay.remove();
        newTaskWindow.remove();
    })
    done.addEventListener("click", () => {
        console.log("clicked");
        if (input.value && input.value.trim().length) {
            let li = document.createElement("li");
            let checkbox = document.createElement("input");
            let p = document.createElement("p");
            checkbox.type = "checkbox";
            checkbox.name = "task";
            li.id = `task${count++}`;
            p.innerHTML=input.value.trim();
            li.append(checkbox);
            li.append(p);
            // li.appendChild(input.value.trim().length);
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

let ul = document.querySelector("ul");
let leftul = document.querySelector(".left-content").querySelector("ul");
let rightul = document.querySelector(".right-content").querySelector("ul");
if(leftul){
    leftul.addEventListener("click",(e)=>{
        // console.log("Checked")
        if(e.target.type==="checkbox"){
            // console.log(e.target.checked);
            if(e.target.checked){
                let task = e.target.closest("li");
                let p = task.querySelector("p");
                p.innerHTML=`<s>${p.textContent}</s>`
                // console.log(task.innerHTML)
                console.log(task)
                // rightul.appendChild(task);
                rightul.appendChild(task);
            }
        }
    })
}
if(rightul){
    rightul.addEventListener("click",(e)=>{
        // console.log("Checked")
        if(e.target.type==="checkbox"){
            // console.log(e.target.checked);
            if(!e.target.checked){
                let task = e.target.closest("li");
                let p = task.querySelector("p");
                p.innerHTML=p.textContent
                console.log(task)
                leftul.appendChild(task);
            }
        }
    })
}

// let done = document.querySelector(".done");
// let cancel = document.getElementsByClassName(".cancel");
// // if(cancel){
//     cancel[0].addEventListener("click", () => {
//         console.log("Selected")
//     });
// // }