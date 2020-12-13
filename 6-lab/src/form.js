import React from 'react';

class Form extends React.Component {

    state = {
        name: '',
        surname: '',
        age: 0,
        average: 0
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeSurname = (event) => {
        this.setState({
            surname: event.target.value
        })
    }

    onChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    onChangeAverage = (event) => {
        this.setState({
            average: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { name, surname, age, average } = this.state;
        if (name.length < 4 && surname.length < 4) {
            return;
        }
        this.setState({
            name: '',
            surname: '',
            age: 0,
            average: 0
        })
        const cb = this.props.onItemAdded || (() => {});
        cb({
            name,
            surname,
            age,
            average
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.indexedStudent !== prevProps.indexedStudent) {
            const { name, surname, age, average } = this.props.indexedStudent;
    
            this.setState({
                name, 
                surname,
                age,
                average
            })

            
        }
    }

    changeStudent = () => {
        const { name, surname, age, average } = this.state;
        const { id } = this.props.indexedStudent;
        const cb = this.props.refreshStudent || (() => {});
        cb({
            name,
            surname,
            age,
            average,
            id
        });

        this.setState({
            name: '',
            surname: '',
            age: 0,
            average: 0
        })
    }

    render() {

        return (
            <form id="form" onSubmit={this.submitHandler}>
            <label htmlFor="name">
                Введите Имя
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChangeName}/>
            </label>
            <br />
            <label htmlFor="surname">
                Введите Фамилию
                <input type="text" id="surname" name="surname" value={this.state.surname} onChange={this.onChangeSurname}/>
            </label>
            <br />
            <label htmlFor="age">
                Введите Возраст
                <input type="text" id="age" name="age" value={this.state.age} onChange={this.onChangeAge}/>
            </label>
            <br />
            <label htmlFor="average">
                Введите Средний Балл
                <input type="text" id="average" name="average" value={this.state.average} onChange={this.onChangeAverage}/>
            </label>
            <br />
            <button type="submit" disabled={this.props.edit ? true : false}>Добавить студента</button>
            <button type="button" disabled={this.props.edit ? false : true} onClick={this.changeStudent}>Закончить редактирование</button>
        </form>
        );
    }
};

export default Form;