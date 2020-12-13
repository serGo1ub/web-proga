import React from 'react';

const Result = (props) => {
    return (
    <div id="box">
        Средний балл:
    <span id="result">{props.averageScore}</span>
    </div>
    )
};

export default Result;