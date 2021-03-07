const problemElem = document.querySelector('.problem')
const form = document.querySelector('.form')
const field = document.querySelector('.field')
const points = document.querySelector('.points')
const mistakesAllowed = document.querySelector('.mistakes')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('.end-message')
const button = document.querySelector('.close-modal')

let state = {
   score: 0,
   wrongAnswers: 0,
}

function updateProblem() {
   state.currentProblem = problemGen()

   problemElem.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
   field.value = ''
   field.focus()
}
updateProblem()

function numberGen(n) {
   return Math.floor(Math.random() * (n + 1))
}

function problemGen() {
   return {
      numberOne: numberGen(20),
      numberTwo: numberGen(20),
      operator: ['+', '-', 'x',][numberGen(2)]
   }
}

form.addEventListener('submit', answerToQuestion)

function answerToQuestion(e) {
   e.preventDefault()

   const p = state.currentProblem
   let correctAnswer

   if (p.operator == '+') correctAnswer = p.numberOne + p.numberTwo
   else if (p.operator == '-') correctAnswer = p.numberOne - p.numberTwo
   else if (p.operator == 'x') correctAnswer = p.numberOne * p.numberTwo

   if (parseInt(field.value, 10) === correctAnswer) {
      state.score++
      points.textContent = 10 - state.score
      updateProblem()
      renderProgressBar()
   }
   else {
      state.wrongAnswers++
      mistakesAllowed.textContent = 2 - state.wrongAnswers
      problemElem.classList.add('animate-wrong')
      setTimeout(() => problemElem.classList.remove('animate-wrong'), 451)
   }
   checkLogic()
}

function checkLogic() {
   // Win Condition
   if (state.score === 10) {
      endMessage.textContent = 'You Won!'
      document.body.classList.add('modal-is-open')
      setTimeout(() => button.focus(), 33)
   }

   // Lose Condition
   if (state.wrongAnswers === 3) {
      endMessage.textContent = 'You Lost!'
      document.body.classList.add('modal-is-open')
      setTimeout(() => button.focus(), 33)
   }
}

button.addEventListener('click', resetGame)

function resetGame() {
   document.body.classList.remove('modal-is-open')
   updateProblem()
   state.score = 0
   state.wrongAnswers = 0
   points.textContent = 10
   mistakesAllowed.textContent = 2
   renderProgressBar()
}

function renderProgressBar() {
   progressBar.style.transform = `scaleX(${state.score / 10})`
}