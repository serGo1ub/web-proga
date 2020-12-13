$( document ).ready(function() {

const Module = (function () {

    const arr = [];
    let table;
    let currentItem;
    let flag = true;

    function CreateStudent(name, surname, age, average) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.average = average;
    }

    function create(name, surname, age, average) {
        $('.alert').css('display', 'none');
        const obj = new CreateStudent(name, surname, age, average)
        arr.push(obj);
        if (arr.length === 1) {
            table = $('<table></table>');
            const tr = $('<tr></tr>');
            const name = $('<td>Name</td>');
            tr.append(name);
            const surname = $('<td>Surname</td>');
            tr.append(surname);
            const age = $('<td>Age</td>');
            tr.append(age);
            const average = $('<td>Average</td>');
            tr.append(average);
            const deleteStudent = $('<td>Delete Student</td>');
            tr.append(deleteStudent);
            const editStudent = $('<td>Edit Student</td>');
            tr.append(editStudent);
            table.append(tr);
        }
        addNewStudent();
        sumAverage();
    }


    function addNewStudent() {
            const obj = arr[arr.length - 1];
                const tr = $('<tr></tr>');
                $.each(obj, function(key, value) {
                    const td = $('<td></td>')
                    td.text(obj[key]);
                    tr.append(td);
                })
                const deleteBtn = $('<td></td>');
                deleteBtn.text('Delete');
                tr.append(deleteBtn);
                const configBtn = $('<td></td>');
                configBtn.text('Edit');
                tr.append(configBtn);
                table.append(tr);
            
            $('body').append(table);
    }

    function sumAverage() {
        if (flag) {
            $('table').click(deleteStudent);
            $('table').click(configStudent);
            flag = false;
        }
        let sum = 0;
        $.each(arr, function(index, item) {
            sum += +item.average;
        });
        $('#result').text(Math.floor((sum / arr.length) * 10)/ 10);
    }

    function findStudent() {
        let foundIndex;
        $.each($('tbody').children().toArray(), function(index, item){
            if (item === currentItem[0]) {
                foundIndex = index;
            }
        })

        return foundIndex;
    }

    function editStudent() {
        const inputs = $('form input');
        const currentIndex = findStudent();
        $.each(Object.keys(arr[currentIndex - 1]), function(index, item) {
            arr[currentIndex - 1][item] = $(inputs[index]).val();
            $(currentItem.children()[index]).text($(inputs[index]).val());
        });
        sumAverage();
        $('#endEditBtn').attr('disabled', true);
        $('[type="submit"]').attr('disabled', false);
        $('#form').trigger('reset');
    }

    function configStudent(event) {
        const el = $(event.target);
        if (el.text() === 'Edit' && el.closest('tr')) {
            $('#endEditBtn').click(editStudent);
            $('#endEditBtn').attr('disabled', false);
            $('[type="submit"]').attr('disabled', true);
            currentItem = el.parent();
            $('form input').each(function(index, input) {
             $(input).val($(el.parent().children()[index]).text());
            })
        } else {
            $('#endEditBtn').attr('disabled', true);
            $('#form').trigger('reset');
        }
    }

    function deleteStudent(event) {
        const el = $(event.target);
        if (el.closest('tr') && el.text() === 'Delete') {
            const parentElement = el.closest('tr')[0];
            $('tbody').children().each(function(index, child) {
                if (child === parentElement) {
                    arr.splice(index - 1, 1);
                    parentElement.remove();     
                    $('[type="submit"]').attr('disabled', false);
                    sumAverage();
                }
            })
        }
        if ($('tbody').children().length === 1) {
            flag = true;
            $('table').remove();
            const resultEl = $('#result');
            resultEl.text(0);
        }
    }

    function httpRequest(type, url){
        return $.ajax({
            url,
            type,
            datatype: 'json'
        });
    }

    return {
        create,
        httpRequest
    };

})();

$('#getStudents').click(function() {
    Module.httpRequest('GET', 'https://reqres.in/api/users?page=1')
    .done(function(data) {
        console.log(data);
        students = data.data.map(item => ({
            name: item.first_name,
            surname: item.last_name,
            average: +(item.id + Math.random()).toFixed(1),
            age: +(item.id * Math.random()*10 + 1).toFixed(0)
        }));

        $.each(students, function(index, { name, surname, age, average}) {
            Module.create(name, surname, age, average);
        });

        $('#getStudents').attr('disabled', true);
    })
    .fail(function(err){
        console.log(err)
    })
});

$('#form').submit(function(event) {
    event.preventDefault();
    const name = $('[name="name"]').val().trim(); 
    const surname = $('[name="surname"]').val().trim();
    const age = $('[name="age"]').val().trim();
    const average = $('[name="average"]').val().trim();

    if (!name && !surname && !age && !average) {
        $('.alert').css('display', 'block');
        console.log('input value'); 
        return;
    }

    Module.create(name, surname, age, average);

    $('#form').trigger('reset');
});

$('.closebtn').click( function() {
    $('.alert').css('display', 'none');
});

});
