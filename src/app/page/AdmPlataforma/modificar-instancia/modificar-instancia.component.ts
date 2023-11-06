import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/servicios/app.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { InstanciaModificada } from 'src/app/modelos/InstanciaModficada';

@Component({
  selector: 'app-modificar-instancia',
  templateUrl: './modificar-instancia.component.html',
  styleUrls: ['./modificar-instancia.component.scss']
})
export class ModificarInstanciaComponent {
  public base64Image: any;
  dataSource = new MatTableDataSource<any>([]);
  Projects!: InstanciaRetorno;
  public ProjectsList:any;
  public Nombre:any;
  public Tematica:any;
  public Esquemas:any;
  public tenantInstanceId :any;
  public Dominio:any;
  public Description:any;
  instanciaActual: InstanciaRetorno | null=null;
  tipoU: string | null = null;
  constructor(private api: AppService, private alerta: MatSnackBar,private rutaActiva: ActivatedRoute ,private router:Router){ }
//FORM desde el HTML
    ModifyForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    esquemaColores: new FormControl('',Validators.required),
    tematica: new FormControl('',Validators.required),
    logo: new FormControl('',Validators.required),
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
      this.tenantInstanceId = userData.tenantInstanceId;
      this.Dominio = userData.dominio;
      this.Description = userData.description;
    })  
  }

  onRegistrar() {
    console.log("llega a la funcion");
    let x: InstanciaModificada={  
      nombre: this.ModifyForm.controls["nombre"].value  ? this.ModifyForm.controls["nombre"].value : " ",
      esquemaColores: 1,
      tematica: this.ModifyForm.controls["tematica"].value  ? this.ModifyForm.controls["tematica"].value : " ",
      logo:  this.base64Image,
      dominio: this.Dominio,
      activo:true,
      privacidad:1,
      description: this.Description
    }
   
    
    this.api.ModificarInstancias(x,this.tenantInstanceId).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Modificada con éxito", "OK!");
    //this.router.navigate(['/inicioAdmPlataformaGestorInstancia']);
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

