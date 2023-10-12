import { Component, OnInit } from '@angular/core';
import { Instancia } from './modelos/instancia';
import { AppService } from './servicios/app.service';
import { PartialObserver, Subject, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss']
})
export class AppComponent implements OnInit {
  instancia: Instancia | null = null;
  changeColors = false;
  modoOscuro = false;
  tipoUsuario: string = 'noAutenticado';

  constructor(private instanciaService: AppService,private router: Router) {
    localStorage.setItem("headerSioNo", 'true');
  }

  ngOnInit(): void {
    this.funHeaderSioNo();
     // Recuperar el tipo de usuario del localStorage (si está almacenado)
     localStorage.getItem('tipoUsuario'); // || 'noAutenticado';
     this.cambiarTipoUsuario(this.tipoUsuario);
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
}

