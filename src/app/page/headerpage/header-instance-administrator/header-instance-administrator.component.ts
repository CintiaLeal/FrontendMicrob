import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-header-instance-administrator',
  templateUrl: './header-instance-administrator.component.html',
  styleUrls: ['./header-instance-administrator.component.scss']
})
export class HeaderInstanceAdministratorComponent {
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

  /*toggleModoOscuro() {
    const valorActual = localStorage.getItem('modoOscuro');
    const nuevoValor = valorActual === 'true' ? 'false' : 'true';
    localStorage.setItem('modoOscuro', nuevoValor);
    console.log("llego al componente");
  }*/
  toggleModoOscuro() {
    this.appPrincipal.toggleModoOscuro();
  }
}
