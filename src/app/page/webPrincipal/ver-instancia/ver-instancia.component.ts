import { Component } from '@angular/core';

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
export class VerInstanciaComponent {
  foods: Filtro[] = [
    {value: 'opcion0', viewValue: 'Todas'},
    {value: 'opcion1', viewValue: 'Público'},
    {value: 'opcion2', viewValue: 'Privados'}
  ];
  tematicas: Tematica[] = [
    {value: 'todas', viewValue: 'Todas'},
    {value: 'musica', viewValue: 'Música'},
    {value: 'deporte', viewValue: 'Deporte'},
    {value: 'anime', viewValue: 'Anime'}
  ];
}
