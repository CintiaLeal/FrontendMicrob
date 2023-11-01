import { Component, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-inicio-adm-plataforma',
  templateUrl: './inicio-adm-plataforma.component.html',
  styleUrls: ['./inicio-adm-plataforma.component.scss']
})
export class InicioAdmPlataformaComponent {
  tipoU: string | null = null;
  constructor( private api: AppService, private app:AppComponent) {
    this.tipoU = localStorage.getItem('tipoUsuario');
  }

  ngOnInit(): void {
    this.tipoU = localStorage.getItem('tipoUsuario');
  }
}
