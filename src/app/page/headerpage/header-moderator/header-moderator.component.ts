import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-header-moderator',
  templateUrl: './header-moderator.component.html',
  styleUrls: ['./header-moderator.component.scss']
})
export class HeaderModeratorComponent {
  constructor(private router: Router,private api: AppService, private appPrincipal:AppComponent) {}
  instanciaActualParaHeader: InstanciaRetorno | null=null;
  idinstancia: any | null = null;
  modoOscuro = false;

  
  ngOnInit(): void {
    this.idinstancia = localStorage.getItem('idInstancia');
    this.api.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActualParaHeader = value,
      error: err => {
      }
    });
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idInstancia");
    localStorage.removeItem("esquemaColores");
    localStorage.removeItem("valorURL");
    localStorage.setItem('tipoUsuario', 'noAutenticado');
    this.router.navigate(['/']);
  }

  toggleModoOscuro() {
    this.appPrincipal.toggleModoOscuro();
  }
}
