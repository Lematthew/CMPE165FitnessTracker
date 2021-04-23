import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];
const ROUTES = ['/', '/signup', '/profile', '/goals',  '/statistics', '/editprofile'];

export const Button = ({
    // Button props
    linkTo, children, type, onClick, buttonStyle, buttonSize
}) => {
    // Assigns default css class if none specified in button tag
    const checkButtonStyle = STYLES.includes(buttonSize) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkLinkTo = ROUTES.includes(linkTo) ? linkTo : ROUTES[0];

    return (
        <Link to={`${checkLinkTo}`} className='btn-mobile'>
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