import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instancia } from 'src/app/modelos/instancia';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nueva-instancia',
  templateUrl: './nueva-instancia.component.html',
  styleUrls: ['./nueva-instancia.component.scss']
})
export class NuevaInstanciaComponent {
  constructor(private api: LoginService, private alerta: MatSnackBar ){ }
//FORM desde el HTML
  registrarForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    pais: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required)
  });

  onRegistrar() {
    let x: Instancia={
      nombre: this.registrarForm.controls["nombre"].value  ? this.registrarForm.controls["nombre"].value : " ",
      pais: this.registrarForm.controls["pais"].value  ? this.registrarForm.controls["pais"].value : " ",
      tipo: this.registrarForm.controls["tipo"].value  ? this.registrarForm.controls["tipo"].value : " ",
      esquemaColores: this.registrarForm.controls["esquemaColores"].value  ? this.registrarForm.controls["esquemaColores"].value : " ",
      tematica: this.registrarForm.controls["tematica"].value  ? this.registrarForm.controls["tematica"].value : " ",
      logo:  "logo ",
      url:  "logo ",
      activo:true

    }
   
    this.api.registrarInstancias(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }

  
}

