"use strict"

const btnAddList = document.getElementById("btn-add-list");


function addNewList() {
    let value = document.getElementById("name-todo").value;;
    if(value === "" || value === null){
        alert("Pole nie może być puste!");
        return false;
    }
    const newDiv = document.createElement("div");
    newDiv.classList.add('main-container')
    document.body.appendChild(newDiv);
    
    document.newDiv.appendChild();
}