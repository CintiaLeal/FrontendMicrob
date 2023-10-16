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

export class AppService {

  url: string = "https://localhost:7131"; //URL BASE
    constructor(private http: HttpClient) { }

  
  registrarUsuario(form: Usuario): Observable<ResponseI> {
    let direccion = this.url + "/Account/Registration";
    return this.http.post<any>(direccion, form); 
  }

  obtenerInstancias(): Observable<Instancia[]> {
    let direccion = this.url + "/instancia/listar";// Ruta correspondiente a la obtención de instancias
    return this.http.get<Instancia[]>(direccion);
  }
  obtenerInstanciaConMayorId(): Observable<Instancia> {
    const direccion = `${this.url}/instancia/obtener-mayor-id`; // Ruta correspondiente para obtener la instancia con el mayor ID
    return this.http.get<Instancia>(direccion);
  }

  crearInstancias (instanciaNueva: InstanciaNueva ): Observable<ResponseI> {
       // Crea un objeto que coincida con la estructura de tu clase Instancia
       const instanciaData = {
        logo: instanciaNueva.logo,
        nombre: instanciaNueva.nombre,
         tematica: instanciaNueva.tematica,
         privacidad: instanciaNueva.privacidad,
         esquemaColores: instanciaNueva.esquemaColores,
         activo:instanciaNueva.activo,
         dominio: instanciaNueva.dominio
   
       };
       // Realiza la solicitud POST con el objeto instanciaData
       let direccion = this.url + "/CreateInstance";
       return this.http.post<any>(direccion, instanciaData); 
     }

     getInstancia(): Observable<Instancia[]> {
      return this.http.get<Instancia[]>(this.url+"/Instance/GetInstances");
    }

 
  
}
