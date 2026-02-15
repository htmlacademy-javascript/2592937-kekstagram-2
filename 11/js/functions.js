const checkStringLength = (str, maxLength) => str.length <= maxLength;

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

function extractNumber(str) {
  const string = str.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const digit = parseInt(char, 10);
    if (!Number.isNaN(digit)) {
      result += char;
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
}

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));

console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));

const isMeetingInWorkHours = (workStart, workEnd, meetingStart, duration) => {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    return Number(hours) * 60 + Number(minutes);
  };
  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

console.log(isMeetingInWorkHours('08:00', '17:30', '14:00', 90));
console.log(isMeetingInWorkHours('8:0', '10:0', '8:0', 120));
console.log(isMeetingInWorkHours('08:00', '14:30', '14:00', 90));
console.log(isMeetingInWorkHours('14:00', '17:30', '08:0', 90));
console.log(isMeetingInWorkHours('8:00', '17:30', '08:00', 900));
