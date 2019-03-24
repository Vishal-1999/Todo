let ul = document.querySelector('ul');

class Todo{
      
    constructor(){
        this.startApp();
    }
    startApp(){
        let todoString = localStorage.getItem("todo");
        if(todoString){
            let todoObj = JSON.parse(todoString);
            todoObj.forEach((obj)=>{
                this.addItem(obj.task, obj.isDone);
            })
        }
    }

    addItem(text, check = false){
        

        if(text == ""){
            let p = document.createElement("p");
            p.textContent = "Please enter a valid todo";
            p.setAttribute("class", "w-100 p-2 my-2 text-center text-danger");

            let app = document.getElementById("app");
            let tasks = document.getElementById("tasks")

            app.insertBefore(p, tasks);
        }else{
            let li = document.createElement("li");

            li.setAttribute('class', 'p-1 border border-info rounded mb-1 text-justify');

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            if(check){
                checkbox.checked = true;
            }

            let label = document.createElement("label");
            let textNode = document.createTextNode(text);

            label.appendChild(textNode);

            li.appendChild(checkbox);
            li.appendChild(label);

            ul.insertBefore(li, ul.firstChild);
            saveToLocalStorage();


        }

    }

    removeDone(){
        let li = ul.children;
        for ( let i = 0; i< li.length; i++){
            while(li[i] && li[i].firstChild.checked){
                ul.removeChild(li[i]);
            }
        }

        saveToLocalStorage();
    }

    removeAll(){
        let li = document.getElementsByTagName("li");
        
        for (let i = 0; i < ul.children.length; i++){
            while(li[i]){
                ul.removeChild(li[i]);
            }
        }
        localStorage.clear();
    }

}

let saveToLocalStorage = function(){
    let li = document.querySelectorAll("li");
    let todo = [];
    for (let i = 0; i < li.length; i++){
        let obj = {};
        //console.log(li.children);
        obj.task = li[i].lastChild.textContent;
        obj.isDone = li[i].firstChild.checked;

        todo.push(obj);
    }
    localStorage.setItem("todo", JSON.stringify(todo))
}



let todoApp = new Todo();

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let myValue = event.target.todo.value;
    
    todoApp.addItem(myValue);

    event.target.todo.value = "";

})

ul.addEventListener('click', saveToLocalStorage, true);


let removeDoneButton = document.getElementById("remove");
let removeAllButton = document.getElementById("removeAll");

removeDoneButton.addEventListener('click', todoApp.removeDone);
removeAllButton.addEventListener('click', todoApp.removeAll)









// let ul = document.querySelector("ul")

// let input = document.querySelector("#todo");
// input.addEventListener("submit", (event) => {
//     console.log("submited");
//     event.preventDefault();
//     console.log(event.target.value);
//     //let textnode = document.createTextNode(task);
//     if(textnode == ""){
//         console.log("emplty")
//     }else{
//         let li = document.createElement("li");
//         li.setAttribute("class", "p-1 border border-info rounded mb-1");

//         let label = document.createElement("label");
//         label.appendChild(event.target.value);
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.setAttribute("class", "rounded-sm mx-1");
//         li.appendChild(checkbox);
        

//         li.appendChild(label);

//         let first = ul.firstChild;
//         ul.insertBefore(li, first);

//         event.target.value = "";
//     }
// })

// let addItem = function(textnode){
//     let li = document.createElement("li");
//     li.setAttribute("class", "p-1 border border-info rounded mb-1");

//     let label = document.createElement("label");
//     let checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.setAttribute("class", "rounded-sm mx-1");
//     li.appendChild(checkbox);
//     label.appendChild(textnode);

//     li.appendChild(label);

//     let first = ul.firstChild;
//     ul.insertBefore(li, first);
// }