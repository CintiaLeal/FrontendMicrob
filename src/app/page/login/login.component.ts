import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Login } from 'src/app/modelos/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  tipoUsuario: string | null = null;
  tokens: string | null = null;
  tipoU: { [key: string]: string } | null = null;
  idT: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  jwtHelper: any;

  constructor(private api: AppService, private router: Router, private app: AppComponent) { this.jwtHelper = new JwtHelperService(); }

  ngOnInit(): void {
  }

  onLogin() {
    this.idT = localStorage.getItem("idInstancia");
    let x: Login = {
      username: this.loginForm.controls["email"].value ? this.loginForm.controls["email"].value : " ",
      password: this.loginForm.controls["password"].value ? this.loginForm.controls["password"].value : " "
    }
    this.api.loginByEmail(x, 2).subscribe(data => {
      localStorage.setItem("token", data.token);
      this.tokens = data.token;
      localStorage.setItem("userName", x.username);

      if (this.tipoU && 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' in this.tipoU) {
        if (this.tipoU['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Common-User') {
          this.app.cambiarTipoUsuario(data.token);
          localStorage.setItem("tipoUsuario", 'Common-User');
          this.router.navigate(['/inicioUsuario']);
        } else if (this.tipoU['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Instance-Administrator') {
          this.app.cambiarTipoUsuario(data.token);
          localStorage.setItem("tipoUsuario", 'Instance-Administrator');
          this.router.navigate(['/inicioAdm']);
        }
      }
    });


  }
  //Common-User Moderator Platform-Administrator Instance-Administrator 

  decodeToken(token: string) {
    console.log("llego al deco");
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    console.log("aud: ", decodedToken.aud);
    console.log("exp: ", decodedToken.exp);
    console.log("Role: ", decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    console.log("name: ", decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    console.log("iss: ", decodedToken.iss);

    this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('tipoUsuario', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

    this.app.cambiarTipoUsuario(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  }

  // Ejemplo de cómo verificar si un token ha expirado
  isTokenExpired(token: string) {
    const isExpired = this.jwtHelper.isTokenExpired(token);
    console.log(`Token expired: ${isExpired}`);
  }

}


