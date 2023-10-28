import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Login } from '../modelos/login';
import { ResponseI } from '../modelos/response.interface';
import { Usuario } from '../modelos/usuario';
import { Instancia } from '../modelos/instancia';
import { InstanciaRetorno } from '../modelos/instanciaRetorno';
import { UsuarioRetorno } from '../modelos/usuarioRetorno';
import {Post} from '../modelos/post';
@Injectable({
  providedIn: 'root'
})

export class AppService {

  url: string = "https://localhost:7131"; //URL BASE
  constructor(private http: HttpClient) { }


  registrarUsuario(form: Usuario, x: any): Observable<ResponseI> {
    let direccion = this.url + "/Account/Registration";
    const headers = new HttpHeaders({
      'tenant': x
    });
    return this.http.post<any>(direccion, form, { headers: headers });
  }

  obtenerInstancias(): Observable<Instancia[]> {
    let direccion = this.url + "/instancia/listar";// Ruta correspondiente a la obtención de instancias
    return this.http.get<Instancia[]>(direccion);
  }
  obtenerInstanciaConMayorId(): Observable<Instancia> {
    const direccion = `${this.url}/instancia/obtener-mayor-id`; // Ruta correspondiente para obtener la instancia con el mayor ID
    return this.http.get<Instancia>(direccion);
  }

  crearInstancias(instanciaNueva: Instancia): Observable<ResponseI> {
    const headers = new HttpHeaders({
      'userEmail': 'anabrown@example.com'
    });

    // Realiza la solicitud POST con el objeto instanciaData
    let direccion = this.url + "/Instance/CreateInstance?userEmail=anabrown%40example.com";
    return this.http.post<any>(direccion, instanciaNueva);
  }

  getInstancia(): Observable<InstanciaRetorno[]> {
    return this.http.get<InstanciaRetorno[]>(this.url + "/Instance/GetActiveInstances");
  }

  getInstanciaPorId(x: any): Observable<InstanciaRetorno> {
    const url = `${this.url}/Instance/GetInstanceById?instanceId=${x}`;
    return this.http.get<InstanciaRetorno>(url);
  }



 //Inicio Login por email 
 loginByEmail(form: Login, x:any) {
  console.log("llega"+ x);
  const headers = new HttpHeaders({
    'tenant': x
  });
  let direccion = this.url + "/Account/Login"; //URL ESPECIFICA
  return this.http.post<any>(direccion, form,{ headers: headers });
}
//Fin Login por email

obtenerUsuarios(): Observable<Usuario[]> {
let direccion = this.url + "/Account/GetUsersByInstance";
return this.http.get<Usuario[]>(direccion);
}

obtenerInfoUsuario(userName: string, x:any): Observable<UsuarioRetorno> {
  const headers = new HttpHeaders({
    'tenant': x
  });
let direccion = this.url + "/Account/GetUser?userName=" + encodeURIComponent(userName);
return this.http.get<UsuarioRetorno>(direccion,{ headers: headers });
}

newPost(form: any, x: any, userName: any) {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  const params = new HttpParams().set('userName', userName); // Agrega userName como parámetro

  const direccion = this.url + "/Post/CreatePost";
  
  return this.http.post<any>(direccion, form, { headers: headers, params: params });
}

getMisPost(userName: string, x:any): Observable<Post> {
  const headers = new HttpHeaders({
    'tenant': x
  });
let direccion = this.url + "/Post/GetPostByUser?userName=" + encodeURIComponent(userName);
return this.http.get<Post>(direccion,{ headers: headers });
}

}
