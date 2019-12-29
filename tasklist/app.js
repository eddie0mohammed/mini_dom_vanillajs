

//define ui vars

const form = document.getElementById('task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadAllEventListeners();


//load all event listeners 
function loadAllEventListeners(){

    //DOM load event
    window.addEventListener('DOMContentLoaded', getTasks);


    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    tasklist.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTask);

    //filter task
    filter.addEventListener('keyup', filterTask);

}
//get tasks
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(elem => {
        
         //create li element
         const li = document.createElement('li');
         //add class
         li.className = 'collection-item';
         //create text node and append to li
         li.appendChild(document.createTextNode(elem));
         //create new link element
         const link = document.createElement('a');
         //add class
         link.className = 'delete-item secondary-content';
         //add icon html
         link.innerHTML = '<i class="fas fa-trash"></i>';
         //append link to li
         li.appendChild(link);
 
         //append li to ul
         tasklist.appendChild(li);

    });
}

//add task
function addTask(e){
    e.preventDefault();

    if (taskInput.value == ''){
        alert("Enter a Task");

    }else{
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fas fa-trash"></i>';
        //append link to li
        li.appendChild(link);

        //append li to ul
        tasklist.appendChild(li);

      

        //persist to local storage
        storeTaskInLocalStorege(taskInput.value);

          //clear input
          taskInput.value = '';


    }
}

//persist to local storage
function storeTaskInLocalStorege(task){

    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//remove task
function removeTask(e){
    if (e.target.parentNode.classList.contains('delete-item')){
        const li = e.target.parentNode.parentNode;
        removePersist(li.textContent);
        // console.log(li.textContent);
        li.parentNode.removeChild(li);


    }

}

//remove from localStorage
function removePersist(text){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = tasks.filter(elem => {
        return elem !== text;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear Task
function clearTask(){
    // method1
    // tasklist.innerHTML = '';
    
    // method2
    while(tasklist.firstChild){
        tasklist.firstChild.parentNode.removeChild(tasklist.firstChild);
    }

    //clear task from localStorage
    localStorage.removeItem('tasks');
}

//filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(elem => {
        
        const item = elem.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1){
            elem.style.display = 'block';
        }else{
            elem.style.display = 'none';
        }
    })
    


    
}