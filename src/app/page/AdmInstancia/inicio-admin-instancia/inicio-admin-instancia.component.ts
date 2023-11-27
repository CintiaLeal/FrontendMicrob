import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno} from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';
import { ChartOptions, ChartType } from 'chart.js';
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
  constructor(private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.app.ngOnInit();
   }
 
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
  
          this.isLoading1 = false;
      },
      error: err => {
        this.isLoading1 = false;
        alert('Error al cargar las instancias: ' + err);
        console.error('Error al obtener usuarios:', err);
      }
    });
  }
  

  obtenerCitys() {
    this.api.obtenerUsuarios(this.idinstancia).subscribe({
      next: users => {
        // Crear un objeto para almacenar la cantidad de usuarios por ciudad
        const usuariosPorCiudad: { [cityName: string]: number } = {};
  
        // Recorrer los usuarios
        users.forEach(user => {
          // Verificar si el usuario tiene la propiedad city
          if (user.city && user.city.name) {
            const cityName = user.city.name;
            this.isLoading3 = false;
            // Incrementar el contador de la ciudad actual
            usuariosPorCiudad[cityName] = (usuariosPorCiudad[cityName] || 0) + 1;
          }
        });
  
        // Ordenar el objeto por la cantidad de usuarios de manera descendente
        const ciudadesOrdenadas: { key: string; value: number }[] = Object.entries(usuariosPorCiudad)
          .sort(([, a], [, b]) => b - a)
          .map(([key, value]) => ({ key, value }));
  
        // Loguear la cantidad de usuarios por ciudad ordenada
        console.log('Cantidad de usuarios por ciudad (ordenada):', ciudadesOrdenadas);
  
        // Asignar el array ordenado a this.usuariosForCity
        this.usuariosForCity = ciudadesOrdenadas;
      },
      error: err => {
        this.isLoading3 = false;
        alert('Error al cargar las instancias: ' + err);
        console.error('Error al obtener usuarios:', err);
      }
    });
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
