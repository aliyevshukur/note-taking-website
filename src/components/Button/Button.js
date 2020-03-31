import React from 'react';

const Button = (props) => {
    return (
        <button style={{width:props.width,height:props.height}}>{props.name}</button>
    );
};

export default Button;