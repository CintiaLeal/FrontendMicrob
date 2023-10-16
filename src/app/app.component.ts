import { Component, OnInit } from '@angular/core';
import { Instancia } from './modelos/instancia';
import { AppService } from './servicios/app.service';
import { PartialObserver, Subject, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
// Supongamos que tienes un token almacenado en la variable 'token'.



  constructor(private instanciaService: AppService,private router: Router) {
    localStorage.setItem("headerSioNo", 'true');
    this.jwtHelper = new JwtHelperService();
    this.tokenActual = localStorage.getItem('token') ?? '';


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
  
  async obtenerInstanciaConMayorId() {
    this.instanciaService.obtenerInstanciaConMayorId().subscribe(
      (instancia) => {
        this.instancia = instancia;
        if (this.instancia && this.instancia.esquemaColores === 'verde') {
          console.log(this.instancia.esquemaColores);
          this.toggleColors();
        } else {
          this.changeColors = false;
        }
      },
      (error) => {
        console.error('Error al obtener la instancia con mayor ID:', error);
      }
    );
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
    localStorage.removeItem("token")
    this.router.navigate(['/login']);
  }

  cambiarUsuarioSegunToken(token: string) {
    
    if (token) {
      // Si hay un token válido, decodifica el token y obtén el rol del usuario.
      const decodedToken = this.jwtHelper.decodeToken(token);
      const rolUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.tipoUsuario = rolUsuario;
      localStorage.setItem('tipoUsuario', rolUsuario);
    } else {
      // Si no hay token (o es inválido), establece "sinlogin" como el tipo de usuario.
      this.tipoUsuario = 'sinlogin';
      localStorage.setItem('tipoUsuario', 'sinlogin');
    }
  }
  
}

