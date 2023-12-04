import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno} from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { ColorHelper } from '@swimlane/ngx-charts';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';
import { forkJoin } from 'rxjs';
import { ChartDataset } from 'chart.js';
import 'chart.js/auto';
import { ChartItem } from 'chart.js/auto';
import { MatPaginator } from '@angular/material/paginator';

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

  export class InicioAdminInstanciaComponent  {

  public base64Image: any;
  panelOpenState = false;
  tipoU: string | null = null;
  idinstancia: string | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;
  usuarios: any;
  cantUser:any;
  cantUserMes:any;
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
  graficaUserMes:any[]= [];
  middleText:any;
  increaseUser:any;
  increaseUserMes:any;
  cantTodalusuarios:any;
  cantPostReportados:any;
  rangeOptions = [
    { start: 3, end: 20 },
    { start: 6, end: 20 },
    { start: 9, end: 20 },
    { start: 12, end: 20 }
  ];
  cantPostInst:any[]= [];
  cantidadUsuariosReportado:any;
  //
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  pieChartLabels: string[] = ['Total de Posteos', 'Cantidad Reportados'];
  pieChartData: ChartData = {
    labels: ['Posteos', 'Reportados'],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: [ '#04b2d975','#6d6b74']
      }
    ]
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  //

  constructor(private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.app.ngOnInit();
   
  }



  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = []; // Aquí almacenarás los meses
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataset[] = [
    { data: [], label: 'Total Usuarios', backgroundColor: '#6d6b7480' },
    //                                             ^^^^^^^^
    { data: [], label: 'Nuevos Usuarios', backgroundColor: '#04b2d975' },
  ];
  ngOnInit(): void {
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
   //
   this.graficaUserMeses(3);
   this.api.getPostReportados(this.idinstancia).subscribe(
    (info)=>{
      this.cantPostReportados = info.length;
      this.getPosteosInstanciaCant(this.cantPostReportados);
    });

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
        this.increaseUser = data.increase;
        this.isLoading3 = false;

        this.api.getGetUsersByInstancePaginado(this.idinstancia, 1, 500).subscribe((users: any[]) => {
          this.cantTodalusuarios = users.length;
          this.cantidadUsuariosReportado = this.cantUser - this.cantTodalusuarios;
        }, (error) => {
        });
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

    this.api.getCantUsersThisMonthAllTenant(this.idinstancia).subscribe(
      data => {
        this.cantUserMes = data.total;
        this.increaseUserMes = data.increase;
        
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

  }






  currentRangeIndex = 0;

  get rangeText(): string {
    const { start, end } = this.rangeOptions[this.currentRangeIndex];
    return `${start}-${end}`;
  }


  decrement() {
    this.currentRangeIndex = (this.currentRangeIndex - 1 + this.rangeOptions.length) % this.rangeOptions.length;
    this.graficaUserMeses(this.rangeOptions[this.currentRangeIndex].start);
  }

  increment() {
    this.currentRangeIndex = (this.currentRangeIndex + 1) % this.rangeOptions.length;
    this.graficaUserMeses(this.rangeOptions[this.currentRangeIndex].start);
  }
  graficaUserMeses(cant: any) {
    //getNewMonthlyRegistrationsAllTenant(x:any,cant:any)
    this.api.getNewMonthlyRegistrationsAllTenant(this.idinstancia, cant).subscribe(
      data => {
        this.graficaUserMes = data;
        console.log(this.graficaUserMes);
        this.isLoading3 = false;
  
        // Llena las etiquetas del gráfico con los meses
        this.barChartLabels = this.graficaUserMes.map((data) => data.month);
  
        // Llena los datos de la gráfica con los valores del backend
        this.barChartData[0].data = this.graficaUserMes.map((data) => data.newTotalUser);
  
        // Configura la línea como una serie de datos en la misma escala y eje Y que la serie de barras
        this.barChartData[1] = {
          data: this.graficaUserMes.map((data) => data.newTotalInstance),
          label: 'Nuevos Usuarios',
          type: 'line'
          //yAxisID: 'y-axis-1'
        };
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );
  }
  
  


  getPosteosInstanciaCant(x:any) {
    this.api.getPosteosInstanciaCant(this.idinstancia).subscribe(
      (data) => {
     
        if(this.cantPostReportados){
        this.cantPostInst = data;
        console.log(this.cantPostInst);
        this.pieChartLabels = ['Total de Posteos','Cantidad Sancionados', 'Cantidad Reportados'];
        this.pieChartData = {
          labels: ['Posteos', 'Sancionados', 'Reportados'],
          datasets: [
            {
              data: [data.total, data.sancionados,this.cantPostReportados],
              backgroundColor: [ '#04b2d975','#6d6b74','#E97A62']
            }
          ]
        };
      }},
      error => {
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
function ViewChild(arg0: string): (target: InicioAdminInstanciaComponent, propertyKey: "chartCanvas") => void {
  throw new Error('Function not implemented.');
}