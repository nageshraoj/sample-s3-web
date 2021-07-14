const btn = document.querySelector('.btn')
const screens = document.querySelectorAll('.screen')
const inserts = document.querySelectorAll('.choose-insert')
const message = document.getElementById('message')
const score = document.getElementById('score')
const time = document.getElementById('time')
const playagain = document.querySelector('.play-again-btn')
let insert = 'fly'
let points = 0
let level = 1
let totalInserts = 0
let startTime = new Date()
let InsertInterval = setInterval(() => {
  showRandomInsert()
}, 1000 / level)

function resetPlay() {
  points = 0
  level = 1
  totalInserts = 0
  startTime = new Date()
}

btn.addEventListener('click', () => {
  screens[0].classList.remove('active')
  screens[1].classList.add('active')
})

inserts.forEach((eachinsert) => {
  eachinsert.addEventListener('click', (e) => {
    insert = e.target.alt
    insertImags = document.querySelectorAll('.insertImg')
    insertImags.forEach((img) => img.remove())
    resetPlay()
    message.style.opacity = 0
    screens[1].classList.remove('active')
    screens[2].classList.add('active')
    InsertInterval = setInterval(() => {
      showRandomInsert()
    }, 1000 / level)
  })
})

playagain.addEventListener('click', () => {
  message.style.opacity = 0
  screens[2].classList.remove('active')
  screens[0].classList.add('active')
})
function getRandomLocation(size) {
  return Math.floor(Math.random() * size + 100)
}

function showRandomInsert() {
  //   for (let index = 0; index < level; index++) {
  if (totalInserts >= 10) {
    clearInterval(InsertInterval)
    message.style.opacity = 1
    return
  } else {
    message.style.opacity = 0
  }
  diff = ((Date.now() - startTime) / 1000) | 0
  minutes = (diff / 60) | 0
  seconds = diff % 60 | 0
  time.innerText = `Time : ${minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`

  const insertImg = document.createElement('img')
  insertImg.src = `./img/${insert}.png`
  insertImg.alt = insert
  insertImg.classList.add('insertImg')
  insertImg.style.top = `${getRandomLocation(screen.height - 300)}px`
  insertImg.style.left = `${getRandomLocation(screen.width - 200)}px`
  totalInserts++
  insertImg.addEventListener('click', () => {
    insertImg.remove()
    points++
    totalInserts--
    score.innerText = `Score : ${points}`
  })
  if (!(seconds % 5)) {
    level++
    console.log(level, seconds)
  }
  console.log(level, totalInserts)

  screens[2].appendChild(insertImg)
  //   }
}
