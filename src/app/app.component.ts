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
  changeColors = false;
  modoOscuro = false;
  tipoUsuario: string  = '';
  tokenActual: string = '';
  idinstancia: any | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  
  email: string | null = null;

  constructor(private instanciaService: AppService,private router: Router,private api: GestorUsuariosService, private api2: AppService) {
    localStorage.setItem("headerSioNo", 'true');
    this.jwtHelper = new JwtHelperService();
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.email = localStorage.getItem('email');

  }

  ngOnInit(): void {
    this.funHeaderSioNo();
  
     // Recuperar el tipo de usuario del localStorage (si está almacenado)
     this.cambiarUsuarioSegunToken(this.tokenActual); 
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
 
  toggleColors() {
    this.changeColors = !this.changeColors;
  }

// Función para cambiar el tipo de usuario y almacenarlo en localStorage
  cambiarTipoUsuario(tipo: string) {
    this.tipoUsuario = tipo;
    localStorage.setItem('tipoUsuario', tipo);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("idInstancia");
    this.router.navigate(['/login']);

    this.ngOnInit();
  }

  cambiarUsuarioSegunToken(token: string) {
    if (token) {
      localStorage.removeItem("tipoUsuario");
      // Si hay un token válido, decodifica el token y obtén el rol del usuario.
      const decodedToken = this.jwtHelper.decodeToken(token);
      const rolUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.tipoUsuario = rolUsuario;
      localStorage.setItem('tipoUsuario', rolUsuario);

     /* this.idinstancia = localStorage.getItem('idInstancia');

      this.api2.getInstanciaPorId(this.idinstancia).subscribe({
        next: value => this.instanciaActual = value,
        error: err => { alert('Error al cargar las instancias: ' + err) }
      });*/
      if (this.email) {
        this.api.obtenerInfoUsuario(this.email).subscribe(
          (value) => {
            this.idinstancia = value.tenantInstanceId; // Asigna el valor a this.idinstancia
            localStorage.setItem('idInstancia', this.idinstancia); // Almacena en el localStorage
          },
          (error) => {
            alert('Error al cargar las instancias: ' + error);
          }
        );
      
      }


    } else {
      // Si no hay token (o es inválido), establece "sinlogin" como el tipo de usuario.
      this.tipoUsuario = 'noAutenticado';
      localStorage.setItem('tipoUsuario', 'noAutenticado');
    }
    
  }

  
}

