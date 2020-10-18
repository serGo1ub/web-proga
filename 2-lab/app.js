const form = document.querySelector('#form');
const alert = document.querySelector('.alert');
const closeBtn = document.querySelector('.closebtn');

const Module = (function () {

    const arr = [];
    let table;

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
            `;
            tr.insertAdjacentHTML('beforeend', basicHTML);
            table.appendChild(tr);
        }
        addNewStudent();
        sumAverage();
    }


    function addNewStudent() {
        const { name, surname, age, average } = arr[arr.length - 1];
                const tr = document.createElement('tr');
                const html = `
                        <td>${ name }</td>
                        <td>${ surname }</td>
                        <td>${ age }</td>
                        <td>${ average }</td>
                `;
                tr.insertAdjacentHTML('beforeend', html)
                table.appendChild(tr);
            
        document.body.appendChild(table);
    }

    function sumAverage() {
        
        const el = document.querySelector('table');
        const resultEl = document.querySelector('#result');
        let sum = 0;
        Array.from(el.children).forEach((child, index) => {
            if (index !== 0) {
                sum += +child.lastElementChild.textContent;
            }
        });

        resultEl.textContent = +(sum / arr.length).toFixed(2);
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