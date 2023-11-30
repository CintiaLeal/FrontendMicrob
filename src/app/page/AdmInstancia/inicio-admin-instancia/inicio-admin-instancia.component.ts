import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno} from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ColorHelper } from '@swimlane/ngx-charts';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';
import { forkJoin } from 'rxjs';

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
  cantUserMonth:any;
  cantMode:any;
  cantPost: any;
  ultimosUsuarios: any[] | any;
  usuariosForCity:any[] | any;
  topHastagsInicio: any [] =[];
  texto:string = '';
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  postIdMasLike:any[] =[];
  postMaslike:any[]= [];
 
  // Inicializa chart como un objeto vacío
  public chart: Chart = {} as Chart;
  constructor(private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.app.ngOnInit();
    
   }


  ngOnInit(): void {
 

///
 // datos
 const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

// Creamos la gráfica
this.chart = new Chart("chart", {
  type: 'bar' as ChartType, // tipo de la gráfica 
  data: data, // datos 
  options: { // opciones de la gráfica 
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
});

    ///
    this.isLoading1 = true;
    this.isLoading2 = true;
    this.isLoading3 = true;
    this.idinstancia = localStorage.getItem('idInstancia');
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');

    this.api.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) 
      this.isLoading2 = false;}
    });
   this.panel();
   this.obtenerCitys();
   this.obtenertopHastags(8);
   this.texto = "Buenas";
   this.getPostMasLike(4);
  }

  obtenertopHastags(cantidad:any){
    if(this.idinstancia){
      this.appNosql.getHastgas(this.idinstancia,cantidad).subscribe(
        (value) => {
          this.isLoading2 = false;
          this.topHastagsInicio = value;     
        });
      }
  }

  panel() {
    this.api.getCantidadUsuariosAllTenant(this.idinstancia).subscribe(
      data => {
        this.cantUser = data.total;
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

    this.api.getCantUsersThisMonthAllTenant(this.idinstancia).subscribe(
      data => {
        this.cantUserMonth = data.total;
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

  }
  
  

  obtenerCitys() {
    this.api.getCantUsersByCityAllTenan(this.idinstancia).subscribe(
      data => {
        this.usuariosForCity = data;
        console.log(this.usuariosForCity);
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

      

  }
  
  
  
  getPostMasLike(cantidad: any) {
    if (this.idinstancia) {
      this.appNosql.getPostMasLike(this.idinstancia, cantidad).subscribe(
        (postIdMasLike) => {

          for (const postIdObject of postIdMasLike) {
            const postId = postIdObject.postId;
            this.api.getPostId(this.idinstancia, postId).subscribe(
              (postDetails) => {
                // postDetails contiene la información del post, haz lo que necesites con ella
                console.log('Detalles del post:', postDetails);
  
                // Agrega el postDetails a la lista postMaslike (asumiendo que es un array)
                this.postMaslike.push(postDetails);
              },
              (error) => {
                console.error('Error al obtener detalles del post:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener postIdMasLike:', error);
        }
      );
    }
  }
  
  
}
