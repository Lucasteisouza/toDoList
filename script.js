const inputText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const taskItemListed = document.getElementsByClassName ('taskItem');
const clearTasksButton = document.getElementById('apaga-tudo');
const removeFinishedTasksButton = document.getElementById('remover-finalizados');
const completedTasks = document.getElementsByClassName('completed');

addTaskButton.addEventListener('click', addTask);
clearTasksButton.addEventListener('click', clearTasks)
removeFinishedTasksButton.addEventListener('click', removeFinished)


function addTask() {
    let taskItem = document.createElement('li');
    taskItem.className = 'taskItem';
    taskItem.addEventListener('click', selectItem);
    taskItem.addEventListener('dblclick', taskCompleted);
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

function taskCompleted(event) {
    if (event.target.classList[1] == 'completed'){
        event.target.classList.remove('completed')
    }else{
        event.target.classList.add('completed');
    }
}

function clearTasks(){
    for (index = taskList.children.length -1; index >= 0; index -= 1){
        taskList.children[index].remove();
    }
}

function removeFinished(){
    for (index = completedTasks.length -1; index >= 0; index -= 1){
        completedTasks[index].remove();
    }
}