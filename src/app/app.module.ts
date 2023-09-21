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

import { ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './page/inicio/inicio.component';
import { WebPrincipalComponent } from './page/webPrincipal/web-principal/web-principal.component';
import { InicioUsuarioComponent } from './page/inicio-usuario/inicio-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    NuevaInstanciaComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    InicioComponent,
    WebPrincipalComponent,
    InicioUsuarioComponent
  ],
  imports: [
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
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
