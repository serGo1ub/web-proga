'use strict';

const input = document.getElementById('text');
const result = document.getElementById('result');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    const arr = input.value.split(' ');
    const newArr = [];
    for(let i = 0 ; i < arr.length; i++) {
        newArr[i] = Number(arr[i]);
    }
    result.textContent = ' После сортировки: ' + sort(newArr);
    result.textContent += ' Сумма: '  + sum(newArr);
    result.textContent += ' Максимальный:' + max(newArr);
    result.textContent += ' Минимальный: ' + min(newArr);

    input.value = '';
});



function max(arr) {
    return arr[arr.length - 1];
}

function min(arr) {
    return arr[0];
}

function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function sum(arr) {
    let sum = 0;
    for(let i = 0;i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}