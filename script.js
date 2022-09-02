const inputText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    let taskItem = document.createElement('li');
    taskItem.addEventListener('click', changeToGray)
    taskItem.innerText = inputText.value;
    inputText.value ='';
    taskList.appendChild(taskItem);
}

function changeToGray(event){
    event.target.style.backgroundColor = 'gray';
}