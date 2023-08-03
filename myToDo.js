//id and class select--------
const todoForm=document.querySelector(".todo-form");  //form selected 
const todoInput=document.querySelector("#input-todo"); //input feild selected 
const addBtn=document.querySelector("#add-btn"); //button select 
const todoList=document.getElementById("lists"); //unorder list select 
const megShow=document.querySelector("#message");  //paragraph tag select 

//todo create 
const createTodo=(todoId,todoValue)=>{
    const todoElements=document.createElement("li")
    todoElements.id=todoId;
    todoElements.classList.add("list-style"); //css add 
    todoElements.innerHTML=`<span>${todoValue}</span>
    <span><button class="btn" id="dltbtn"><i class="fa fa-trash"></i></button></span>`;
    todoList.appendChild(todoElements); //some problem show the console

    //delete todo
    const deleteButton=todoElements.querySelector("#dltbtn"); //select delete button from todo elements 
    deleteButton.addEventListener("click",deleteTodo); //event listener system click and function deleteTodo();
};
//delete todo
const deleteTodo=(event)=>{
    const selectTodo=event.target.parentElement.parentElement.parentElement;
    todoList.removeChild(selectTodo); //todo deleted 
    showMessage("Todo Deleted","delete");
    let Todos=getTodoFromLocalStorage();
    Todos=Todos.filter((todo)=>todo.todoId!=selectTodo.id);
    localStorage.setItem("myTodos",JSON.stringify(Todos));
};

//show message
const showMessage=(text,status)=>{
    megShow.textContent=text;
    megShow.classList.add(`todo-${status}`); //css add 
    setTimeout(()=>{
        megShow.textContent=" ";
        megShow.classList.remove(`todo-${status}`);
    },1000)
};

//addTodo function create----------
const addTodo=(event)=>{
    event.preventDefault();
    let todoValue = todoInput.value;  //input feild value assign todoValue 

    //unique id generate
    const todoId=Date.now().toString();
    createTodo(todoId,todoValue); //todo function create
    showMessage("ToDo is Added","success");  

    //add todo in localStorage
const todos= getTodoFromLocalStorage();
todos.push({todoId,todoValue});
localStorage.setItem("myTodos",JSON.stringify(todos));
todoInput.value=" ";
};
//get todo from local storage or empty array provide 
const getTodoFromLocalStorage=()=>{
    return localStorage.getItem("myTodos")?JSON.parse(localStorage.getItem("myTodos")):[];
};

//load todos
const loadTodos=()=>{
    const todos1=getTodoFromLocalStorage();
    todos1.map((todo1)=>createTodo(todo1.todoId,todo1.todoValue));
};
//adding listener----------
todoForm.addEventListener("submit", addTodo); //event system submit and fucntion addTodo()
//adding window listener
window.addEventListener("DOMContentLoaded",loadTodos); //window refresh method "DOMContentLoaded"
