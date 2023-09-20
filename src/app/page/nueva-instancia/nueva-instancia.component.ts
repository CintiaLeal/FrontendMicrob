import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instancia } from '../../modelos/instancia';
import { InstanciaNueva } from '../../modelos/instanciaNueva';
import { LoginService } from '../../servicios/login.service';

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
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required)
  });

  onRegistrar() {
    console.log("llega a la funci");
    let x: InstanciaNueva={
      nombre: this.registrarForm.controls["nombre"].value  ? this.registrarForm.controls["nombre"].value : " ",
      esquemaColores: 1,
      tematica: this.registrarForm.controls["tematica"].value  ? this.registrarForm.controls["tematica"].value : " ",
      logo:  "logo ",
      url:  "logo ",
      activo:true,
      privacidad:1

    }
   
    this.api.crearInstancias(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }

  
}

