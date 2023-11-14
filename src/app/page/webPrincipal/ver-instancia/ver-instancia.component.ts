import { Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Instancia } from 'src/app/modelos/instancia';
import { AppService } from 'src/app/servicios/app.service';
import { Router } from '@angular/router';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppComponent } from 'src/app/app.component';

interface Filtro {
  value: string;
  viewValue: string;
}
interface Tematica {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ver-instancia',
  templateUrl: './ver-instancia.component.html',
  styleUrls: ['./ver-instancia.component.scss']
})
export class VerInstanciaComponent implements OnInit {
  constructor(private api: AppService, private router: Router, private app:AppComponent ){ }
  tematicaSeleccionada: string | null = null;
    //Para listar las instancias
    instancias: any[] = []; // Asegúrate de ajustar el tipo según lo que devuelve tu API
  instanciasCargadas: boolean = false;

  ngOnInit(): void {
    this.api.getInstancia().subscribe({
      next: value => {
        this.instancias = value;
        this.instanciasCargadas = true; // Marcamos que las instancias han sido cargadas
      },
      error: error => {
        console.error('Error al obtener instancias:', error);
      }
    });
  }

  //Para los desplegables
  foods: Filtro[] = [
    {value: 'opcion0', viewValue: 'Todas'},
    {value: 'opcion1', viewValue: 'Público'},
    {value: 'opcion2', viewValue: 'Privados'}
  ];
  tematicas: Tematica[] = [
    {value: '1', viewValue: 'Todas'},
    {value: 'Música', viewValue: 'Música'},
    {value: 'Fútbol', viewValue: 'Fútbol'},
    {value: 'Películas', viewValue: 'Películas'}
  ];

  aplicarFiltro() {
    // Si se selecciona "Todas", mostrar todas las instancias
    if (this.tematicaSeleccionada === '1') {
      this.tematicaSeleccionada = null;
      this.ngOnInit();
    } else {
      // Aplicar filtro basado en la temática seleccionada
     //this.instancias = this.instancias.filter(x => x.tematica === this.tematicaSeleccionada);
    }
  }

  navegarAOtroComponente(x:any,y:any) {
    localStorage.setItem("idInstancia", x);
    localStorage.setItem("valorURL", y);
    console.log("aca llego");
    this.app.ngOnInit();
    this.router.navigate(['/' + y]);
  }
}
