import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Login } from 'src/app/modelos/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from 'src/app/servicios/app.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  tipoUsuario: string | null = null;
  tokens: string | null = null;
  tipoU: { [key: string]: string } | null = null;
  idT: string | null = null;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  jwtHelper: any;

  constructor(private api: AppService, private router: Router, private app: AppComponent,private messageService: MessageService) { this.jwtHelper = new JwtHelperService(); }

  ngOnInit(): void {
  }
  onLogin() {
    let x: Login = {
      username: this.loginForm.controls["username"].value ? this.loginForm.controls["username"].value : " ",
      password: this.loginForm.controls["password"].value ? this.loginForm.controls["password"].value : " "
    }
  
    this.api.loginByEmail(x,0).subscribe(
      (data) => {
        localStorage.setItem("token", data.token);
        this.tokens = data.token;
        localStorage.setItem("userName", x.username);
        const decodedToken = this.jwtHelper.decodeToken(this.tokens);
        this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if(this.tipoUsuario == 'Platform-Administrator') {
            localStorage.setItem("tipoUsuario", 'Platform-Administrator');
            this.router.navigate(['/inicioAdmPlataforma']);
            this.messageService.showSuccess('Inicio de sesión exitoso como administrador de plataforma.');
        }
        else{
        this.messageService.showError('Solo pueden entrar de este modo los administrador de plataforma.');

        }
      },
      (error) => {
        this.messageService.showError('Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo de nuevo.');
      }
    );
  }
}


