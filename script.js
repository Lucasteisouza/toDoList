const inputText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const taskItemListed = document.getElementsByClassName('taskItem');
const clearTasksButton = document.getElementById('apaga-tudo');
const removeFinishedTasksButton = document.getElementById('remover-finalizados');
const completedTasks = document.getElementsByClassName('completed');
const saveButton = document.getElementById('salvar-tarefas');
const removeSingleButton = document.getElementById('remover-selecionado');
const savedListRestored = JSON.parse(localStorage.getItem('savedList'));
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');

function selectItem(e) {
  const sel = 'selected-item';
  if (e.target.id === sel) {
    e.target.id = '';
  } else {
    for (let index = 0; index < taskItemListed.length; index += 1) {
      taskItemListed[index].id = '';
    }
    e.target.id = sel;
  }
}

function taskCompleted(event) {
  if (event.target.classList[1] === 'completed') {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

if (savedListRestored != null) {
  for (let index = 0; index < savedListRestored.length; index += 1) {
    const taskItem = document.createElement('li');
    taskItem.className = savedListRestored[index].class;
    taskItem.addEventListener('click', selectItem);
    taskItem.addEventListener('dblclick', taskCompleted);
    taskItem.innerText = savedListRestored[index].texto;
    inputText.value = '';
    taskList.appendChild(taskItem);
  }
}

function addTask() {
  const taskItem = document.createElement('li');
  taskItem.className = 'taskItem';
  taskItem.addEventListener('click', selectItem);
  taskItem.addEventListener('dblclick', taskCompleted);
  taskItem.innerText = inputText.value;
  inputText.value = '';
  taskList.appendChild(taskItem);
}
addTaskButton.addEventListener('click', addTask);

function clearTasks() {
  for (let index = taskList.children.length - 1; index >= 0; index -= 1) {
    taskList.children[index].remove();
  }
}
clearTasksButton.addEventListener('click', clearTasks);

function removeFinished() {
  for (let index = completedTasks.length - 1; index >= 0; index -= 1) {
    completedTasks[index].remove();
  }
}
removeFinishedTasksButton.addEventListener('click', removeFinished);

function saveList() {
  const listObjArr = [];
  for (let index = 0; index < taskItemListed.length; index += 1) {
    const list = { texto: taskItemListed[index].innerText, class: taskItemListed[index].className };
    listObjArr.push(list);
  }
  const stringedObjArr = JSON.stringify(listObjArr);
  localStorage.setItem('savedList', stringedObjArr);
}
saveButton.addEventListener('click', saveList);

function removeSingleTask() {
  const selectedTask = document.getElementById('selected-item');
  if (selectedTask !== undefined) {
    selectedTask.remove();
  }
}
removeSingleButton.addEventListener('click', removeSingleTask);

function findIndex() {
  const selectedTask = document.querySelector('#selected-item');
  let indexOfSelected;
  for (let index = 0; index < taskItemListed.length; index += 1) {
    if (taskItemListed[index] === selectedTask) {
      indexOfSelected = index;
    }
  }
  return indexOfSelected;
}

function moveUp() {
  const indexOfSelected = findIndex();

  if (indexOfSelected > 0) {
    const auxTxt = taskItemListed[indexOfSelected].innerText;
    const auxClass = taskItemListed[indexOfSelected].className;
    // const auxId = taskItemListed[indexOfSelected].id;
    const indexMinus = indexOfSelected - 1;
    taskItemListed[indexOfSelected].innerText = taskItemListed[indexMinus].innerText;
    taskItemListed[indexOfSelected].className = taskItemListed[indexMinus].className;
    // taskItemListed[indexOfSelected].id = taskItemListed[indexMinus].id;
    taskItemListed[indexMinus].innerText = auxTxt;
    taskItemListed[indexMinus].className = auxClass;
    // taskItemListed[indexMinus].id = auxId;
  }
}

function moveDown() {
  const indexOfSelected = findIndex();
  if (indexOfSelected < taskItemListed.length - 1) {
    const auxTxt = taskItemListed[indexOfSelected].innerText;
    const auxClass = taskItemListed[indexOfSelected].className;
    const auxId = taskItemListed[indexOfSelected].id;
    const indexPlus = indexOfSelected + 1;
    taskItemListed[indexOfSelected].innerText = taskItemListed[indexPlus].innerText;
    taskItemListed[indexOfSelected].className = taskItemListed[indexPlus].className;
    taskItemListed[indexOfSelected].id = taskItemListed[indexPlus].id;
    taskItemListed[indexPlus].innerText = auxTxt;
    taskItemListed[indexPlus].className = auxClass;
    taskItemListed[indexPlus].id = auxId;
  }
}
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
