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
import { InstanciaModificada } from '../modelos/InstanciaModficada';
import { Tematica } from '../modelos/Tematica';
@Injectable({
  providedIn: 'root'
})

export class AppService {

  url: string = "https://localhost:7131"; //URL BASE
  constructor(private http: HttpClient) { }

  registrarUsuario(form: Usuario, x: any): Observable<UsuarioRetorno> {
    let direccion = this.url + "/Account/Registration";
    const headers = new HttpHeaders({
      'tenant': x
    });
    return this.http.post<any>(direccion, form, { headers: headers });
  }


  crearInstancias(form: any,userName: any): Observable<ResponseI> {
    const direccion = this.url + "/Instance/CreateInstance?userName="+userName;
    return this.http.post<any>(direccion, form);
  }

  getInstancia(): Observable<InstanciaRetorno[]> {
    return this.http.get<InstanciaRetorno[]>(this.url + "/Instance/GetActiveInstances?Page=1&ItemsPerPage=50");
  }

  getInstanciaPorId(x: any): Observable<InstanciaRetorno> {
    const url = `${this.url}/Instance/GetInstanceById?instanceId=${x}`;
    return this.http.get<InstanciaRetorno>(url);
  }

  getInstanciaPorURL(x:any):Observable<InstanciaRetorno> {
    const url = `${this.url}/Instance/GetInstanceByDomain?domain=${x}`;
    return this.http.get<InstanciaRetorno>(url);
  }

  getCity(){
    const direccion = this.url +"/GeneralData/GetCities";
    return this.http.get<any[]>(direccion);
  }

 //Inicio Login por email 
 loginByEmail(form: Login, x:any) {
  const headers = new HttpHeaders({
    'tenant': x
  });
  let direccion = this.url + "/Account/Login"; //URL ESPECIFICA
  return this.http.post<any>(direccion, form,{ headers: headers });
}
//Fin Login por email

obtenerUsuarios(x:any): Observable<UsuarioRetorno[]> {
  const headers = new HttpHeaders({
    'tenant': x
  });
  ///Account/GetUsersByInstance
let direccion = this.url + "/Account/GetUsersByInstance";
return this.http.get<UsuarioRetorno[]>(direccion,{ headers: headers });
}

obtenerInfoUsuario(userName: string, x:any): Observable<any> {
  const headers = new HttpHeaders({
    'tenant': x
  });
let direccion = this.url + "/Account/GetUser?userName=" + encodeURIComponent(userName);
return this.http.get<any>(direccion,{ headers: headers });
}

newPost(form: any, x: any, userName: any): Observable<any> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  const params = new HttpParams().set('userName', userName); // Agrega userName como parámetro

  const direccion = this.url + "/Post/CreatePost";
  
  return this.http.post<any>(direccion, form, { headers: headers, params: params });
}

getMisPost(x:any, userName: string): Observable<any> {
  const headers = new HttpHeaders({
    'tenant': x
  });
let direccion = this.url + "/Post/GetPostByUser?userName=" + userName;
return this.http.get<any>(direccion,{ headers: headers });

}

newComentarioPost(form: any, x: any, userName: any, postId:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
 // const params = new HttpParams().set('userName', userName); 
  const direccion = this.url + "/Post/CreateComment?postId="+postId+"&"+"userName="+userName;
//return this.http.post<any>(direccion, form, { headers: headers, params: params });
return this.http.post<any>(direccion, form, { headers: headers });
}

ModificarInstancias (instanciaNueva: InstanciaModificada, x:any): Observable<ResponseI> {  
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Instance/ModifyInstance";
  return this.http.put<any>(direccion, instanciaNueva,{ headers: headers }); 
}

darLikes(x: any, userName: any, postId: any) {
  // URL de la solicitud
  const direccion = this.url + "/Post/AddLikeToPost?postId=" + postId + "&userName=" + userName;

  // Configurar los encabezados
  const headers = new HttpHeaders().set('tenant', x);

  // Realizar la solicitud HTTP POST
  return this.http.post(direccion, null, { headers: headers });
}


modificarUsuario (form:any, x:any): Observable<any> {  
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/ModifyUser";
  return this.http.put<any>(direccion, form,{ headers: headers }); 
}

