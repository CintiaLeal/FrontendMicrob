import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Usuario } from 'src/app/modelos/usuario';

import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent {
  registrarForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required)
  });
  constructor(private api: LoginService, private alerta: MatSnackBar ){ }
 
  onRegistrar() {
    let x: Usuario={
      nombre: this.registrarForm.controls["nombre"].value  ? this.registrarForm.controls["nombre"].value : " ",
      correo: this.registrarForm.controls["correo"].value  ? this.registrarForm.controls["correo"].value : " ",
      pass: this.registrarForm.controls["pass"].value  ? this.registrarForm.controls["pass"].value : " "
    }
   
    this.api.registrar(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }
}
