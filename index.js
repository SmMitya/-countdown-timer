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
    this.deadline;
    this.timerInterval;
    this.nowTime;
    this.days;
    this.hours;
    this.minutes;
    this.seconds;
  }

  get deadline() {
    return this._deadline;
  }

  set deadline(value) {
    if (isNaN(value)) {
      return alert('Введите дату для таймера!');
    }

    return this._deadline = value;
  }
  // Получаем дату до которой считаем
  getDeadline() {
    return this.deadline = moment(inputDate.value);
  }
  // Метод разницы дат
  diffTimer(value) {
    return this.deadline.diff(this.nowTime, value);
  }
  // Метод очистки таймера
  clearTimerInterval() {
    return clearInterval(this.timerInterval);
  }
  // Метод вывода даты отсчета на экран
  dateTimerNumbers() {
    return `${this.addZero(this.days)}:${this.addZero(this.hours)}:${this.addZero(this.minutes)}:${this.addZero(this.seconds)}`;
  }
  // Метод добавления нуля к числам
  addZero(value) {
    return value < 10 ? '0' + value : value;
  }
  
  countdownTimer() {
    this.nowTime = moment();

    if (this.diffTimer() <= 0) {
      completeTimer.classList.remove('hide');
      completeTimer.textContent = `${inputTitle.value} завершился ${this.deadline.format('DD.MM.YYYY hh:mm:ss')}`;
      this.clearTimerInterval();
      return;
    }
  
    this.days = this.diffTimer('days');
    this.hours = this.diffTimer('hours') % 24; 
    this.minutes = this.diffTimer('minutes') % 60; 
    this.seconds = this.diffTimer('seconds') % 60; 
  
    dateNumbers.textContent = this.dateTimerNumbers();
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
  closeTimerWindow();
}

function startTimer() {
  timer.getDeadline();

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

