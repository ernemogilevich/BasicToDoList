/*
addTask = Add // input right
editTask = Edit // input right
modifyTask = Edit // content right
completeTask = Complete // content right
*/

let btnAdd = document.getElementById("addTask");
let input = document.getElementById("inputTask");
let btnEdit = document.getElementById("editTask");
let content = document.getElementById("contentTask");
let errorElement = document.getElementById("errorMessage");
let emptyElement = document.getElementById("emptyMessage");
let toDoList = getList();
let editValue = 0;
let alert = new alertModal();

btnEdit.style.display = 'none';
errorElement.style.display = 'none';
render();

btnAdd.addEventListener('click', () => {
    let text = input.value;
    if (text === '') {
        errorMsg("<strong>Error</strong>: you must add some text.");
    }
    else {
        toDoList.push({ tarea: text, status: 'active' });
        input.value = '';
        setList();
    }
});

btnEdit.addEventListener('click', () => {
    toDoList[editValue].tarea = input.value;
    btnAdd.style.display = 'block';
    btnEdit.style.display = 'none';
    input.value = '';
    setList();
});

function render() {
    let listA = '';
    toDoList.forEach((list, index) => {
        if (toDoList[index].status === 'active') {
            listA +=
                `<li class="list-group-item taskList">
                <span>${list.tarea}</span>
                <div>
                    <button type="button" onclick="modifyTask(${index})" class="btn btn-info"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg> Edit</button>
                    <button type="button" onclick="completeTask(${index})"class="btn btn-success"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
                    </svg> Complete</button>
                </div>
            </li>`
        }
    });
    content.innerHTML = listA;
}

function errorMsg(msg) {
    errorElement.style.display = 'inline-block';
    errorElement.innerHTML = msg;
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 2000);
}

function modifyTask(index) {
    input.value = toDoList[index].tarea;
    btnAdd.style.display = 'none';
    btnEdit.style.display = 'block';
    editValue = index;
}

function completeTask(index) {
    title = "Complete Task";
    description = "Are you sure you want to complete this task?";
    btn1 = "Complete";
    alert.open(title, description, btn1).then((result) => {
        toDoList[index].status = 'done';
        setList();
        console.log(result + "ed");
    }).catch((error) => {
        console.log(error + "ed");
    });
}

function getList() {
    let storage = localStorage.getItem("listA");
    if (!storage) return [];
    return JSON.parse(storage);
}

function setList() {
    localStorage.setItem("listA", JSON.stringify(toDoList));
    render();
}
