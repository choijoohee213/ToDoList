'use strict'

function init() {
  setBgImage()
}

//배경이미지 랜덤 설정
function setBgImage() {
  const randomIndex = Math.floor(Math.random() * 6 + 1)
  let image = new Image()
  image.src = `src/img/${randomIndex}.jpg`
  image.classList.add('bgImage')
  document.body.prepend(image)
}

init()
