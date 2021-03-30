///// User Authentication /////
const auth = firebase.auth();

//Sections to display in specific states.
const whenSignedIn    = document.getElementById('whenSignedIn');
const whenSignedOut   = document.getElementById('whenSignedOut');

//Goole Login documents
const signInBtn       = document.getElementById('signInBtn');
const signOutBtn      = document.getElementById('signOutBtn');
const userDetails     = document.getElementById('userDetails');
const provider        = new firebase.auth.GoogleAuthProvider();

//Signup/Login with Email and Passowrd documents
const txtEmail        = document.getElementById('txtEmail');
const txtPassword     = document.getElementById('txtPassword');
const emailSignInBtn  = document.getElementById('emailSignInBtn');
const emailSignUpBtn  = document.getElementById('emailSignUpBtn');

/// Sign in event handlers (Google)
signInBtn.onclick  = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

// Email sign in 
emailSignInBtn.addEventListener('click', e => {

    const email = txtEmail.value;
    const pass  = txtPassword.value;
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e=> console.log(e.message));
})

//Email sign up
emailSignUpBtn.addEventListener('click', e => {

    const email = txtEmail.value;
    const pass  = txtPassword.value;
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=> console.log(e.message));
})


//Switch from 'Signed out' state to 'Signed in' state
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.email}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});



