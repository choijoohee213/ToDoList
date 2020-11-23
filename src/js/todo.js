'use strict'

const todoForm = document.querySelector('.js-todoForm'),
  todoInput = todoForm.querySelector('input'),
  todoList = document.querySelector('.todoList')

let todoArray = []

function init() {
  loadToDo()
  todoForm.addEventListener('submit', saveToDo)
}

//* 사용자 할일 추가 *//
function saveToDo(event) {
  event.preventDefault()
  paintToDo(todoInput.value, false)
  todoInput.value = ''
}

function paintToDo(text, completed) {
  const li = document.createElement('li'),
    deleteBtn = document.createElement('button'),
    completeBtn = document.createElement('button'),
    span = document.createElement('span'),
    todoId = todoArray.length + 1

  completeBtn.innerHTML = '💚'
  completeBtn.addEventListener('click', completeToDo)
  deleteBtn.innerHTML = '❌'
  deleteBtn.addEventListener('click', deleteToDo)
  span.innerHTML = text

  li.appendChild(completeBtn)
  li.appendChild(deleteBtn)
  li.appendChild(span)
  li.id = todoId
  todoList.appendChild(li)

  const todoObj = {
    text: text,
    id: todoId,
    complete: completed,
  }

  todoArray.push(todoObj)
  saveToDos()
  if (completed) completeBtn.click()
}

function saveToDos() {
  localStorage.setItem('TODO_LIST', JSON.stringify(todoArray))
}

function loadToDo() {
  const userToDo = localStorage.getItem('TODO_LIST')
  if (userToDo !== null) {
    const parsedToDo = JSON.parse(userToDo)
    parsedToDo.forEach((toDo) => {
      paintToDo(toDo.text, toDo.complete)
    })
  }
}

//* 사용자 할 일 삭제 *//
function deleteToDo(event) {
  const parent = event.target.parentNode
  todoList.removeChild(parent)

  const newArray = todoArray.filter((todo) => todo.id != parent.id)
  todoArray = newArray
  saveToDos()
}

//* 사용자 할 일 완료 *//
function completeToDo(event) {
  const parent = event.target.parentNode
  todoArray[todoArray.findIndex((todo) => todo.id == parent.id)].complete = true
  paintComplete(parent)
  saveToDos()
}

function paintComplete(parent) {
  const text = parent.querySelector('span')
  text.style.textDecorationLine = 'line-through'
}

init()
