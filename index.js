'use strict';

const titleTimer = document.querySelector('h1');
const inputBlock = document.querySelector('.input');
const inputTitle = document.querySelector('#title-date');
const inputDate = document.querySelector('#date');
const beginBtn = document.querySelector('#btn');
const outputBlock = document.querySelector('.output');
const completeTimer = document.querySelector('.complete');
const resetBtn = document.querySelector('#btn-reset');

function startTimer() {
  if (!inputDate.value) {
    return alert('Введите дату для таймера!');
  }

  let dateTimer = inputDate.value
  titleTimer.textContent = inputTitle.value;

  inputBlock.classList.add('hide');
  beginBtn.classList.add('hide');

  outputBlock.classList.remove('hide');
  resetBtn.classList.remove('hide');
}

function resetTimer() {
  titleTimer.textContent = 'Создать новый таймер обратного отсчета';
  inputDate.value = '';
  
  inputBlock.classList.remove('hide');
  beginBtn.classList.remove('hide');

  outputBlock.classList.add('hide');
  resetBtn.classList.add('hide');
}

beginBtn.addEventListener('click', startTimer);

resetBtn.addEventListener('click', resetTimer);






/* 
1. Находим элементы html

let title;
let timeLabels;
let buttonStart;

2. При нажатии на кнопку "начать" , запускается таймер в блок с измененным заголовком, таймером и кнопкой сбросить 
3. Время будем считать по часам, минутам секундам в сутках от времени нажатия кнопки "Начать".

4. При не выбранной дате отсчета должна появляться ошибка , что дата не выбрана.

5. Кнопка "Начать" изменяется на "сбросить".

6. При нажатии на сбросить, возращаемся с исходному состоянию DOM.

7. Убрать стандартное поведения кнопок и при обновление страницы сохранять значения счетчика.

8. Когда таймер закончился, сообщение с поздравлением и оставляем кнопку сбросить.

*/