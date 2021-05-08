import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            {/* WHY TF does this not work? */}
            <video src='/src/videos/video-2.mp4' autoPlay loop muted />
            <h1>FILLER TEXT</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle='btn--outline' buttonSize='btn--large'>
                GET STARTED
                </Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize='btn--large'>
                MAIN BUTTON <i className="far fa-play-circle" />
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
