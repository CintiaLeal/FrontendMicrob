import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';

@Component({
  selector: 'app-moderador-adm',
  templateUrl: './moderador-adm.component.html',
  styleUrls: ['./moderador-adm.component.scss']
})
export class ModeradorAdmComponent {
  tipoU: string | null = null;
  public base64Image: any;
  panelOpenState = false;
 
  idinstancia: string | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;
  usuarios: any;
  cantUser:any;
  cantMode:any;
  cantPost: any;
  ultimosUsuarios: any[] | any;
  usuariosForCity:any[] | any;
  topHastagsInicio: any [] =[];
  texto:string = '';
  isLoading = false;
  cantUserMes:any;
  increaseUserMes:any;
  increaseUser:any;
  cantTodalusuarios:any;
  cantidadUsuariosReportado:any;
  cantPostInst:any;
  cantPostReportados:any;
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
 
  ngOnInit(): void {
    this.isLoading = true;
    this.idinstancia = localStorage.getItem('idInstancia');
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');

    this.api.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
    });
   
   this.obtenerCitys();
   this.obtenertopHastags(8);
   this.texto = "Buenas #Hola";
   this.panel();

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
          this.topHastagsInicio = value;     
        });
      }
  }


  

  obtenerCitys() {
    this.api.getCantUsersByCityByTenan(this.idinstancia).subscribe(
      data => {
        this.usuariosForCity = data;
        console.log(this.usuariosForCity);
       
      },
      error => {
     
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

  panel() {
    this.api.getCantidadUsuariosByTenant(this.idinstancia).subscribe(
      data => {
        this.cantUser = data.total;
        this.increaseUser = data.increase;
       

        this.api.getGetUsersByInstancePaginado(this.idinstancia, 1, 500).subscribe((users: any[]) => {
          this.cantTodalusuarios = users.length;
          this.cantidadUsuariosReportado = this.cantUser - this.cantTodalusuarios;
        }, (error) => {
        });
      },
      error => {
      
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

    this.api.getCantUsersThisMonthByTenant(this.idinstancia).subscribe(
      data => {
        this.cantUserMes = data.total;
        this.increaseUserMes = data.increase;
        
   
      },
      error => {
       
        console.error('Error al obtener la cantidad de usuarios:', error);
      }
    );

  }
  
  

}
