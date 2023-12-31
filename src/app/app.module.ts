import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NuevaInstanciaComponent } from './page/nueva-instancia/nueva-instancia.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';
import { RegistrarUsuarioComponent } from './page/registrar-usuario/registrar-usuario.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import { ReactiveFormsModule } from '@angular/forms';
import { WebPrincipalComponent } from './page/webPrincipal/web-principal/web-principal.component';
import { InicioUsuarioComponent } from './page/inicio-usuario/inicio-usuario.component';
import { VerInstanciaComponent } from './page/webPrincipal/ver-instancia/ver-instancia.component';
import { InicioAdminInstanciaComponent } from './page/AdmInstancia/inicio-admin-instancia/inicio-admin-instancia.component';
import { AdmUsuarioInstanciaComponent } from './page/AdmInstancia/adm-usuario-instancia/adm-usuario-instancia.component';
import { AdmPublicacionesReportadasComponent } from './page/AdmInstancia/adm-publicaciones-reportadas/adm-publicaciones-reportadas.component';
import { InicioAdmPlataformaComponent } from './page/AdmPlataforma/inicio-adm-plataforma/inicio-adm-plataforma.component';
import { AdmPlataformaGestorInstanciaComponent } from './page/AdmPlataforma/adm-plataforma-gestor-instancia/adm-plataforma-gestor-instancia.component';
import { URLComponent } from './page/url/url.component';
import { HeaderComponent } from './page/headerpage/header/header.component';
import { HeaderPlatformAdministratorComponent } from './page/headerpage/header-platform-administrator/header-platform-administrator.component';
import { HeaderModeratorComponent } from './page/headerpage/header-moderator/header-moderator.component';
import { HeaderInstanceAdministratorComponent } from './page/headerpage/header-instance-administrator/header-instance-administrator.component';
import { ModeradorAdmComponent } from './page/moderador-adm/moderador-adm.component';
import { VerDetalleInstanciaComponent } from './page/AdmPlataforma/ver-detalle-instancia/ver-detalle-instancia.component';
import { ModificarInstanciaComponent } from './page/AdmPlataforma/modificar-instancia/modificar-instancia.component';
import { LoginRedSocialComponent } from './page/login-red-social/login-red-social.component';
import { MatNativeDateModule} from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModificarUsuarioComponent } from './page/modificar-usuario/modificar-usuario.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment'; 

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';

import {MatListModule} from '@angular/material/list';
import { DatosPruebasComponent } from './datos-pruebas/datos-pruebas.component';
import { AjustesSugerenciasComponent } from './page/ajustes-sugerencias/ajustes-sugerencias.component';
import { BorrarInstanciaComponent } from './page/AdmPlataforma/borrar-instancia/borrar-instancia.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionEstadisticasComponent } from './gestion-estadisticas/gestion-estadisticas.component';
import { GestionTematicaComponent } from './gestion-tematica/gestion-tematica.component';

import { MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication } from "@azure/msal-browser";

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;


@NgModule({
  declarations: [
    AppComponent,
    NuevaInstanciaComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    WebPrincipalComponent,
    InicioUsuarioComponent,
    VerInstanciaComponent,
    InicioAdminInstanciaComponent,
    AdmUsuarioInstanciaComponent,
    AdmPublicacionesReportadasComponent,
    InicioAdmPlataformaComponent,
    AdmPlataformaGestorInstanciaComponent,
    URLComponent,
    HeaderComponent,
    HeaderPlatformAdministratorComponent,
    HeaderModeratorComponent,
    HeaderInstanceAdministratorComponent,
    ModeradorAdmComponent,
    ModificarInstanciaComponent,
    VerDetalleInstanciaComponent,
    LoginRedSocialComponent,
    ModificarUsuarioComponent,
    DatosPruebasComponent,
    AjustesSugerenciasComponent,
    BorrarInstanciaComponent,
    NavigationComponent,
    DashboardComponent,
    GestionEstadisticasComponent,
    GestionTematicaComponent
  ],
  imports: [
    MatSortModule,
    MatSidenavModule,
    MatSliderModule,
    HttpClientModule,
    BrowserModule,
    MatRadioModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatTooltipModule,
    BrowserModule,
    NgChartsModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatListModule,
    MatProgressSpinnerModule

  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }