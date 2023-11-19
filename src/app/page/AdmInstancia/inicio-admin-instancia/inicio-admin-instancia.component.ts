import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno} from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { ChartOptions, ChartType } from 'chart.js';
import { ColorHelper } from '@swimlane/ngx-charts';



interface Filtro {
  value: string;
  viewValue: string;
}
interface Tematica {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-inicio-admin-instancia',
  templateUrl: './inicio-admin-instancia.component.html',
  styleUrls: ['./inicio-admin-instancia.component.scss']
})
export class InicioAdminInstanciaComponent {
  public base64Image: any;
  panelOpenState = false;
  tipoU: string | null = null;
  idinstancia: string | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;
  usuarios: any;
  cantUser:any;
  cantMode:any;
  cantPost: any;
  ultimosUsuarios: any[] | any;

  constructor(private app:AppComponent, private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.app.ngOnInit();
   }
 
 
  ngOnInit(): void {
    this.idinstancia = localStorage.getItem('idInstancia');
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');

    this.api.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
    });
   this.panel();
  }

  panel() {
    this.api.obtenerUsuarios(this.idinstancia).subscribe({
      next: users => {
        // Llenar la variable cantUser con la cantidad de usuarios
        this.cantUser = users.length;
  
        // Inicializar la variable cantPost en 0
        this.cantPost = 0;
  
        // Recorrer los usuarios para contar la cantidad total de posts
        users.forEach(user => {
          this.cantPost += user.posts ? user.posts.length : 0;
        });
  
        // Obtener los últimos 2 usuarios basándose en el ID más alto
        this.ultimosUsuarios = users
          .sort((a, b) => b.userId - a.userId)
          .slice(0, 2);
  
        console.log('Cantidad de usuarios:', this.cantUser);
        console.log('Cantidad total de posts:', this.cantPost);
        console.log('Últimos 2 usuarios:', this.ultimosUsuarios);
      },
      error: err => {
        alert('Error al cargar las instancias: ' + err);
        console.error('Error al obtener usuarios:', err);
      }
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
