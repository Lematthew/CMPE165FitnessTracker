import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    // Button props
    children, type, onClick, buttonStyle, buttonSize
}) => {
    // Assigns default css class if none specified in button tag
    const checkButtonStyle = STYLES.includes(buttonSize) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to='/signup' className='btn-mobile'>
            <button 
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick = {onClick}
                type = {type}
            >
                {children}
            </button>
        </Link>
    )
}