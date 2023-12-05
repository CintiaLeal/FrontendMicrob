import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';

@Component({
  selector: 'app-ajustes-sugerencias',
  templateUrl: './ajustes-sugerencias.component.html',
  styleUrls: ['./ajustes-sugerencias.component.scss']
})

export class AjustesSugerenciasComponent {
  like: number = 50;
  live: number = 50; 
  have: number = 50;
  born: number = 50;
  withHashtag: number = 50;
  posted: number = 50;

  constructor(private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {}
  logSelectedValue() {
    console.log('Valor like:', this.like);
    console.log('Valor seleccionado:', this.live);
  }

//SenttingSuggestUsersAllTenantL
senttingSuggestUsersAllTenantL(like:any,live:any,have:any,born:any,withHashtag:any,posted:any){
    let x: any = {
        posted: like,
        live: live,
        like: posted,
        have:have,
        born:born,
        witH_HASHTAG:withHashtag
    };
    console.log(x);
    this.appNosql.SenttingSuggestUsersAllTenantL(x).subscribe(data => {
    });
}


}


