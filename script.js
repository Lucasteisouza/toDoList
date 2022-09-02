const inputText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const taskItemListed = document.getElementsByClassName ('taskItem');

addTaskButton.addEventListener('click', addTask);


function addTask() {
    let taskItem = document.createElement('li');
    taskItem.className = 'taskItem';
    taskItem.addEventListener('click', selectItem);
    taskItem.innerText = inputText.value;
    inputText.value ='';
    taskList.appendChild(taskItem);
}

function selectItem(event){
    if(event.target.id === 'selected-item'){
        event.target.id = '';
    }else{
        for(index=0; index < taskItemListed.length; index +=1){
            taskItemListed[index].id = '';
        }
        event.target.id ='selected-item'
    }
}