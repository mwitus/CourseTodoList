let todoInput // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadan / konieczności wpisania tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadań, tagi UL
let newTodos // nowo dodany LI, nowe zadanie

let popup // popup
let popupInfo // tekst w popupie, jak się doda pusty tekst
let todoToEdit // edytowany Todo
let popupInput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist')
    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', check)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

/* tworzenie nowych zdarzeń "todosów" (jak ma to wyglądać)
    1. tworzy nowy element (li)
    2. dodawać nowy element do ul listy
    3. funkcja odpalana na click w przycisk ADD
    4. przychwytuje treść z inputa i umieszcza go w nowo utworzonym LI
    5. funkcja nie doda do listy pustego 'todosa'
*/

const addNewTask = () => {
    if(todoInput.value !== '') {
        newTodos = document.createElement('li')
        newTodos.innerHTML = todoInput.value
        
        createToolsArea()
        ulList.appendChild(newTodos)
        
        todoInput.value = ''
        errorInfo.innerHTML = ''
    } else {
        errorInfo.innerHTML = 'Wpisz treść zadania!'
    }
}

const createToolsArea = () => {
    const tools = document.createElement('div')
    tools.classList.add('tools')
    newTodos.appendChild(tools)

    const btnComplete = document.createElement('button')
    btnComplete.classList.add('complete')
    btnComplete.innerHTML = '<i class="fas fa-check"></i>'

    const btnEdit = document.createElement('button')
    btnEdit.classList.add('edit')
    btnEdit.innerHTML = 'EDIT'

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('delete')
    btnDelete.innerHTML = '<i class="fas fa-times"></i>'


    tools.appendChild(btnComplete)
    tools.appendChild(btnEdit)
    tools.appendChild(btnDelete)
}

const check = e => {
    if(e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed')
    } else if(e.target.matches('.edit')) {
        editTodo(e)
    } else if(e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex'
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść!'
    }
}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter') {
        addNewTask()
    }
}

document.addEventListener('DOMContentLoaded', main)






