import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.scss']
})
export class InicioUsuarioComponent {

  contenidoVisible: string = 'home'; // Inicialmente, muestra el primer contenido

  mostrarContenido(contenido: string) {
    this.contenidoVisible = contenido;
  }
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("headerSioNo", 'false');
  }
  ngOnDestroy(): void {
    localStorage.setItem("headerSioNo", 'true');
  }
}
