import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno} from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ColorHelper } from '@swimlane/ngx-charts';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';
import { forkJoin } from 'rxjs';
import { ChartDataset } from 'chart.js';
import 'chart.js/auto';
import { ChartItem } from 'chart.js/auto';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '../message.service';

interface Filtro {
  value: string;
  viewValue: string;
}
interface Tematica {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  like: number = 50;
  live: number = 50; 
  have: number = 50;
  born: number = 50;
  withHashtag: number = 50;
  posted: number = 50;
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
  Metricas:any[] | any;
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
  rangeOptions = [
    { start: 3, end: 20 },
    { start: 6, end: 20 },
    { start: 9, end: 20 },
    { start: 12, end: 20 }
  ];
  
  constructor(private messageService: MessageService,private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {
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
    { data: [], label: 'Total Usuarios', backgroundColor: '#6d6b74'  },
    { data: [], label: 'Nuevos Usuarios', backgroundColor: '#04b2d975' },
  ];
  ngOnInit(): void {
    this.isLoading1 = true;
    this.isLoading2 = true;
    this.isLoading3 = true;
    this.idinstancia = localStorage.getItem('idInstancia');
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');

   this.panel();
   this.obtenerCitys();
   this.obtenertopHastags(8);
   this.obtenerMetricas(6);
   this.texto = "Buenas";

   this.graficaUserMeses(3);
  }
  senttingSuggestUsersAllTenantL(like:any,live:any,have:any,born:any,withHashtag:any,posted:any){
    let x: any = {
        posted: like,
        live: live,
        like: posted,
        have:have,
        born:born,
        witH_HASHTAG:withHashtag
    };
    console.log(x);
    this.appNosql.SenttingSuggestUsersAllTenantL(x).subscribe(data => {
      this.messageService.showSuccess('Modificación correcta.');
    });
}
  obtenertopHastags(cantidad:any){
    if(this.idinstancia){
      this.appNosql.obtenertopHastags(cantidad).subscribe(
        (value) => {
          this.isLoading2 = false;
          this.topHastagsInicio = value;     
        });
      }
  }

  panel() {
    this.api.getCantidadUsuariosAllTenant().subscribe(
      data => {
        this.cantUser = data.total;
        this.increaseUser = data.increase;
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

    this.api.getCantUsersThisMonthAllTenant().subscribe(
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

  graficaUserMeses(cant:any){
//getNewMonthlyRegistrationsAllTenant(x:any,cant:any)
this.api.getNewMonthlyRegistrationsAllTenant(cant).subscribe(
  data => {
    this.graficaUserMes = data;
    console.log(this.graficaUserMes);
    this.isLoading3 = false;
        // Llena las etiquetas del gráfico con los meses
        this.barChartLabels = this.graficaUserMes.map((data) => data.month);

        // Llena los datos de la gráfica con los valores del backend
        this.barChartData[0].data = this.graficaUserMes.map((data) => data.newTotalUser);
        this.barChartData[1].data = this.graficaUserMes.map((data) => data.newTotalInstance);
  },
  error => {
    this.isLoading3 = false;
    console.error('Error al obtener la cantidad de usuarios:', error);
  }
);
  }
  

  obtenerCitys() {
    this.api.getCantUsersByCityAllTenan().subscribe(
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
  
  
  obtenerMetricas(cant:any) {
    this.api.getInstanceMetricsAllTenant(cant).subscribe(
      data => {
        this.Metricas = data;
        console.log(this.Metricas);
        this.isLoading3 = false;
      },
      error => {
        this.isLoading3 = false;
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

      

  } 
  
  
  
}
function ViewChild(arg0: string): (target: DashboardComponent, propertyKey: "chartCanvas") => void {
  throw new Error('Function not implemented.');
}

