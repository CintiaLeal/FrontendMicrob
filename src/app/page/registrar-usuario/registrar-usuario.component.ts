import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario';

import { AppService } from 'src/app/servicios/app.service';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent {
  public base64Image: any;
  public idInstancia:any;
  registrarForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    logo: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('', Validators.required)
});

  constructor(private api: AppService, private alerta: MatSnackBar ){ }
 
  onRegistrar() {
    let x: Usuario = {
      firstName: this.registrarForm.controls['firstName'].value  ? this.registrarForm.controls["firstName"].value : " ",
      lastName: this.registrarForm.controls['lastName'].value ? this.registrarForm.controls["lastName"].value : " ",
      email: this.registrarForm.controls['email'].value ? this.registrarForm.controls["email"].value : " ",
      password: this.registrarForm.controls['password'].value ? this.registrarForm.controls["password"].value : " ",
      confirmPassword: this.registrarForm.controls['confirmPassword'].value ? this.registrarForm.controls["confirmPassword"].value : " ",
      profileImage: this.base64Image,
      role:'Common-User'
  };
   
    this.idInstancia=localStorage.getItem('idInstancia');

    this.api.registrarUsuario(x,this.idInstancia).subscribe(data => {
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
