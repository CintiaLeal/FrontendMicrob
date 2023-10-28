import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router,private api: AppService) {}
  instanciaActual: InstanciaRetorno | null=null;

  ngOnInit(): void {
    //localStorage.setItem('valorURL', this.valorURL);

    this.api.getInstanciaPorId(2).subscribe({
      next: value => this.instanciaActual = value,
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
}
