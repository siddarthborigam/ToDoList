var TodoListApp = (function(){

    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    console.log('Working');
    function addTaskTODOM(task){
        
        const li = document.createElement("li");
        li.innerHTML = 
            `
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''}
            class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="images/delete.webp" class="delete"data-id="${task.id}" />
            `
        taskList.append(li)
        
    }
    
    function renderList () {
        console.log(tasks)
        taskList.innerHTML = ''
        for (let i = 0; i <tasks.length; i++){
            addTaskTODOM(tasks[i])
    
        }
        tasksCounter.innerHTML = tasks.length;
    }
    
    function markTaskAsComplete (taskId) {
        // console.log("MTC")
        for (task of tasks){
            if (task.id == taskId){
                task.done = true;
                showNotification(task.text + " task has compled!");
                return
            }
    
    
            // console.log(task.id)
        }
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
        
            if (task.id == taskId){
                showNotification(task.text + " task deleted Successful!")
            }
            return task.id != taskId;
    
        })
        // console.log(newTasks)
        tasks = newTasks;
        markTaskAsComplete (taskId)
        renderList ()
        
    }
    
    function addTask (task) {
        // console.log("Text in add task " + task);
        tasks.push(task)
        // console.log(tasks)
        renderList ()
        markTaskAsComplete()
    }
    
    function showNotification(text) {
        alert(text)
    }
    
    
    function handleInputKeyPress(e){
        if (e.key == 'Enter'){
            //console.log("Entere pressed")
            const text = e.target.value
            // console.log(text)
            if (!text) {
                showNotification("Add Task can not be empty!")
                return;
            }
            
            
            const task = {
                text : text,
                id: Date.now().toString(),
                // id: Date.now()
                done: false,
    
            }
            e.target.value = ""
            addTask(task)
            showNotification(task.text + " task added Successful!")
            
        }
        
    }
    
    function handleClickEvent(e){
        const target = e.target;
        
        if (target.className == "delete"){
            console.log(target.id);
            const taskId = target.dataset.id;
            console.log(taskId)
            deleteTask(taskId)
            return
    
        }else if (target.className == "custom-checkbox"){
            console.log(target);
            const taskId = target.id;
            markTaskAsComplete(taskId)
            return
        }
    }
    
    function InitializeApp(){
        addTaskInput.addEventListener("keyup",handleInputKeyPress);
        document.addEventListener("click",handleClickEvent);
    }
    InitializeApp()
    return {
        initialize: InitializeApp,

    }



})()

