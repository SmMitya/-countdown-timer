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
let deadline;
let deadlineLocal;
let inputTitleLocal;
let timerId = null;

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
  closeTimerWindow();
}

function getItemLocalStorage() {
  if (!localStorage.getItem('deadlineLocal') && !localStorage.getItem('titleForTimer')) {
    return;
  }

  deadlineLocal = moment(localStorage.getItem('deadlineLocal'));
  inputTitleLocal = localStorage.getItem('titleForTimer');
}

function startTimer() {
  deadline = moment(inputDate.value);
  localStorage.setItem('deadlineLocal', inputDate.value);

  if (isNaN(deadline)) {
    return alert('Введите дату для таймера!');
  }

  localStorage.setItem('titleForTimer', inputTitle.value);
  getItemLocalStorage();
  titleTimer.textContent = inputTitleLocal;
  closeFirstWindow();
  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);
}

function countdownTimer() {
  const nowTime = moment();

  if (deadlineLocal.diff(nowTime) <= 0) {
    completeTimer.classList.remove('hide');
    completeTimer.textContent = `${inputTitleLocal} завершился ${deadlineLocal.format('DD.MM.YYYY hh:mm:ss')}`;
    clearInterval(timerId);
    return;
  }

  const days = deadlineLocal.diff(nowTime, 'days');
  const hours = deadlineLocal.diff(nowTime, 'hours') % 24; 
  const minutes = deadlineLocal.diff(nowTime, 'minutes') % 60; 
  const seconds = deadlineLocal.diff(nowTime, 'seconds') % 60; 

  dateNumbers.textContent = `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
}

// Добавление 0 в таймере если число < 10
function addZero(value) {
  return value < 10 ? '0' + value : value;
}

beginBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

