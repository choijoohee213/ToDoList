'use strict'

const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-greeting'),
  greetingP = greeting.querySelector('.greeting')

function init() {
  loadUserName()
  form.addEventListener('submit', saveUserName)
}

//* 사용자 이름 *//
function loadUserName() {
  const userName = localStorage.getItem('USER_NAME')
  if (userName === null) {
    form.classList.remove('hide')
    greeting.classList.add('hide')
  } else {
    form.classList.add('hide')
    greeting.classList.remove('hide')
    greetingP.innerHTML = `<span class="userNameText">${userName}</span>님,<br>오늘 하루도 화이팅하세요 😊!`
  }
}

function saveUserName(event) {
  event.preventDefault()
  localStorage.setItem('USER_NAME', input.value)
  loadUserName()
}

init()
