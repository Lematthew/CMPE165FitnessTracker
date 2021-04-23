import React from 'react';
import '../../App.css';
import {useAuth} from '../../contexts/AuthContext'

//Profile in progress
export default function Profile() {
    const { currentUser, logout } = useAuth()
    if(currentUser && currentUser.email)
    return( 
    
    <h2>{currentUser.email}</h2>
    
    )

    return(<h1>You are nothing</h1>)
}