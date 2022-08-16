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
let timerId = null;

// Скрытие стартого окна
function closeFirstWindow() {
  inputBlock.classList.add('hide');
  beginBtn.classList.add('hide');

  outputBlock.classList.remove('hide');
  resetBtn.classList.remove('hide');

  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);
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
  localStorage.clear();
  closeTimerWindow();
}

function startTimer() {
  deadline = moment(inputDate.value);
  localStorage.setItem('deadlineLocal', inputDate.value);

  if (isNaN(deadline)) {
    return alert('Введите дату для таймера!');
  }

  titleTimer.textContent = inputTitle.value;
  localStorage.setItem('titleForTimer', inputTitle.value);
  closeFirstWindow();
}

function countdownTimer() {
  const nowTime = moment();

  if (deadline.diff(nowTime) <= 0) {
    completeTimer.classList.remove('hide');
    completeTimer.textContent = `${inputTitle.value} завершился ${deadline.format('DD.MM.YYYY hh:mm:ss')}`;
    clearInterval(timerId);
    return;
  }

  const days = deadline.diff(nowTime, 'days');
  const hours = deadline.diff(nowTime, 'hours') % 24; 
  const minutes = deadline.diff(nowTime, 'minutes') % 60; 
  const seconds = deadline.diff(nowTime, 'seconds') % 60; 

  dateNumbers.textContent = `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
}

// Добавление 0 в таймере если число < 10
function addZero(value) {
  return value < 10 ? '0' + value : value;
}

function getItemLocalStorage() {
  let deadlineLocal = localStorage.getItem('deadlineLocal');
  let inputTitleLocal = localStorage.getItem('titleForTimer');
  if (!deadlineLocal && !inputTitleLocal) {
    return;
  }

  deadline = moment(localStorage.getItem('deadlineLocal'));
  titleTimer.textContent = localStorage.getItem('titleForTimer');
  closeFirstWindow();
}

beginBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

getItemLocalStorage(); //Запись данных в локальное хранилище

