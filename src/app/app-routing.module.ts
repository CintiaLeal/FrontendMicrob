import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaInstanciaComponent } from './page/nueva-instancia/nueva-instancia.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrarUsuarioComponent } from './page/registrar-usuario/registrar-usuario.component';
import { WebPrincipalComponent } from './page/webPrincipal/web-principal/web-principal.component';
import { InicioUsuarioComponent } from './page/inicio-usuario/inicio-usuario.component';
import { VerInstanciaComponent } from './page/webPrincipal/ver-instancia/ver-instancia.component';
import { InicioAdminInstanciaComponent } from './page/AdmInstancia/inicio-admin-instancia/inicio-admin-instancia.component';
import { AdmUsuarioInstanciaComponent } from './page/AdmInstancia/adm-usuario-instancia/adm-usuario-instancia.component';
import { AdmPublicacionesReportadasComponent } from './page/AdmInstancia/adm-publicaciones-reportadas/adm-publicaciones-reportadas.component';
import { InicioAdmPlataformaComponent } from './page/AdmPlataforma/inicio-adm-plataforma/inicio-adm-plataforma.component';
import { AdmPlataformaGestorInstanciaComponent } from './page/AdmPlataforma/adm-plataforma-gestor-instancia/adm-plataforma-gestor-instancia.component';
import { URLComponent } from './page/url/url.component';
import { ModeradorAdmComponent } from './page/moderador-adm/moderador-adm.component';
import { VerDetalleInstanciaComponent } from './page/AdmPlataforma/ver-detalle-instancia/ver-detalle-instancia.component';
import { ModificarInstanciaComponent } from './page/AdmPlataforma/modificar-instancia/modificar-instancia.component';
import { LoginRedSocialComponent } from './page/login-red-social/login-red-social.component';
import { ModificarUsuarioComponent } from './page/modificar-usuario/modificar-usuario.component';
import { DatosPruebasComponent } from './datos-pruebas/datos-pruebas.component';
import { AjustesSugerenciasComponent } from './page/ajustes-sugerencias/ajustes-sugerencias.component'; 
import { GestionTematicaComponent } from './gestion-tematica/gestion-tematica.component';
import { BorrarInstanciaComponent } from './page/AdmPlataforma/borrar-instancia/borrar-instancia.component';
import { GestionEstadisticasComponent } from './gestion-estadisticas/gestion-estadisticas.component';

const routes: Routes = [
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
  { path: 'inicioAdmPlataformaGestorInstancia', component: AdmPlataformaGestorInstanciaComponent },
  { path: 'moderadormodo', component: ModeradorAdmComponent },
  { path: 'ModificarInstancia/:Dominio', component: ModificarInstanciaComponent },
  { path: 'VerDetalleInstancia/:Dominio', component: VerDetalleInstanciaComponent },
  { path: 'loginRedSocial', component: LoginRedSocialComponent},
  {path:  'modificarUsuario', component : ModificarUsuarioComponent},
  {path:  'datos', component : DatosPruebasComponent},
  {path:  'ajusteSugerencia', component : AjustesSugerenciasComponent},
  { path: 'GestionTematicas', component: GestionTematicaComponent },  
  { path: 'BorrarInstancia/:Dominio', component: BorrarInstanciaComponent },
  { path: 'GestionEstadisticas', component: GestionEstadisticasComponent },
  { path: ':valorURL', component: URLComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
