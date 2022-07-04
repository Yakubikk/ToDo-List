const todoList = document.querySelector("#todo-list"),
    todoForm = document.querySelector("#todo-form"),
    addInput = document.querySelector("#add-input"),
    todoItems = document.querySelectorAll(".todo-item");

var del;
var edit;

function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === "string") {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(title) {
    del = new Image();
    del.src = "delete.png";
    edit = new Image();
    edit.src = "edit.png";


    const checkbox = createElement("input", { type: "checkbox", className: "checkbox" }),
        label = createElement("label", { className: "title" }, title),
        editInput = createElement("input", { type: "text", className: "textfield" }),
        todoPreview = createElement("div", { className: "todo-item__preview" }, checkbox, label, editInput),
        editButton = createElement("button", { className: "edit" }, edit),
        deleteButton = createElement("button", { className: "delete" }, del),
        todoSettings = createElement("div", { className: "todo-item__settings" }, editButton, deleteButton),
        listItem = createElement("li", { className: "todo-item" }, todoPreview, todoSettings);

    bindEvents(listItem);

    return listItem;
}


function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector(".checkbox"),
        editButton = todoItem.querySelector(".edit"),
        deleteBtn = todoItem.querySelector(".delete");

    checkbox.addEventListener("change", toggleTodoItem);
    editButton.addEventListener("click", editTodoItem);
    deleteBtn.addEventListener("click", deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value.trim() !== "" && addInput.value.length <= 24) {
        const listItem = createTodoItem(addInput.value);
        todoList.appendChild(listItem);

        todoForm.reset();
    } else if (addInput.value.trim() !== "" && addInput.value.length >= 24) {
        const listItem = createTodoItem(`${addInput.value.substring(0, 24)}...`);
        todoList.appendChild(listItem);

        todoForm.reset();
    } else {
        return alert("Необходимо ввести название задачи.");
    }
}

function toggleTodoItem({ target }) {
    const listItem = target.closest(".todo-item"),
        editButton = listItem.querySelector(".edit"),
        deleteBtn = listItem.querySelector(".delete");

    listItem.classList.toggle("completed");

    if (listItem.classList.contains('completed')) {
        editButton.setAttribute("disabled", "off");
    } else {
        editButton.removeAttribute("disabled");
        deleteBtn.removeAttribute("disabled");
    }
}

function editTodoItem({ target }) {
    const listItem = target.closest(".todo-item"),
        checkbox = listItem.querySelector(".checkbox"),
        title = listItem.querySelector(".title"),
        editInput = listItem.querySelector(".textfield"),
        isEditing = listItem.classList.contains("editing"),
        editBtn = listItem.querySelector('img');

    if (isEditing) {
        if (editInput.value.trim() !== "" && editInput.value.length <= 24) {
            title.innerText = editInput.value;
        } else if (editInput.value.trim() !== "" && editInput.value.length >= 24) {
            title.innerText = `${editInput.value.substring(0, 24)}...`;
        }

        target.innerText = "Изменить";
        checkbox.style.display = "block";
        editBtn.src = "edit.png";
    } else {
        editInput.value = title.innerText;
        target.innerText = "Сохранить";
        editBtn.src = "diskette.png";
        checkbox.style.display = "none";
    }

    listItem.classList.toggle("editing");
}

function deleteTodoItem({ target }) {
    const listItem = target.closest(".todo-item");

    todoList.removeChild(listItem);
}

function main() {
    todoForm.addEventListener("submit", addTodoItem);
    todoItems.forEach((item => {
        bindEvents(item);
    }));
}

main();