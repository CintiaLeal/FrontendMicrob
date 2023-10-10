import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onLogin() {
  }
 /* loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)
  });*/
/*
  constructor(private api: AppService, private router: Router, private app: AppComponent) { }

  onLogin() {
    let x: Login = {
      contrasenia: this.loginForm.controls["contrasenia"].value ? this.loginForm.controls["contrasenia"].value : " ",
      correo: this.loginForm.controls["email"].value ? this.loginForm.controls["email"].value : " "
    }
    console.log("llega");
    //console.log(this.loginForm.value.correo);
    this.api.loginByEmail(x).subscribe(data => {
      localStorage.setItem("token", data.token)
      console.log(data);
      this.router.navigate(['/']);
    });
    this.app.changeUser(true);
  }*/
}

