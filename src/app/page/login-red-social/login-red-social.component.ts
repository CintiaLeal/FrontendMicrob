import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login-red-social',
  templateUrl: './login-red-social.component.html',
  styleUrls: ['./login-red-social.component.scss']
})
export class LoginRedSocialComponent {

}
/*/ Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV-RqsJm1tPx3AiLKHNcZqMtOW8Q4KHQg",
  authDomain: "laboratorionet-e6d3f.firebaseapp.com",
  projectId: "laboratorionet-e6d3f",
  storageBucket: "laboratorionet-e6d3f.appspot.com",
  messagingSenderId: "575058974807",
  appId: "1:575058974807:web:64dcf632aec6588a4d2b12"
};

// Initialize Firebase
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithPopup(auth,provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
function initializeApp(firebaseConfig: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; }) {
  throw new Error('Function not implemented.');
}

function getAuth(app: any) {
  throw new Error('Function not implemented.');
}

function signInWithPopup(auth: any, provider: GoogleAuthProvider) {
  throw new Error('Function not implemented.');
}
*/
