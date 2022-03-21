"use strict";

let todoElements = [];
let idNumber = 0;
let deletedElement;

const todoInput = document.querySelector(".todo-input");
const todoSearch = document.querySelector(".todo-search");
const caseSensitive = document.querySelector("#case-sensitive");

const modal = document.querySelector(".modal");
const modalAgree = document.querySelector(".modal-agree");
const modalCancel = document.querySelector(".modal-cancel");

const todoButtonAdd = document.querySelector(".todo-button-add");
const todoContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todo");

class elementToDo{
    constructor(name, id,state) {
        this.name = name;
        this.id = id;
        this.state = state;
    };

    createElement = (todoText, id, state) => {
        const elementContainer = document.createElement("div");
        elementContainer.classList.add("todo");

        const listElement = document.createElement("li");
        elementContainer.classList.add("todo-list")
        listElement.id = id;

        const elementText = document.createElement("span");
        elementText.classList.add("text-header")
        elementText.innerText = todoText;

        const elementDate = document.createElement("span");
        elementDate.classList.add("time-inner")
        
        if(state){
            listElement.classList.add("completed-task");
            elementDate.innerText = new Date(Date.now()).toDateString();
        } else {
            elementDate.innerText = "";
            listElement.classList.remove("completed-task");
        }

        listElement.appendChild(elementContainer);
        elementContainer.appendChild(elementText);
        elementContainer.appendChild(elementDate);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fa fa-check"></i>`;
        completedButton.classList.add("complete-btn");

        completedButton.onclick = () => {
            this.state = !this.state;
            if(this.state){
                elementDate.innerText = new Date(Date.now()).toDateString();
                listElement.classList.add("completed-task");
            } else{
                listElement.classList.remove("completed-task");
                elementDate.innerText = "";
            }
            saveTodo();
            searchTodos();
        };

        elementContainer.appendChild(completedButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fa fa-trash"></i>`;
        deleteButton.classList.add("delete-btn");
        deleteButton.id = (`deleteButton${id}`)

        $(document).on("click", `#${deleteButton.id}` , function() {

            $(".modal").show();

            $(".modal-agree").on("click", function(){
                const index = todoElements.indexOf(todoElements.find((el) => el.id == id));
                if(index != -1){
                    deletedElement = [todoElements[index], listElement];
                    todoElements.splice(index, 1);
                }
                $(`#${id}`).fadeOut("normal", function() {
                    $(this).remove();
                });
                $("#recover-container").fadeIn();
                saveTodo();
                $(".modal").hide();
            });           
        });

        elementContainer.appendChild(deleteButton);

        return listElement;
    };
}

const checkIfEmpty = (string) => {
    if(!string.replace(/\s+/, '').length) {
        return false;
    } else return true;
}

const addTodoElement = (event) => {
    event.preventDefault();
    const inputName = todoInput.value;
    todoInput.value = "";
    if (!checkIfEmpty(inputName)){
        alert( "The Name field is empty!" );
        return false;
    }
    
    const newTodoElement = new elementToDo(inputName, idNumber, false);
    todoElements.push(newTodoElement);  
    saveTodo();
    
    todoContainer.appendChild(newTodoElement.createElement(inputName, idNumber));
    idNumber++;
    searchTodos();
    // filterTodo();
}

const changeCaseSen = () => {
    searchTodos();
}

const searchTodos = () => {
    const inputName = todoSearch.value;
    if(!inputName.replace(/\s+/, '').length ) {
        todoElements.forEach(function(todo){
            $(`#${todo.id}`).fadeIn();
        });
    } else {
        let checkBox = document.querySelector('#case-sensitive');
        if(checkBox.checked){
            todoElements.forEach(function(todo){
                if (todo.name.indexOf(inputName) > -1) {
                    $(`#${todo.id}`).fadeIn();
                } else {
                    $(`#${todo.id}`).fadeOut();
                }
            });
        } else {
            todoElements.forEach(function(todo){
                if (todo.name.toLowerCase().indexOf(inputName.toLowerCase()) > -1) {
                    $(`#${todo.id}`).fadeIn();
                } else {
                    $(`#${todo.id}`).fadeOut();
                }
            });
            
        }
    }
}
  
// const filterTodo = () => {
//     todoElements.forEach(function(todo) {
//         switch ($('#todos').val()) {
//         case "all":
//             $(`#${todo.id}`).fadeIn();
//             break;
//         case "completed":
//             if (todo.state) {
//                 $(`#${todo.id}`).fadeIn();
//             } else {
//                 $(`#${todo.id}`).fadeOut();
//             }
//             break;
//         case "uncompleted":
//             if (!todo.state) {
//                 $(`#${todo.id}`).fadeIn();
//             } else {
//                 $(`#${todo.id}`).fadeOut();
//             }
//             break;
//         }
//     });
// }



$(document).on("click", ".todo-recover" , function() {
    if (deletedElement === undefined){
        alert( "There is no deleted element!" );
    } else {
        deletedElement[1].removeAttribute("style")
        todoContainer.appendChild(deletedElement[1]);
        todoElements.push(deletedElement[0]);  
        deletedElement = undefined;
        saveTodo();
        $("#recover-container").fadeOut();
        // filterTodo();
    }
});

const saveTodo = () => {
    window.localStorage.setItem("todos", JSON.stringify(todoElements));
};


$('body').click(function (event) 
{
   if(!$(event.target).closest('.modal').length && !$(event.target).is('.modal')) {
     $(".modal").hide();
   }     
});

$(modalCancel).click(function () 
{
    $(".modal").hide();
});

document.body.onload = () => {
    $(".modal").hide();
    let todos ;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(window.localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const newTodoElement = new elementToDo(todo.name, todo.id, todo.state);
        todoElements.push(newTodoElement);  
    
        todoContainer.appendChild(newTodoElement.createElement(todo.name, todo.id, todo.state));
        if(idNumber < todo.id+1){
            idNumber=todo.id+1;
        }
    });
    searchTodos();
    // filterTodo();
}

todoButtonAdd.addEventListener("click", addTodoElement);
// filterOption.addEventListener("click", filterTodo);
todoSearch.addEventListener("keyup", searchTodos);
caseSensitive.addEventListener("change", changeCaseSen);
modalCancel.addEventListener("click", closeModal);