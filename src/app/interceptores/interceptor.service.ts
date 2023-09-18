import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");

    if (token != null){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      const copia = req.clone({
        headers
      });
      return next.handle(copia);
    }else{
      const copia = req.clone();
      return next.handle(copia);
    }
  }
}