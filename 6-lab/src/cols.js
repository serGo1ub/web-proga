import React from 'react';

const Cols = ({ name, surname, age, average, onDelete, onChange, index }) => {
    return (
        <tr className={ index % 2 ? 'odd' : 'even'}>
            <td>{name}</td>
            <td>{surname}</td>   
            <td>{age}</td>   
            <td className={average < 4 ? 'down': ''}>{average}</td>   
            <td onClick={onDelete}>Delete</td>
            <td onClick={onChange}>Edit</td>   
        </tr>   
    )
}

export default Cols;