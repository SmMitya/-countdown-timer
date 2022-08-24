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

class Timer {
  constructor() {
    this.deadline = null;
    this.timerInterval = null;
    this.activeTimer = false;
  }

  // Получаем дату до которой считаем
  setDeadline() {
    return this.deadline = moment(inputDate.value);
  }
  // Состояние таймера 
  conditionTimer() {
    if (isNaN(this.deadline)) {
      this.deadline = null;
      alert('Введите дату для таймера!');
      return this.activeTimer;
    }

    return this.activeTimer = true;
  }
  // Метод разницы дат
  diffTimer(value) {
    const nowTime = moment();
    return this.deadline.diff(nowTime, value);
  }
  // Метод очистки таймера
  clearTimerInterval() {
    return clearInterval(this.timerInterval);
  }
  // Метод вывода даты отсчета на экран
  dateTimerNumbers(days, hours, minutes, seconds) {
    return `${this.addZero(days)}:${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
  }
  // Метод добавления нуля к числам
  addZero(value) {
    return value < 10 ? '0' + value : value;
  }
  
  countdownTimer() {
    if (this.diffTimer() <= 0) {
      completeTimer.classList.remove('hide');
      completeTimer.textContent = `${inputTitle.value} завершился ${this.deadline.format('DD.MM.YYYY hh:mm:ss')}`;
      this.clearTimerInterval();
      return;
    }
  
    const days = this.diffTimer('days');
    const hours = this.diffTimer('hours') % 24; 
    const minutes = this.diffTimer('minutes') % 60; 
    const seconds = this.diffTimer('seconds') % 60; 
  
    dateNumbers.textContent = this.dateTimerNumbers(days, hours, minutes, seconds);
  }
  // Метод через сколько секунд интервал счета
  setTimerInterval() {
    this.timerInterval = setInterval(this.countdownTimer.bind(this), 1000);
  }
}

let timer = new Timer();

// Скрытие стартого окна
function closeFirstWindow() {
  inputBlock.classList.add('hide');
  beginBtn.classList.add('hide');

  outputBlock.classList.remove('hide');
  resetBtn.classList.remove('hide');

  timer.countdownTimer();
  timer.setTimerInterval();
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
  localStorage.removeItem('deadlineLocal');
  localStorage.removeItem('titleForTimer');

  timer.clearTimerInterval();
  timer.deadline = null;
  timer.activeTimer = false;

  closeTimerWindow();
}

function startTimer() {
  timer.setDeadline();
  timer.conditionTimer();

  if (timer.activeTimer === false) {
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

  timer.deadline = moment(deadlineLocal);
  titleTimer.textContent = inputTitleLocal;
  closeFirstWindow();
}

beginBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

getItemLocalStorage(); //Запись данных в локальное хранилище

