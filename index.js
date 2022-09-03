'use strict';

const titleTimer = document.querySelector('h1');
const inputBlock = document.querySelector('.input');
const inputTitle = document.querySelector('#title-date');
const inputDate = document.querySelector('#date');
const beginBtn = document.querySelector('#btn');
const outputBlock = document.querySelector('.output');
const completeTimer = document.querySelector('.complete');
const resetBtn = document.querySelector('#btn-reset');
const dateNumbers = document.querySelector('.numbers');

let timer;
// Минимальная дата выбора
inputDate.setAttribute('min', moment().format('YYYY-MM-DD hh:mm'));

import Timer from './timer.js';

// Сообщение таймера, когда таймер закончился
function messageComplete(date) {
  completeTimer.classList.remove('hide');
  completeTimer.textContent = `${inputTitle.value} завершился ${date.format('DD.MM.YYYY hh:mm:ss')}`;
}

// Скрытие стартого окна
function closeFirstWindow() {
  inputBlock.classList.add('hide');
  beginBtn.classList.add('hide');

  outputBlock.classList.remove('hide');
  resetBtn.classList.remove('hide');
}

// Скрытие окна с таймером
function closeTimerWindow() {
  inputBlock.classList.remove('hide');
  beginBtn.classList.remove('hide');

  outputBlock.classList.add('hide');
  resetBtn.classList.add('hide');
  completeTimer.classList.add('hide');
} 

function resetTimer() {
  titleTimer.textContent = 'Создать новый таймер обратного отсчета';
  inputDate.value = '';
  inputTitle.value = '';
  completeTimer.textContent = '';
  dateNumbers.textContent = '0:0:0:0';

  localStorage.removeItem('deadlineLocal');
  localStorage.removeItem('titleForTimer');

  timer.clearTimerInterval();

  closeTimerWindow();
}

function startTimer() {
  timer = new Timer(inputDate.value, dateNumbers, messageComplete);

  if (timer.init() === false) {
    return;
  }

  titleTimer.textContent = inputTitle.value;
  localStorage.setItem('deadlineLocal', inputDate.value);
  localStorage.setItem('titleForTimer', inputTitle.value);
  closeFirstWindow();
}

function getItemLocalStorage() {
  let deadlineLocal = localStorage.getItem('deadlineLocal');
  let inputTitleLocal = localStorage.getItem('titleForTimer');
  if (!deadlineLocal && !inputTitleLocal) {
    return;
  }

  timer = new Timer(deadlineLocal, dateNumbers, messageComplete)
  timer.init();
  titleTimer.textContent = inputTitleLocal;
  closeFirstWindow();
}

beginBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

getItemLocalStorage(); //Запись данных в локальное хранилище

