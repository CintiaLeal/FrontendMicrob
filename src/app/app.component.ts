import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Instancia } from './modelos/instancia';
import { LoginService } from './servicios/login.service';
import { PartialObserver, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss']
})
export class AppComponent implements OnInit {
  instancia: Instancia | null = null;
  changeColors = false;

  constructor(private instanciaService: LoginService) {}

  ngOnInit(): void {
    this.obtenerInstanciaConMayorId();
  }

  async obtenerInstanciaConMayorId() {
    this.instanciaService.obtenerInstanciaConMayorId().subscribe(
      (instancia) => {
        this.instancia = instancia;
        if (this.instancia && this.instancia.esquemaColores === 'verde') {
          console.log(this.instancia.esquemaColores);
          this.toggleColors();
        }else{
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
