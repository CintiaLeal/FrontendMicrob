import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Instancia } from 'src/app/modelos/instancia';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-ver-detalle-instancia',
  templateUrl: './ver-detalle-instancia.component.html',
  styleUrls: ['./ver-detalle-instancia.component.scss']
})
export class VerDetalleInstanciaComponent {
  public base64Image: any;
  Projects!: InstanciaRetorno;
  public ProjectsList:any;
  public Nombre:any;
  public Tematica:any;
  public Esquemas:any;
  public Dominio:any;
  public Description:any;
  tipoU: string | null = null;
  constructor(private api: AppService, private alerta: MatSnackBar,private rutaActiva: ActivatedRoute ){ }
//FORM desde el HTML
    ModifyForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required),
    logo: new FormControl('',Validators.required),
    dominio:new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  });


  ngOnInit() {
    this.getInstancias(); 
    this.tipoU = localStorage.getItem('tipoUsuario');
  }
  public getInstancias(){
    this.api.getInstanciaPorURL(this.rutaActiva.snapshot.params['Dominio']).subscribe(userData=>{
      this.Nombre = userData.nombre;
      this.Tematica = userData.tematica;
      this.base64Image = userData.logo;
      this.Esquemas = userData.esquemaColores;
      this.Dominio = userData.dominio;
      this.Description = userData.description;
    })  
  }

  //INI PARA IMG COM BASE 64
  convertToBase64(file: File) {
    console.log(file);
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })

    observable.subscribe((d) => {
      this.base64Image = d;
      console.log(this.base64Image);
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      subscriber.next(fileReader.result)
      subscriber.complete()
    }
    fileReader.onerror = () => {
      subscriber.error()
    }
  }
  
  onFileSelected(event: any): void {
     this.convertToBase64(event.target.files[0]);
   }
  //FIN PARA IMG COM BASE 64
  showImage() {
    if (this.base64Image) {
      // Devuelve la imagen base64 como una URL de datos
      return `data:image/png;base64,${this.base64Image}`;
    } else {
      // Puedes establecer una URL de imagen predeterminada o un mensaje de error aquí
      return 'ruta_a_imagen_predeterminada_o_mensaje_de_error';
    }
  }
}

