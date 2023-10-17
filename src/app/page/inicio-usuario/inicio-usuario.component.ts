import { Component } from '@angular/core';

import { GestorUsuariosService } from 'src/app/servicios/gestor-usuarios.service';
import { AppService } from 'src/app/servicios/app.service';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.scss']
})
export class InicioUsuarioComponent {
  contenidoVisible: string = 'home'; // Inicialmente, muestra el primer contenido
  tipoU: string | null = null;
  email: string | null = null;
  usuario: UsuarioRetorno | null =null;
  idinstancia: any | null = null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;

  mostrarContenido(contenido: string) {
    this.contenidoVisible = contenido;
    
  }
  
  constructor(private api: GestorUsuariosService, private api2: AppService, private app:AppComponent) {
    this.tipoU = localStorage.getItem('tipoUsuario');
   }

  ngOnInit(): void {
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.email = localStorage.getItem('email');
    this.idinstancia = localStorage.getItem('idInstancia');
    
    if (this.email) {
      this.api.obtenerInfoUsuario(this.email).subscribe(
        (value) => {
          this.idinstancia = value.tenantInstanceId; // Asigna el valor a this.idinstancia
          localStorage.setItem('idInstancia', this.idinstancia); // Almacena en el localStorage
          this.usuario = value; // Asigna el valor de 'value' a this.usuario
          console.log(this.usuario);
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
    
    }
    this.idinstancia = localStorage.getItem('idInstancia');
    this.api2.getInstanciaPorId(this.idinstancia).subscribe({
      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) }
    });
    this.app.cambiarUsuarioSegunToken(this.tokenActual);
    

  }
}
