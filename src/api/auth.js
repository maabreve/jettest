import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyDfnI-EVrQGBjBYhMR7LSF2zNbAk9DvRgQ",
  authDomain: "armazen-do-produtor.firebaseapp.com",
  databaseURL: "https://armazen-do-produtor.firebaseio.com",
  projectId: "armazen-do-produtor",
  storageBucket: "armazen-do-produtor.appspot.com",
  messagingSenderId: "95729897480",
  appId: "1:95729897480:web:b386fd6b52fe19b9c701bd"
};

class Auth {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  updateProfile(displayName, phoneNumber) {
    return this.auth.currentUser.updateProfile({
      displayName,
      phoneNumber
    });
  }

  async sendEmailConfirmation(email) {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/confirmation`,
      handleCodeInApp: true
    };
    return await this.auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  // getEmailVerified() {
  //   console.log(this.auth.currentUser.emailVerified);
  //   return this.auth.currentUser && this.auth.currentUser.emailVerified;
  // }

  confirmRegistration() {
    if (this.auth.isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      return this.auth
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          console.log("item removed");
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch(function(error) {
          console.log(error);
          throw error;
        });
    }
  }

  onAuthStateChanged = handler => {
    return this.auth.onAuthStateChanged(handler);
  };
}

export default new Auth();
