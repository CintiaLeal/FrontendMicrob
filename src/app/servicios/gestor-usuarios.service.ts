import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../modelos/login';
import { ResponseI } from '../modelos/response.interface';
import { Usuario } from '../modelos/usuario';
import { Instancia } from '../modelos/instancia';
import { InstanciaNueva } from "../modelos/instanciaNueva";
@Injectable({
  providedIn: 'root'
})
export class GestorUsuariosService {

  url: string = "https://localhost:7131"; //URL BASE
  constructor(private http: HttpClient) { }

 //Inicio Login por email 
  loginByEmail(form: Login) {
    let direccion = this.url + "/Account/Login"; //URL ESPECIFICA
    return this.http.post<any>(direccion, form);
  }
 //Fin Login por email
}
