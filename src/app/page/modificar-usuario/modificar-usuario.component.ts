import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/app/message.service';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';

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
  misseguidores:any;
  losquesigo:any;
  userBloqueados:any;
  registrarForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      biography: new FormControl(''),
      occupation: new FormControl(''),
      city: new FormControl(''),
     // birthday: new FormControl('')
    
  });
  public base64Image: any;
  _formBuilder: any;
  tokenActual: any;
  userName: any | null;
  idInstanciaLocalHost: any | null;
  usuario: UsuarioRetorno | null = null;
  fechaCumpleanosUsuario: string | undefined; // O el tipo correcto de acuerdo a tu lógica
  predefinedOccupations = ['Maestro', 'Programador', 'Doctor', 'Enfermero', 'Albañil', 'Ingeniero', 'Diseñador', 'Cocinero', 'Artista', 'Economista'];


  constructor(private messageService: MessageService,public dialog: MatDialog,private api: AppService, private app: AppComponent,private appNosql: AppnosqlService) {
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
    this.getSeguidos();
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
     userId: this.usuario?.userId,
      firstName: this.registrarForm.controls['firstName'].value ?? this.usuario?.firstName ?? " ",
      lastName: this.usuario?.lastName ??  this.usuario?.lastName ?? " ",
      email: this.usuario?.email ??  this.usuario?.email ?? " ",
      profileImage: this.base64Image ??  this.usuario?.profileImage ?? " ",
      birthday:  this.usuario?.birthday ??   this.usuario?.birthday ?? " ",
      biography: this.registrarForm.controls['biography'].value ??  this.usuario?.biography ?? " ",
      occupation: this.registrarForm.controls['occupation'].value ?? this.usuario?.occupation ?? " ",
      city: {
        id: this.usuario?.city.id,
        name: this.usuario?.city.name
      },
      role:  this.tipoU,
    }
  this.idInstancia=localStorage.getItem('idInstancia');
  this.api.modificarUsuario(x,this.idInstancia).subscribe(data => {
    this.messageService.showSuccess('Usuario modificado exitosamente.');

    const formularioUser: any ={
      userId: this.usuario?.userId,
      tenantId: this.idInstancia,
      userName:this.usuario?.userName,
      occupation:  this.usuario?.occupation,
      city: this.usuario?.city.name,
      birthday: this.usuario?.birthday,
      isSanctioned: true,
      creationDate: this.usuario?.creationDate
    }
    this.appNosql.updateUserNOSQL(formularioUser).subscribe(
      (data) => {}
    );    
  },
  error => {
    this.messageService.showError('Error al modificar el usuario. Por favor, inténtelo de nuevo.');
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

getSeguidos(){
  this.idInstancia=localStorage.getItem('idInstancia');
  if (this.userName) {
    this.api.verMisSeguidores(this.idInstancia, this.userName).subscribe(
      (value) => {
        this.misseguidores = value; // Asigna el valor de 'value' a this.usuario
      },
      (error) => {
        alert('Error al cargar las instancias: ' + error);
      }
    );
    this.api.verSeguidos(this.idInstancia, this.userName).subscribe(
      (value) => {
        this.losquesigo = value; // Asigna el valor de 'value' a this.usuario
      },
      (error) => {
        alert('Error al cargar las instancias: ' + error);
      }
    );
    //GetBlockedUsers(x:any,Page:any,ItemsPerPage:any,userName:any)
    this.api.getBlockedUsers(this.idInstancia,2,4, this.userName).subscribe(
      (value) => {
        this.userBloqueados = value; // Asigna el valor de 'value' a this.usuario
      },
      (error) => {
        alert('Error al cargar las instancias: ' + error);
      }
    );

  }
}

}
