import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instancia } from '../../modelos/instancia';
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
  tipoU: string | null = null;
  idInstancia: any;
  userName: any;
  lisTematicas: any[] | null = null;
   constructor(public dialog: MatDialog,private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');

  }
//FORM desde el HTML
  registrarForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required),
    logo: new FormControl('',Validators.required),
    dominio: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  });
  ngOnInit(): void {
    this.getTematicas();
  }
  
  getTematicas() {
    this.api.verTematicas().subscribe(
      (data: any[]) => {
        this.lisTematicas = data;  // Guarda el array en la variable listCitys
      },
      error => {
      }
    );
  }

  onRegistrar() {
    this.idInstancia = localStorage.getItem('idInstancia');
    this.userName = localStorage.getItem('userName');

    let form: any={
      nombre: this.registrarForm.controls["nombre"].value  ? this.registrarForm.controls["nombre"].value : " ",
      dominio:  this.registrarForm.controls["dominio"].value  ? this.registrarForm.controls["dominio"].value : " ",
      logo:  this.base64Image,
      activo:true,
      tematica: { name: this.registrarForm.controls["tematica"].value  ? this.registrarForm.controls["tematica"].value : " "},
     description: this.registrarForm.controls["description"].value  ? this.registrarForm.controls["description"].value : " ",
     esquemaColores: this.registrarForm.controls["esquemaColores"].value  ? this.registrarForm.controls["esquemaColores"].value : " ",
      privacidad:0,
      
    }
    this.api.crearInstancias(form,this.userName).subscribe(data => {
      console.log(data);
    });

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

