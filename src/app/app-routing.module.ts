import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaInstanciaComponent } from './page/nueva-instancia/nueva-instancia.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrarUsuarioComponent } from './page/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { WebPrincipalComponent } from './page/webPrincipal/web-principal/web-principal.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: WebPrincipalComponent },
  { path: 'registrarInstancia', component: NuevaInstanciaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
