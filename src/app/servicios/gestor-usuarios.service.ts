import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Login } from '../modelos/login';
import { ResponseI } from '../modelos/response.interface';
import { Usuario } from '../modelos/usuario';
import { Instancia } from '../modelos/instancia';
import { InstanciaNueva } from "../modelos/instanciaNueva";
import { UsuarioRetorno } from '../modelos/usuarioRetorno';
@Injectable({
  providedIn: 'root'
})
export class GestorUsuariosService {

  
  url: string = "https://localhost:7131"; //URL BASE
  constructor(private http: HttpClient) { }

 //Inicio Login por email 
  loginByEmail(form: Login, x:any) {
    console.log("llega"+x);
    const headers = new HttpHeaders({
      'tenant': x
    });
    let direccion = this.url + "/Account/Login"; //URL ESPECIFICA
    return this.http.post<any>(direccion, form,{ headers: headers });
  }
 //Fin Login por email

 //Ini getUsers 
 //https://localhost:7131/Account/GetUsersByInstance
 obtenerUsuarios(): Observable<Usuario[]> {
  let direccion = this.url + "/Account/GetUsersByInstance";// Ruta correspondiente a la obtención de instancias
  return this.http.get<Usuario[]>(direccion);
}

obtenerInfoUsuario(email: string): Observable<UsuarioRetorno> {
  let direccion = this.url + "/Account/GetUser?userEmail=" + encodeURIComponent(email);
  return this.http.get<UsuarioRetorno>(direccion);
}
}
