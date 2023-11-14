import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { MessageService } from 'src/app/message.service';
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
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    biography: new FormControl(''),
    occupation: new FormControl(''),
    city: new FormControl(''),
    birthday: new FormControl('')

  });
  public base64Image: any;
  idInstancia: any | null = null;
  public birthday: Date | null = null;
  listCitys: any;

  constructor(private _formBuilder: FormBuilder, private api: AppService, private messageService: MessageService) { }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  ngOnInit(): void {
    this.getCitys();
  }

  getCitys() {
    this.api.getCity().subscribe(
      (data: any[]) => {
        this.listCitys = data;  // Guarda el array en la variable listCitys
      },
      error => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }
  onRegistrar() {
    let x: any = {
      firstName: this.registrarForm.controls['firstName'].value ? this.registrarForm.controls["firstName"].value : " ",
      lastName: this.registrarForm.controls['lastName'].value ? this.registrarForm.controls["lastName"].value : " ",
      email: this.registrarForm.controls['email'].value ? this.registrarForm.controls["email"].value : " ",
      password: this.registrarForm.controls['password'].value ? this.registrarForm.controls["password"].value : " ",
      confirmPassword: this.registrarForm.controls['confirmPassword'].value ? this.registrarForm.controls["confirmPassword"].value : " ",
      profileImage: this.base64Image,
      role:  'Platform-Administrator',//'Moderator',//'Common-User',
      biography: this.registrarForm.controls['biography'].value ? this.registrarForm.controls["biography"].value : " ",
      occupation: this.registrarForm.controls['occupation'].value ? this.registrarForm.controls["occupation"].value : " ",
      city: {
        name: this.registrarForm.controls['city'].value ? this.registrarForm.controls["city"].value : " "
      },
      birthday: this.registrarForm.controls['birthday'].value ? this.registrarForm.controls["birthday"].value : " ",
      isSanctioned: true,
      username: this.registrarForm.controls['username'].value ? this.registrarForm.controls["username"].value : " ",
    };
    this.api.registrarUsuario(x,0).subscribe(
      (data) => {
        // La solicitud fue exitosa, mostrar un mensaje de éxito
        this.messageService.showSuccess('Usuario registrado exitosamente');
        console.log(data);
      },
      (error) => {
        // Ocurrió un error, mostrar un mensaje de error
        this.messageService.showError('Error al registrar el usuario. Por favor, inténtelo de nuevo.');
        console.error(error);
      }
    );
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

  removeImage() {
    this.base64Image = '';
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
}
