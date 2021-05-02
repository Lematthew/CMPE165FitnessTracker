import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
    return (
        <div className="cards">
            <h1>Cards section title!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                <ul className="cards__items">
                        <CardItem 
                            src="/src/images/img-9.jpg"
                            text="Card 1.1 descriptor text"
                            label="Faux tags"
                            path="/"
                        />
                        <CardItem 
                            src="/src/images/img-2.jpg"
                            text="Card 1.2 descriptor text"
                            label="Faux tags"
                            path="/"
                        />                        
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                            src="/src/images/img-9.jpg"
                            text="Profile"
                            label="Faux tags"
                            path="/profile"
                        />
                        <CardItem 
                            src="/src/images/img-2.jpg"
                            text="Goals"
                            label="Faux tags"
                            path="/goals"
                        />
                        <CardItem 
                            src="../../src/images/img-2.jpg"
                            text="Statistics"
                            label="Faux tags"
                            path="/statistics"
                        />                        
                    </ul>
                </div> 
            </div>
        </div>
    )
}

export default Cards
