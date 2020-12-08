/*
restoreTask = Restore // content right
deleteTask = Delete // content right
*/

let content = document.getElementById("contentTask");
let toDoList = getList();
let alert = new alertModal();

render();

function render() {
    let listA = '';
    toDoList.forEach((list, index) => {
        if(toDoList[index].status === 'done') {
            listA +=
            `<li class="list-group-item taskList">
                <span>${list.tarea}</span>
                <div>
                    <button type="button" onclick="restoreTask(${index})" class="btn btn-info"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg> Restore</button>
                    <button type="button" onclick="deleteTask(${index})" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg> Delete</button>
                </div>
            </li>`
        }
    });
    content.innerHTML = listA;
}

function restoreTask(index) {
    title = "Restore Task";
    description = "Are you sure you want to restore this task?";
    btn1 = "Restore";
    alert.open(title, description, btn1).then((result) => {
        toDoList[index].status = 'active';
        setList();
        console.log(result + "ed");
    }).catch((error) => {
        console.log(error + "ed");
    });
}

function deleteTask(index) {
    title = "Delete Task";
    description = "Are you sure you want to delete this task?";
    btn1 = "Delete";
    alert.open(title, description, btn1).then((result) => {
        toDoList.splice(index, 1);
        setList();
        console.log(result + "ed");
    }).catch((error) => {
        console.log(error + "ed");
    });
}

function getList() {
    let storage = localStorage.getItem("listA");
    if(!storage) return; 
    return JSON.parse(storage);
}

function setList() {
    localStorage.setItem("listA", JSON.stringify(toDoList));
    render();
}
