import { Component, OnInit } from '@angular/core';
import { Instancia } from './modelos/instancia';
import { AppService } from './servicios/app.service';
import { PartialObserver, Subject, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InstanciaRetorno } from './modelos/instanciaRetorno';
import { GestorUsuariosService } from './servicios/gestor-usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss']
})
export class AppComponent implements OnInit {
  jwtHelper: any;
  instancia: Instancia | null = null;
  esquemaColor1: boolean = true;
  modoOscuro = false;
  tipoUsuario: string  = '';
  tokenActual: string = '';
  idinstancia: any | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  colores: any| null = null;
  email: string | null = null;
  esquemaColores:any| null =null;
  reloadHtml: boolean = false;

  constructor(private instanciaService: AppService,private router: Router,private api: GestorUsuariosService, private api2: AppService) {
    localStorage.setItem("headerSioNo", 'true');
    this.jwtHelper = new JwtHelperService();
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.email = localStorage.getItem('email');

  }

  ngOnInit(): void {
    this.funHeaderSioNo();
    this.colores = 'esquemaColor1';
    
  
     // Recuperar el tipo de usuario del localStorage (si está almacenado)
     this.cambiarUsuarioSegunToken(this.tokenActual); 

     this.reloadComponent();
  }
  reloadComponent() {
    this.reloadHtml = true;
  }
  
  funHeaderSioNo() {
    if (localStorage.getItem("headerSioNo") === 'true') {
      return true;
    } else {
      return false;
    }
  }
  
  toggleModoOscuro() {
    this.modoOscuro = !this.modoOscuro;

  }
 

// Función para cambiar el tipo de usuario y almacenarlo en localStorage
  cambiarTipoUsuario(tipo: string) {
    this.tipoUsuario = tipo;
    localStorage.setItem('tipoUsuario', tipo);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idInstancia");
    localStorage.removeItem("esquemaColores");
    localStorage.removeItem("valorURL");

    localStorage.setItem('tipoUsuario', 'noAutenticado');
    this.router.navigate(['/']);
    this.ngOnInit();
  }
  cambiarUsuarioSegunToken(token: string) {
    if (token) {
      localStorage.removeItem("tipoUsuario");
      const decodedToken = this.jwtHelper.decodeToken(token);
      const rolUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.tipoUsuario = rolUsuario;
      localStorage.setItem('tipoUsuario', rolUsuario);
      this.email = localStorage.getItem('email');
      
      if (this.email) {
        this.api.obtenerInfoUsuario(this.email).subscribe(
          (value) => {
            if (value && value.tenantInstanceId) { // Verifica si 'value' y 'tenantInstanceId' existen
              this.idinstancia = value.tenantInstanceId;
              localStorage.setItem('idInstancia', this.idinstancia);
            } else {
              console.error('Error: tenantInstanceId no encontrado en el valor obtenido.');
            }
          },
          (error) => {
            alert('Error al cargar las instancias: ' + error);
          }
        );
  /*
        this.idinstancia = localStorage.getItem('idInstancia');
        if (this.idinstancia) { // Verifica si 'idinstancia' existe
          this.api2.getInstanciaPorId(this.idinstancia).subscribe({
            next: value => {
              this.instanciaActual = value;
              if (this.instanciaActual && this.instanciaActual.esquemaColores !== undefined) {
                localStorage.setItem('esquemaColores', this.instanciaActual.esquemaColores.toString());
              }
            },
            error: err => {
              alert('Error al cargar las instancias: ' + err);
            }
          });
        } else {
          console.error('Error: idInstancia no encontrado en el localStorage.');
        }*/
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("tipoUsuario");
      localStorage.removeItem("idInstancia");
      localStorage.removeItem("esquemaColores");
      this.tipoUsuario = 'noAutenticado';
      localStorage.setItem('tipoUsuario', 'noAutenticado');
    }
  }
  
}

