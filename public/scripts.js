
const listContainer = document.querySelector('[data-todos]');
const tasksRemaining = document.querySelector('[data-tasks-remaining]');
const ALL_TODOS_API = 'http://localhost:5000/api/todos';
const newTodoForm = document.querySelector('.new-todo-form');
const deleteBtns = document.querySelector('.delete-todo');


newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  let task_name = document.querySelector('.task-input').value;
  fetch(ALL_TODOS_API, {
    method : "POST",
    headers : {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      task_name : task_name
    })
  })
  .then((res) => {
    if (!res.ok) {
      throw Error(`${res.status} : ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => {
    console.log(data);
    newTodoForm.reset();
    renderTodos();
  })
  .catch(err => {
    console.log(err);
  })
  // console.log(task_name);
})

listContainer.addEventListener('click', e => {
  if(e.target.dataset.id){
  let task_id = e.target.dataset.id;
  fetch(ALL_TODOS_API + '/' + task_id, {
    method: "DELETE"
  })
  .then((res) => {
    if (!res.ok) {
      throw Error(`${res.status} : ${res.statusText}`);
    }
    return res.text();
  })
  .then(msg => {
    console.log(msg);
    renderTodos();
  })
  .catch(err => {
    console.log(err);
  })
}else{
  if(e.target.tagName.toLowerCase() === 'input' ){
    let task_id = e.target.id;
    let new_status = !e.target.checked;
    fetch(ALL_TODOS_API + '/' + task_id, {
      method: "PUT",
      headers : {
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isPending : new_status
      })
    })
    .then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} : ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderTodos();
    })
    .catch(err => {
      console.log(err);
    })
  }
}

})



const handleErrors = res => {
    if(!res.ok){
             throw Error(`${res.status} : ${res.statusText}`);
         }
    return res.json();
  }
  const renderData = tasks => {
      tasks.forEach(function(task, index){
          let status;
          if(task.isPending){
              status = "unchecked";
          }else{
              status = "checked"
          }
          listContainer.innerHTML += 
          `<div class="task">
          <input 
            type="checkbox"
            ${status}
            id="${task._id}"
          />
          <label for="${task._id}" >
            <span class="custom-checkbox"></span>
            ${task.task_name}
          </label>
          <span class="delete-todo" data-id="${task._id}">x</span>
        </div>`
      })
      renderRemainingTasksNumber(tasks);      
}
function renderRemainingTasksNumber(tasks){
    let incompleteTasks = tasks.filter(task => {
        return task.isPending;
    });
    tasksRemaining.innerText = incompleteTasks.length;
}
function renderTodos(){
    clearContainer(listContainer);
    fetch(ALL_TODOS_API)
    .then(handleErrors)
    .then(renderData)
    .catch(err => {
      console.error(err);
    })
}



function clearContainer(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

renderTodos();