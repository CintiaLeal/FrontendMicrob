import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Usuario } from 'src/app/modelos/usuario';

import { AppService } from 'src/app/servicios/app.service';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent {
  registrarForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required)
});

  constructor(private api: AppService, private alerta: MatSnackBar ){ }
 
  onRegistrar() {
    let x: Usuario = {
      firstName: this.registrarForm.controls['firstName'].value  ? this.registrarForm.controls["firstName"].value : " ",
      lastName: this.registrarForm.controls['lastName'].value ? this.registrarForm.controls["lastName"].value : " ",
      email: this.registrarForm.controls['email'].value ? this.registrarForm.controls["email"].value : " ",
      password: this.registrarForm.controls['password'].value ? this.registrarForm.controls["password"].value : " ",
      confirmPassword: this.registrarForm.controls['confirmPassword'].value ? this.registrarForm.controls["confirmPassword"].value : " "
  };
   
    this.api.registrarUsuario(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }
}
