import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-header-platform-administrator',
  templateUrl: './header-platform-administrator.component.html',
  styleUrls: ['./header-platform-administrator.component.scss']
})
export class HeaderPlatformAdministratorComponent {
  constructor(private router: Router,private api: AppService, private appPrincipal:AppComponent) {}


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
