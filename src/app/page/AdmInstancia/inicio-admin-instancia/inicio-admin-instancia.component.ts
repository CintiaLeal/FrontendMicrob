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
  view: [number, number] = [900, 400];

   //Para los desplegables
   foods: Filtro[] = [
    {value: 'opcion0', viewValue: 'Todas'},
    {value: 'opcion1', viewValue: 'Público'},
    {value: 'opcion2', viewValue: 'Privados'}
  ];
  tematicas: Tematica[] = [
    {value: '1', viewValue: 'Todas'},
    {value: 'Música', viewValue: 'Música'},
    {value: 'Fútbol', viewValue: 'Fútbol'},
    {value: 'Películas', viewValue: 'Películas'}
  ];

  hidden = false;

  constructor(private app:AppComponent, private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.app.ngOnInit();
   }
 
 
  ngOnInit(): void {
    this.idinstancia = localStorage.getItem('idInstancia');
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');
    //window.location.reload();
    this.api.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
    });

    this.api.obtenerUsuarios(this.idinstancia).subscribe({
      next: value => this.usuarios = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
    });

    this.getCustomColors();
  }
  getCustomColors(): any {
    return [
      { name: 'Label 1', value: '#FF5733' },  // Personaliza el color para Label 1
      { name: 'Label 2', value: '#33FF57' },  // Personaliza el color para Label 2
      { name: 'Label 3', value: '#5733FF' }   // Personaliza el color para Label 3
    ];
  }
  data = [
    {
      'name': 'Label 1',
      'value': 300,
      'color': '#FF5733'
    },
    {
      'name': 'Label 2',
      'value': 500,
      'color': '#33FF57'
    },
    {
      'name': 'Label 3',
      'value': 200,
      'color': '#5733FF'
    }
  ];
  getCustomColorss(data: any[]): any {
    return data.map(item => ({ name: item.name, value: item.color }));
  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
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
