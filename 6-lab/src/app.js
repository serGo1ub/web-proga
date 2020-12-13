import React from 'react';
import Form from './form';
import Table from './table';
import Result from './result';

class App extends React.Component {

    maxId = 6;

    state = {
        students: [],
        startItems: ['Name', 'Surname', 'Age', 'Average', 'Delete', 'Edit'],
        indexedStudent: {},
        edit: false
    }

    onItemAdded = (obj) => {
        this.setState(state => {
            const student = this.createStudent(obj);
            return { students: [...state.students, student]}
        });
    }

    refreshStudent = (obj) => {
        this.setState(state => {
        const { id } = obj;
        const oldStudents = this.state.students.concat();
        const index = oldStudents.findIndex(student => student.id === id);
        const students = [
            ...state.students.slice(0, index),
            obj,
            ...state.students.slice(index + 1)
        ];
        return { students, edit: false }
        });

        console.log(this.state.students);
    }

    onDelete = (id) => {
        this.setState(state => {
            const idx = state.students.findIndex(student => student.id === id);
            const students = [
                ...state.students.slice(0, idx),
                ...state.students.slice(idx + 1)
            ];
            return {students};
        });
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://reqres.in/api/users?page=1');
            const data = await response.json();
            const students = data.data.map(item => ({
                name: item.first_name,
                surname: item.last_name,
                id: item.id,
                average: +(Math.random() * 10).toFixed(1),
                age: +(item.id * Math.random()*10 +1).toFixed(0)
            }));
            this.setState({ students })
        } catch(err) {
            console.log(err);
        }
    }

    createStudent({ name, surname, age, average }) {
        return {
          id: ++this.maxId,
          name,
          surname,
          age,
          average
        };
    }

    onChange = (id) => {
        const students = this.state.students.concat();
        const indexedStudent = students.find(student => student.id === id);
        console.log(this.state.students);
        this.setState({
            indexedStudent,
            edit: true
        })
    }

    render() {

        const { startItems, students, indexedStudent, edit } = this.state;
        const averageScore = students.reduce((acc, curr) => {
            acc += +curr.average;
            return acc;
        }, 0);

        return (
            <div>
                <Form 
                    onItemAdded={this.onItemAdded}
                    indexedStudent={indexedStudent}
                    refreshStudent={this.refreshStudent}
                    edit={edit}/>

                <Table 
                    startItems={startItems} 
                    students={students} 
                    onDelete={this.onDelete}
                    onChange={this.onChange}
                    edit={edit}/>

                <Result 
                    averageScore={(averageScore / students.length).toFixed(1)}/>
            </div>
        );
    }
}

export default App;