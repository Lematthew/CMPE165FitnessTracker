import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import { Button } from '../Button';
import './Profile.css';

export default function Profile(props) {
    return (
        <>
            <div className="profile">
                <h1>PROFILE</h1>
                <div className="break" />

                <div className="profile-wrapper">
                    <h3>Welcome, username{/*USERNAME*/}</h3>
                    <div className="break" />

                    <h5>sample message{/*MESSAGE*/}</h5>
                    <div className="break" />

                    <div className="user-data">
                        <div className="user-data-wrapper">
                            <div className="user-data-item">
                                <h2>Sex </h2>
                                <p>M{/*SEX*/}</p>
                            </div>
                            <div className="user-data-item">
                                <h2>Age </h2>
                                <p>22{/*AGE*/}</p>
                            </div>
                            <div className="user-data-item">
                                <h2>Height </h2>
                                <p>5'6"{/*HEIGHT*/}</p>
                            </div>
                            <div className="user-data-item">
                                <h2>Weight </h2>
                                <p>200 lbs{/*WEIGHT*/}</p>
                            </div>
                            <div className="break" />
                            <div className="user-data-item">
                                <h2>Current Plan</h2>
                                <p>PLAN NAME{/*PLAN*/}</p>
                            </div>
                        </div>
                    </div>

                    <div className="break" />
                    <Button className="btns" buttonStyle='btn--outline' buttonSize='btn--large' linkTo='/statistics'>
                        Edit Profile
                    </Button>

                    <Button className="btns" buttonStyle='btn--outline' buttonSize='btn--large' linkTo='/'>
                        Delete Profile
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}