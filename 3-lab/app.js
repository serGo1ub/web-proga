const form = document.querySelector('#form');
const alert = document.querySelector('.alert');
const closeBtn = document.querySelector('.closebtn');
const button = document.querySelector('[disabled]');
const addStudentBtn = document.querySelector('[type="submit"]');

const Module = (function () {

    const arr = [];
    let table;
    let currentItem;

    function CreateStudent(name, surname, age, average) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.average = average;
    }

    function create(name, surname, age, average) {
        document.querySelector('.alert').style.display = 'none';
        const obj = new CreateStudent(name, surname, age, average)
        arr.push(obj);
        if (arr.length === 1) {
            table = document.createElement('table');
            const tr = document.createElement('tr');
            const basicHTML = `
                <td>Name</td>
                <td>Surname</td>
                <td>Age</td>
                <td>Average</td>
                <td>Delete Student</td>
                <td>Edit Student</td>
            `;
            tr.insertAdjacentHTML('beforeend', basicHTML);
            table.appendChild(tr);
        }
        addNewStudent();
        sumAverage();
    }


    function addNewStudent() {
            const obj = arr[arr.length - 1];
                const tr = document.createElement('tr');
                for(let key in obj) {
                    const td = document.createElement('td');
                    td.textContent = obj[key];
                    tr.appendChild(td);
                }
                const deleteBtn = document.createElement('td');
                deleteBtn.textContent = 'Delete';
                tr.appendChild(deleteBtn);
                const configBtn = document.createElement('td');
                configBtn.textContent = 'Edit';
                tr.appendChild(configBtn);
                table.appendChild(tr);
            
            document.body.appendChild(table);
    }

    function sumAverage() {
        const el = document.querySelector('table');
        el.addEventListener('click', deleteStudent);
        el.addEventListener('click', configStudent);
        const resultEl = document.querySelector('#result');
        let sum = 0;
        arr.forEach(item => {
            sum += +item.average;
        });
        resultEl.textContent = +(sum / arr.length).toFixed(2);
    }

    function findStudent() {
        let foundIndex;
        [...table.children].forEach((item, index) => {
            if (item === currentItem) {
                foundIndex = index;
            }
        })
        
        return foundIndex;
    }

    function editStudent() {
        const inputs = form.querySelectorAll('input');
        const currentIndex = findStudent();
        Object.keys(arr[currentIndex - 1]).forEach((item, index) => {
            arr[currentIndex - 1][item] = inputs[index].value;
            currentItem.children[index].textContent = inputs[index].value;
        });
        sumAverage();
        button.disabled = true;
        addStudentBtn.disabled = false;
        form.reset();
    }

    function configStudent(event) {
        if (event.target.textContent === 'Edit' && event.target.tagName === 'TD') {
            button.addEventListener('click', editStudent);
            button.disabled = false;
            addStudentBtn.disabled = true;
            currentItem = event.target.parentElement;
            const inputs = form.querySelectorAll('input');
            inputs.forEach((input, index) => {
                input.value = event.target.parentElement.children[index].textContent;
            })
        } else {
            button.disabled = true;
            form.reset();
        }
    }

    function deleteStudent(event) {
        if (event.target.closest('tr') && event.target.textContent === 'Delete') {
            const parentElement = event.target.closest('tr');
            [...table.children].forEach((child, index) => {
                if (child === parentElement) {
                    arr.splice(index - 1, 1);
                    parentElement.remove();
                    addStudentBtn.disabled = false;
                }
            })
        }
        if (table.children.length === 1) {
            table.remove();
            const resultEl = document.querySelector('#result');
            resultEl.textContent = 0;
        }
    }

    return {
        create
    };

})();



form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.name.value.trim();
    const surname = form.surname.value.trim();
    const age = form.age.value.trim();
    const average = form.average.value.trim();

    if (!name || !surname || !age || !average) {
        alert.style.display = 'block';
        console.log('input value');
        return;
    }

    Module.create(name, surname, age, average);

    form.reset();
});


closeBtn.addEventListener('click', () => {
    alert.style.display = 'none';
});

