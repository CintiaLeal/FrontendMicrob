import { Component, ElementRef, Renderer2 } from '@angular/core';
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
   this.panel();
   this.obtenerCitys();
   this.obtenertopHastags(8);
   this.texto = "Buenas #Hola"
  }

  obtenertopHastags(cantidad:any){
    if(this.idinstancia){
      this.appNosql.getHastgas(this.idinstancia,cantidad).subscribe(
        (value) => {
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
  

  obtenerCitys() {
    this.api.obtenerUsuarios(this.idinstancia).subscribe({
      next: users => {
        // Crear un objeto para almacenar la cantidad de usuarios por ciudad
        const usuariosPorCiudad: { [cityName: string]: number } = {};

        users.forEach(user => {

          if (user.city && user.city.name) {
            const cityName = user.city.name;
  
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
        alert('Error al cargar las instancias: ' + err);
        console.error('Error al obtener usuarios:', err);
      }
    });
  }
  
  
  
  

}
