import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-moderador-adm',
  templateUrl: './moderador-adm.component.html',
  styleUrls: ['./moderador-adm.component.scss']
})
export class ModeradorAdmComponent {
  tipoU: string | null = null;

  constructor( private api: AppService, private app:AppComponent,private el: ElementRef, private renderer: Renderer2) {
    this.tipoU = localStorage.getItem('tipoUsuario');
  }

  ngOnInit(): void {
    this.tipoU = localStorage.getItem('tipoUsuario');
  }

}
