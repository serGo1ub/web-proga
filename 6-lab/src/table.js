import React from 'react';
import Cols from './cols';
import Row from './row';

const Table = ({ startItems, onDelete, students, onChange, edit }) => {
    const items = students.map((item, index) => {
        return (
                <Cols 
                {...item}
                index={index}
                onDelete={edit ? () => {} : () => onDelete(item.id)}
                onChange={() => onChange(item.id)}
                key={item.id}/>
        )
    })

    const elements = startItems.map((item, index) => {
        return (
                <Row item={item} key={index}/>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    {elements}
                </tr>
            </thead>
            <tbody>
                    {items}
            </tbody>
        </table>
    )
}

export default Table;