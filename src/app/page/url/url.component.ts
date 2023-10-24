import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { Login } from 'src/app/modelos/login';
import { AppService } from 'src/app/servicios/app.service';
import { GestorUsuariosService } from 'src/app/servicios/gestor-usuarios.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class URLComponent {
  valorURL: string | null=null;
  instanciaActual: InstanciaRetorno | null=null;
  errorEncontrado: number = 0;
  tokens: string | null = null;
  tipoU: any| null = null;
  esquemaColor1: boolean = true;
  tipoUsuario: string | null = null;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  jwtHelper: any;
  
  constructor( private app: AppComponent,private router: Router,private route: ActivatedRoute,private api: AppService,private api2: GestorUsuariosService) {this.jwtHelper = new JwtHelperService();}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.valorURL = params['valorURL'];
    });

    if (this.valorURL !== null) {
      localStorage.setItem('valorURL', this.valorURL);

      this.api.getInstanciaPorId(this.valorURL).subscribe({
        next: value => this.instanciaActual = value,
        error: err => {
          this.errorEncontrado = 1; // Establecer errorEncontrado en 1 en caso de error
        }
      });
    } else {
      this.errorEncontrado = 1; // Establecer errorEncontrado en 1 si no se encuentra valorURL
    }
  }


  onLogin() {
    let x: Login = {
      email: this.loginForm.controls["email"].value ? this.loginForm.controls["email"].value : " ",
      password: this.loginForm.controls["password"].value ? this.loginForm.controls["password"].value : " "
    }
    this.api2.loginByEmail(x,this.valorURL).subscribe(data => {
      localStorage.setItem("token", data.token);
      this.tokens = data.token;
      localStorage.setItem("email", x.email);
      
      const decodedToken = this.jwtHelper.decodeToken(this.tokens);
      this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      switch (this.tipoUsuario) {
        case 'Platform-Administrator':
          localStorage.setItem("tipoUsuario", 'Platform-Administrator');  
          this.router.navigate(['/ruta_para_administrador_de_plataforma']);
          break;
        case 'Instance-Administrator':
          localStorage.setItem("tipoUsuario", 'Instance-Administrator');  
          this.router.navigate(['/inicioAdm']);
          break;
        case 'Moderator':
          localStorage.setItem("tipoUsuario", 'Moderator');  
          this.router.navigate(['/ruta_para_moderador']);
          break;
        case 'Common-User':
          localStorage.setItem("tipoUsuario", 'Common-User');  
          this.router.navigate(['/inicioUsuario']);
          break;
        default:
          // Manejar otros roles o casos
        break;
      }
    });
  }

  decodeToken(token: string) {
    console.log("llego al deco");
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    console.log("aud: ", decodedToken.aud);
    console.log("exp: ", decodedToken.exp);
    console.log("Role: ", decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    console.log("name: ", decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    console.log("iss: ", decodedToken.iss);

    this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('tipoUsuario', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

    this.app.cambiarTipoUsuario(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  }
}