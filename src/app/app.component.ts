import { Component, OnInit } from '@angular/core';
import { Instancia } from './modelos/instancia';
import { LoginService } from './servicios/login.service';
import { PartialObserver, Subject, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss']
})
export class AppComponent implements OnInit {
  instancia: Instancia | null = null;
  changeColors = false;
  modoOscuro = false;

  constructor(private instanciaService: LoginService) {
    localStorage.setItem("headerSioNo", 'true');
  }

  ngOnInit(): void {
    this.funHeaderSioNo();
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

}

