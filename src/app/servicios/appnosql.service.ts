import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppnosqlService {
  url: string = "https://localhost:7131"; //URL BASE
  constructor(private http: HttpClient) { }
  
  registrarUsuarioNOSQL(form: any): Observable<any>{
    let direccion = this.url + "/SuggestUsers/CreateUser";
    return this.http.post<any>(direccion, form);
  }

  crearPostNOSQL(formatoPost: any): Observable<any>{
    console.log("Llego al servicio"+ formatoPost);
    let direccion = this.url + "/SuggestUsers/CreatePost";
    return this.http.post<any>(direccion,formatoPost );
  }

  getHastgas(tenant:any,cantidad:any): Observable<any> {
  let direccion = this.url + "/SuggestUsers/TopHashtagByTenant?tenantId="+tenant+"&topCant="+ cantidad;
  return this.http.get<any>(direccion);
  }

  darMgNOSQL(formatoMG:any): Observable<any> {
    ///SuggestUsers/GiveLike
    let direccion = this.url + "/SuggestUsers/GiveLike"
    return this.http.post<any>(direccion,formatoMG);
  }

  updateUserNOSQL(formularioUser:any):Observable<any>{
    //https://localhost:7131/SuggestUsers/UpdateUser
    let direccion = this.url + "/SuggestUsers/UpdateUser"
    return this.http.put<any>(direccion,formularioUser);
  }

  getPostMasLike(tenant:any, cantidad:any){
   let direccion = this.url + "/SuggestUsers/PostWhitMostLikeByTenant?tenantId="+tenant+"&topCant="+ cantidad;
   return this.http.get<any>(direccion);
  }


  //https://localhost:7131/SuggestUsers/SenttingSuggestUsersAllTenant
  SenttingSuggestUsersAllTenantL(formu:any):Observable<any>{
    let direccion = this.url + "/SuggestUsers/UpdateUser"
    return this.http.put<any>(direccion,formu);

  }

  //Facu
  obtenertopHastags(cantidad:any): Observable<any> {
    let direccion = this.url + "/SuggestUsers/TopHashtagAllTenant?topCant=" + cantidad;
    return this.http.get<any>(direccion);
    }
}
