'use strict';
const n = prompt('Введите массив чисел через', '');
const arr = n.split(' ');
const count = arr.length;
const newArr = [];
for(let i = 0 ; i < count; i++) {
    newArr[i] = Number(arr[i]);
}

for (let i = 0; i < count - 1; i++) {
    for (let j = 0; j < count - i - 1; j++) {
        if (newArr[j] > newArr[j + 1]) {
            // меняем элементы местами
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
        }
    }
}

const min = newArr[0];
const max = newArr[newArr.length - 1];
let sum = 0;
for(let i = 0;i < newArr.length; i++) {
    sum += newArr[i];
}

alert('Максимуим в массиве: '+ max);
alert('Минимум в массиве: '+ min);
alert('Сумма: ' + sum);
alert('После сортировки: ' + newArr);