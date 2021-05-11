import React,  {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';


function Navbar() {
    // State tracking variables
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    // State modifying handlers
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // prevents undesired drawing upon first load
    useEffect(() => {
        showButton();
    }, []);

    const showButton = () => {
        if (window.innerWidth <=960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Home icon on leftmost side; links to root page */}
                    <Link to ="/" className="navbar-logo" onClick={closeMobileMenu}>
                        FT<i className='fas fa-plus' />
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/goals' className='nav-links' onClick={closeMobileMenu}>
                                Goals
                            </Link>
                        </li> 
                        <li className="nav-item">
                            <Link to='/statistics' className='nav-links' onClick={closeMobileMenu}>
                                Stats
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/signup' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>           
                    </ul>
                    {button && <Button buttonStyle='btn--outline' linkTo='/signup'>SIGN UP</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar