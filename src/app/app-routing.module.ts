import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaInstanciaComponent } from './page/nueva-instancia/nueva-instancia.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrarUsuarioComponent } from './page/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { WebPrincipalComponent } from './page/webPrincipal/web-principal/web-principal.component';
import { InicioUsuarioComponent } from './page/inicio-usuario/inicio-usuario.component';
import { VerInstanciaComponent } from './page/webPrincipal/ver-instancia/ver-instancia.component';
import { InicioAdminInstanciaComponent } from './page/AdmInstancia/inicio-admin-instancia/inicio-admin-instancia.component';
import { AdmUsuarioInstanciaComponent } from './page/AdmInstancia/adm-usuario-instancia/adm-usuario-instancia.component';
import { AdmPublicacionesReportadasComponent } from './page/AdmInstancia/adm-publicaciones-reportadas/adm-publicaciones-reportadas.component';
import { InicioAdmPlataformaComponent } from './page/AdmPlataforma/inicio-adm-plataforma/inicio-adm-plataforma.component';
import { AdmPlataformaGestorInstanciaComponent } from './page/AdmPlataforma/adm-plataforma-gestor-instancia/adm-plataforma-gestor-instancia.component';
const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: WebPrincipalComponent },
  { path: 'inicioUsuario', component: InicioUsuarioComponent },
  { path: 'registrarInstancia', component: NuevaInstanciaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
  { path: 'verInstancia', component: VerInstanciaComponent },
  { path: 'inicioAdm', component: InicioAdminInstanciaComponent },
  { path: 'admUsuario', component: AdmUsuarioInstanciaComponent },
  { path: 'admPublicaciones', component: AdmPublicacionesReportadasComponent },
  { path: 'inicioAdmPlataforma', component: InicioAdmPlataformaComponent },
  { path: 'inicioAdmPlataformaGestorInstancia', component: AdmPlataformaGestorInstanciaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
