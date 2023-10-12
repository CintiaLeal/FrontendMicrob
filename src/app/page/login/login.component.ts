import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Login } from 'src/app/modelos/login';
import { GestorUsuariosService } from 'src/app/servicios/gestor-usuarios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  tipoUsuario: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private api: GestorUsuariosService, private router: Router, private app: AppComponent) { }

  onLogin() {
    let x: Login = {
      email: this.loginForm.controls["email"].value ? this.loginForm.controls["email"].value : " ",
      password: this.loginForm.controls["password"].value ? this.loginForm.controls["password"].value : " "
    }
    console.log("llega");
    this.api.loginByEmail(x).subscribe(data => {
      localStorage.setItem("token", data.token)
      console.log(data);
      this.router.navigate(['/inicioUsuario']);
      localStorage.getItem('email');
    });
  }
}

