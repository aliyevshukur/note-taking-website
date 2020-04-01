import React from 'react';
import './Button.scss';

const Button = (props) => {
    return (
        <button className="buttonDesign" onClick={props.buttonHandler} style={{width:props.width,height:props.height}}>{props.name}</button>
    );
};

export default Button;