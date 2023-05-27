const form =document.querySelector("#todo-form");
const input=document.querySelector("#todo");

const todolist=document.querySelector(".list-group");

const card=document.querySelectorAll(".card-body")[0];

const card2=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");

const clearbutton=document.querySelector("#clear-todos");

eventlistener();

function eventlistener(){
    form.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",loadalltodosUI);
    card2.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filtertodos);


}

function filtertodos(e){
    const filtervalue=e.target.value.toLowerCase();
    const listitem=document.querySelectorAll(".list-group-item");
    listitem.forEach(function(a){
        const text=a.textContent.toLowerCase();
        if(text.indexOf(filtervalue)===-1){
            a.setAttribute("style","display:none!important");
        }else{
            a.setAttribute("style","display:block");
        }
    })
}


function deletetodo(e){
    if(e.target.className=="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","todo kaldırıldı");

    }
}

function deleteStorage(deltodo){
    let todos=getotodos();
    todos.forEach(function(todo,index){
        if(todo==deltodo){
            todos.splice(index,1);

        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadalltodosUI(){
    let todos=getotodos();

    todos.forEach(function(todo){
        addtodoUI(todo);

    })
}

function addtodo(e){
    const newtodo=input.value.trim();

    if(newtodo===""){
        showAlert("danger","lütfen todo girin");

    }
    else{
        addtodoUI(newtodo);
        addtodoStrogare(newtodo);
        showAlert("success","todo eklendi");

    }
    e.preventDefault();
}
function getotodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];

    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addtodoStrogare(todo){
    let todos=getotodos();
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}


function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className= 'alert alert-'+type;
    alert.textContent=message;

    card.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },2000)

}



function addtodoUI(newtodo){
    const listitem=document.createElement("li");
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listitem.className="list-group-item d-flex justify-content-between";
    listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(link);

    todolist.appendChild(listitem);
    input.value="";
    

}