verMisSeguidores(x:any,userName: any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/GetFollowers?Page=1&ItemsPerPage=100&userName=" +userName;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

seguirUsuario(userName: any, userNameToFollow: any, x: any): Observable<ResponseI> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/FollowUser?userName="+userName+"&userNameToFollow="+userNameToFollow;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}
//https://localhost:7131/Account/GetFollowedUsers?userName=loco@uruweb
verSeguidos(x:any,userName: any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  //https://localhost:7131/Account/GetFollowedUsers?Page=1&ItemsPerPage=100&userName=Luna987@uruweb
  let direccion = this.url + "/Account/GetFollowedUsers?Page=1&ItemsPerPage=100&userName=" +userName;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}
verTematicas(){
  let direccion = this.url + "/GeneralData/GetTematicas";
  return this.http.get<any[]>(direccion); 
}

verMiInicio(x:any,userName:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  //https://localhost:7131/Account/GetUserTimeline?userName=
  let direccion = this.url + "/Account/GetUserTimeline?Page=1&ItemsPerPage=50&userName="+userName;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

bloquearUser(x:any,userName:any,userNameToBlock:any): Observable<ResponseI> {
  //https://localhost:7131/Account/BlockUser?userName=juan&userNameToBlock=ana'
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/BlockUser?userName="+userName+"&userNameToBlock="+userNameToBlock;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

mutUsuario(x:any,userName:any,userNameToBlock:any): Observable<ResponseI> {
  //https://localhost:7131/Account/MuteUser?userName=ed&userNameToFollow=ed
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/MuteUser?userName="+userName+"&userNameToFollow="+userNameToBlock;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

accesoGoogle(x: any, token: any): Observable<any> {
  // Eliminar comillas alrededor del token si están presentes
  const cleanToken = token.replace(/^"(.*)"$/, '$1');
  console.log(cleanToken);
  console.log("token aqui"+token);

  const headers = new HttpHeaders({
    'tenant': x,
    'Authorization': `Bearer ${cleanToken}`
  });

  let direccion = this.url + "/Account/LoginSocialMedia";
  return this.http.post<any>(direccion, {}, { headers: headers });
}


getPostId(x:any,idPost:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  //https://localhost:7131/Post/GetPostById?postId=1
  let direccion = this.url + "/Post/GetPostById?postId="+idPost;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//Funcionalidad de reportar Posteo
reportPost(x:any,userName:any,postId:any): Observable<ResponseI> {
//https://localhost:7131/Post/ReportPost?postId=1&userName=sd
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Post/ReportPost?postId="+postId+"&userName="+userName;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

getPostReportados(x:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
   //https://localhost:7131/Post/GetReportedPost
  let direccion = this.url + "/Post/GetReportedPost";
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//https://localhost:7131/Post/DismissReportedPost?postId=1
dismissReport(x:any,postId:any): Observable<ResponseI> {
    const headers = new HttpHeaders({
      'tenant': x,
    });
    let direccion = this.url + "/Post/DismissReportedPost?postId="+postId;
    return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

//https://localhost:7131/Post/PunishPost?postId=11
punishPost(x:any,postId:any): Observable<ResponseI> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Post/PunishPost?postId="+postId;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}
//https://localhost:7131/Post/DeletePostById?postId=111
deletePost(x:any,postId:any): Observable<ResponseI> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Post/DeletePostById?postId="+postId;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}


getCantidadUsuariosByTenant(x:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
   //https://localhost:7131/Statistics/CantUsersByTenant
  let direccion = this.url + "/Statistics/CantUsersByTenant";
  return this.http.get<any>(direccion,{ headers: headers }); 
}


getCantUsersThisMonthByTenant(x:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  //https://localhost:7131/Statistics/CantUsersThisMonthAllTenant
  let direccion = this.url + "/Statistics/CantUsersThisMonthByTenant";
  return this.http.get<any>(direccion,{ headers: headers }); 
}

getCantUsersThisMonthAllTenant(){
  //https://localhost:7131/Statistics/CantUsersThisMonthAllTenant
  let direccion = this.url + "/Statistics/CantUsersThisMonthAllTenant";
  return this.http.get<any>(direccion); 
}

getCantUsersByCityByTenan(x:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
//https://localhost:7131/Statistics/CantUsersByCityAllTenant?cantTop=10
  let direccion = this.url + "/Statistics/CantUsersByCityByTenant?cantTop=20";
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

getNewMonthlyRegistrationsByTenant(x:any,cant:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
//https://localhost:7131/Statistics/NewMonthlyRegistrationsAllTenant?cantTop=10
  let direccion = this.url + "/Statistics/NewMonthlyRegistrationsByTenant?cantTop="+cant;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

getPosteosInstanciaCant(x:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Post/GetCountPost";
  return this.http.get<any>(direccion,{ headers: headers }); 
}

//GETUSERPaginado
//https://localhost:7131/Account/GetUsersByInstance?Page=0&ItemsPerPage=10
getGetUsersByInstancePaginado(x:any,Page:any,ItemsPerPage:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/GetUsersByInstance?Page="+Page + "&ItemsPerPage=" +ItemsPerPage;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//SANCIONAR USUARIO
//https://localhost:7131/Account/SancionateUser?userName=paco
sancionarUsuario(x:any,userName:any): Observable<ResponseI> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/SancionateUser?userName="+userName;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

//SECCION EXPLORAR TODOS LOS POST PAGINADOS
getAllPost(x:any,Page:any,ItemsPerPage:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Post/GetAllPost?Page="+Page + "&ItemsPerPage=" +ItemsPerPage;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//https://localhost:7131/Account/GetBlockedUsers?Page=1&ItemsPerPage=10&userName=jua
getBlockedUsers(x:any,Page:any,ItemsPerPage:any,userName:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/GetBlockedUsers?Page=1&ItemsPerPage=10&userName=" +userName;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//nueva funcion para activar
//https://localhost:7131/Account/GetInactiveUsers?Page=1&ItemsPerPage=100  
getUsuariosPorAcivar(x:any,Page:any,ItemsPerPage:any){
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/GetInactiveUsers?Page="+Page + "&ItemsPerPage=" +ItemsPerPage;
  return this.http.get<any[]>(direccion,{ headers: headers }); 
}

//https://localhost:7131/Account/ActiveUser?userName=sd
activarUsuario(x:any,userName:any): Observable<ResponseI> {
  const headers = new HttpHeaders({
    'tenant': x,
  });
  let direccion = this.url + "/Account/ActiveUser?userName="+userName;
  return this.http.put<ResponseI>(direccion, {}, { headers: headers });
}

//facu

getNewMonthlyRegistrationsAllTenant(cant:any){
  //https://localhost:7131/Statistics/NewMonthlyRegistrationsAllTenant?cantTop=10
    let direccion = this.url + "/Statistics/NewMonthlyRegistrationsAllTenant?cantTop="+cant;
    return this.http.get<any[]>(direccion); 
  }
  
  getCantUsersByCityAllTenan(){
  //https://localhost:7131/Statistics/CantUsersByCityAllTenant?cantTop=10
    let direccion = this.url + "/Statistics/CantUsersByCityAllTenant?cantTop=20";
    return this.http.get<any[]>(direccion); 
  }
  
  getInstanceMetricsAllTenant(cant:any){
      const headers = new HttpHeaders({
        'tenant': 0,
      });
    //https://localhost:7131/Statistics/NewMonthlyRegistrationsAllTenant?cantTop=10
      let direccion = this.url + "/Statistics/InstanceMetricsAllTenant?cantTop="+cant;
      return this.http.get<any[]>(direccion,{ headers: headers }); 
    }
    
    getCantidadUsuariosAllTenant(){
      //https://localhost:7131/Statistics/CantUsersAllTenant
     let direccion = this.url + "/Statistics/CantUsersAllTenant";
     return this.http.get<any>(direccion); 
   }

   BorrarInstancias ( x:any): Observable<ResponseI> {  
    const headers = new HttpHeaders({
      'tenant': x,
    });
    let direccion = this.url + "/Instance/DeleteInstance";
    return this.http.put<any>(direccion,{ headers: headers }); 
  }
  getThemes(){
    const direccion = this.url +"/GeneralData/GetTematicas";
    return this.http.get<any[]>(direccion);
  }
  crearTematica(x: any): Observable<Tematica> {
    const direccion = this.url + "/GeneralData/CreateTematicas";
    return this.http.post<any>(direccion, x);
  }
  DeshabilitarInstancias ( x:any): Observable<ResponseI> {  
    const headers = new HttpHeaders({
      'tenant': x,
    });
    let direccion = this.url + "/Instance/DisableInstance";
    return this.http.put<any>(direccion,{ headers: headers }); 
  }
  
  ActivarInstancias ( x:any): Observable<ResponseI> {  
    const headers = new HttpHeaders({
      'tenant': x,
    });
    let direccion = this.url + "/Instance/ActiveInstance";
    return this.http.put<any>(direccion,{ headers: headers }); 
  }
}
