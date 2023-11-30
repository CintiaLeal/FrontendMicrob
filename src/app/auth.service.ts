import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
     

      const infoSesion = result.user;

      const accessToken = (result.user as any)._delegate.accessToken;
      console.log(accessToken);
      localStorage.setItem("infoSesionGoogle", JSON.stringify(infoSesion));
      localStorage.setItem("accesoGoogle", JSON.stringify(accessToken));
    
    console.log(result);
    } catch (error) {
     
      console.error(error);
      throw error; 
    }
  }
}
