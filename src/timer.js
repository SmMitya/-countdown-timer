
export default class Timer {
  constructor(date, dateNumbers, messageComplete) {
    this.deadline = moment(date);
    this.dateNumbers = dateNumbers;
    this.messageComplete = messageComplete;
    this.timerInterval = null;
  }
  // Создание таймера 
  init() {
    this.deadline;

    if (isNaN(this.deadline)) {
      alert('Введите дату для таймера!');
      return false;
    }

    this.countdownTimer();
    this.setTimerInterval();

    return true;
  }
  //  Запускаем таймер
  countdownTimer() {
    if (this.diffTimer() <= 0) {
      this.messageComplete(this.deadline);
      this.clearTimerInterval();
      return;
    }
    
    this.showCountdown();
  }
  // Вывод таймера на экран
  showCountdown() {
    const days = this.diffTimer('days');
    const hours = this.diffTimer('hours') % 24; 
    const minutes = this.diffTimer('minutes') % 60; 
    const seconds = this.diffTimer('seconds') % 60; 
  
    this.dateNumbers.textContent = this.dateTimerNumbers(days, hours, minutes, seconds);
  }
  // Метод через сколько секунд интервал счета
  setTimerInterval() {
    this.timerInterval = setInterval(this.countdownTimer.bind(this), 1000);
  }
  // Метод разницы дат
  diffTimer(value) {
    const nowTime = moment();
    return this.deadline.diff(nowTime, value);
  }
  // Метод очистки таймера
  clearTimerInterval() {
    clearInterval(this.timerInterval);
  }
  // Метод вывода даты отсчета на экран
  dateTimerNumbers(days, hours, minutes, seconds) {
    return `${this.addZero(days)}:${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
  }
  // Метод добавления нуля к числам
  addZero(value) {
    return value < 10 ? '0' + value : value;
  }
}