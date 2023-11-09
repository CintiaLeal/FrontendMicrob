import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent {

  tipoU: string | null = null;
  idInstancia: any | null = null;
  public birthday: Date | null =null;
  listCitys: any;

 
  registrarForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      biography: new FormControl(''),
      occupation: new FormControl(''),
      city: new FormControl(''),
      birthday: new FormControl('')
    
  });
  public base64Image: any;
  _formBuilder: any;
  tokenActual: any;
  userName: any | null;
  idInstanciaLocalHost: any | null;
  usuario: UsuarioRetorno | null = null;
  fechaCumpleanosUsuario: string | undefined; // O el tipo correcto de acuerdo a tu lógica

  constructor(public dialog: MatDialog,private api: AppService, private app: AppComponent) {
    this.tipoU = localStorage.getItem('tipoUsuario');

  }
  ngOnInit(): void {
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.userName = localStorage.getItem('userName');
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    this.getCitys();
    if (this.userName) {
      this.api.obtenerInfoUsuario(this.userName, this.idInstanciaLocalHost).subscribe(
        (value) => {
          this.usuario = value; // Asigna el valor de 'value' a this.usuario

        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
    }
   
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

  onModificar() {
    let x: any = {
      firstName: this.registrarForm.controls['firstName'].value ?? this.usuario?.firstName ?? " ",
      lastName: this.registrarForm.controls['lastName'].value ?? this.usuario?.lastName ?? " ",
      email: this.usuario?.email,
      password: this.registrarForm.controls['password'].value ?? " ",
      confirmPassword: this.registrarForm.controls['confirmPassword'].value ?? " ",
      profileImage: this.base64Image,
      role: 'Common-User',
      biography: this.registrarForm.controls['biography'].value ?? " ",
      occupation: this.registrarForm.controls['occupation'].value ?? " ",
      city: {
        name: this.registrarForm.controls['city'].value
      },
      birthday: this.registrarForm.controls['birthday'].value ?? " ",
      isSanctioned: false,
      username: this.usuario?.userName ?? " ",
    };
  
    // Resto de la lógica...
  
  this.idInstancia=localStorage.getItem('idInstancia');
  this.api.registrarUsuario(x,this.idInstancia).subscribe(data => {
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

removeImage(){
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
