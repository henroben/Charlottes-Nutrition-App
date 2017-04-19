import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCHG7EcyqIV7mlLwFR2gyRgX730njY7mn4",
        authDomain: "nutrition-app-c1e93.firebaseapp.com",
        databaseURL: "https://nutrition-app-c1e93.firebaseio.com",
        projectId: "nutrition-app-c1e93",
        storageBucket: "nutrition-app-c1e93.appspot.com",
        messagingSenderId: "902272294271"
    };
    firebase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;