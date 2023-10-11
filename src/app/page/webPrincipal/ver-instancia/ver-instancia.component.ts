import { Component, OnInit } from '@angular/core';
import { Instancia } from 'src/app/modelos/instancia';
import { AppService } from 'src/app/servicios/app.service';

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
  constructor(private api: AppService ){ }
  tematicaSeleccionada: string | null = null;
    //Para listar las instancias
    public instancias: Instancia[] = [];
  ngOnInit(): void {

    this.api.getInstancia().subscribe({
      next: value => this.instancias = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
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
      this.instancias = this.instancias.filter(x => x.tematica === this.tematicaSeleccionada);
    }
  }

}