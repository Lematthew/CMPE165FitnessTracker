import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button'
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Footer headline message! Also a form test. Don't worry.
                </p>
                <p className="footer-subscription-text">
                    Subscribe at any time, unsubscribe at any time
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder="example@domain.com" className="footer-input" />
                        <Button buttonStyle='btn--outline'>Subscribe!</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/signup">Sign up here</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/signup">Sign up here</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Contact Us</h2>
                        <Link to="/signup">Sign up here</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/signup">Sign up here</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                        <Link to="/">example link text</Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            LOGO <i className="fab fa-typo3" />
                        </Link>
                    </div>
                    <small className="website-rights">Team7 2021</small>
                    <div className="social-icons">
                        <Link 
                            className="social-icon-link facebook" 
                            to="/" 
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link 
                            className="social-icon-link twitter" 
                            to="/" 
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link 
                            className="social-icon-link linkedin" 
                            to="/" 
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
