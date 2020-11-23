'use strict'

function init() {
  setTime()
}

//1초 간격으로 날짜와 시간 갱신
function setTime() {
  const date = new Date(),
    curYear = date.getFullYear(),
    curMonth = date.getMonth(),
    curDate = date.getDate(),
    curHour = date.getHours(),
    curMin = date.getMinutes(),
    curSeconds = date.getSeconds()

  const jsDate = document.querySelector('.js-date'),
    jsTime = document.querySelector('.js-time')
  const today = `${curYear}-${curMonth}-${curDate}`,
    time = `${curHour} : ${curMin} : ${curSeconds}`

  jsDate.innerHTML = today
  jsTime.innerHTML = time
  setInterval(setTime, 1000)
}

init()
