import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instancia } from '../../modelos/instancia';
import { InstanciaNueva } from '../../modelos/instanciaNueva';
import { AppService } from '../../servicios/app.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
@Component({
  selector: 'app-nueva-instancia',
  templateUrl: './nueva-instancia.component.html',
  styleUrls: ['./nueva-instancia.component.scss']
})
export class NuevaInstanciaComponent {
  public base64Image: any;
  constructor(private api: AppService, private alerta: MatSnackBar ){ }
//FORM desde el HTML
  registrarForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required),
    logo: new FormControl('',Validators.required),
  });

  onRegistrar() {
    console.log("llega a la funcion");
    let x: InstanciaNueva={
      nombre: this.registrarForm.controls["nombre"].value  ? this.registrarForm.controls["nombre"].value : " ",
      esquemaColores: 1,
      tematica: this.registrarForm.controls["tematica"].value  ? this.registrarForm.controls["tematica"].value : " ",
      logo:  this.base64Image,
      url:  "logo ",
      activo:true,
      privacidad:1

    }
   
    this.api.crearInstancias(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }

  //INI PARA IMG COM BASE 64
  convertToBase64(file: File) {
    console.log(file);
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })

    observable.subscribe((d) => {
      this.base64Image = d;
      console.log(this.base64Image);
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      subscriber.next(fileReader.result)
      subscriber.complete()
    }
    fileReader.onerror = () => {
      subscriber.error()
    }
  }
  
  onFileSelected(event: any): void {
     this.convertToBase64(event.target.files[0]);
   }
  //FIN PARA IMG COM BASE 64
  showImage() {
    if (this.base64Image) {
      // Devuelve la imagen base64 como una URL de datos
      return `data:image/png;base64,${this.base64Image}`;
    } else {
      // Puedes establecer una URL de imagen predeterminada o un mensaje de error aquí
      return 'ruta_a_imagen_predeterminada_o_mensaje_de_error';
    }
  }
}

