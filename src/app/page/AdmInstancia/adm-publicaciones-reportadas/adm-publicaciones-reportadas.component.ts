import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';
import { MessageService } from 'src/app/message.service';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-adm-publicaciones-reportadas',
  templateUrl: './adm-publicaciones-reportadas.component.html',
  styleUrls: ['./adm-publicaciones-reportadas.component.scss']
})

export class AdmPublicacionesReportadasComponent {
  dataSource = new MatTableDataSource<any>([]);
  panelOpenState = false;
  tipoU: string | null = null;
  idinstancia: any;
  instanciaActual:any;
  postReportado:any[] |any;
  columnas: string[] = ['postId','fecha' ,'detalle'/* otras columnas */];

  constructor(public dialog: MatDialog,private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí
  displayedColumns: string[] = ['id'];

  ngOnInit() {
    this.idinstancia = localStorage.getItem('idInstancia');
    this.api.getInstanciaPorId(this.idinstancia).subscribe({

      next: value => this.instanciaActual = value,
      error: err => { alert('Error al cargar las instancias: ' + err) 
      }
    });

if (this.idinstancia) {
  this.api.getPostReportados(this.idinstancia).subscribe({
    next: (value) => {
      console.log(value);  // Agrega esta línea para imprimir los datos en la consola
      this.postReportado = value;
      this.dataSource = new MatTableDataSource(this.postReportado);
      console.log(this.postReportado[0]);  // Imprime el primer objeto en la consola

    },
    error: (err) => {
      alert('Error al cargar las instancias: ' + err);
    },
  });
}  

   
    this.dataSource.paginator = this.paginator;
    this.tipoU = localStorage.getItem('tipoUsuario');


  }

  eliminarRegistro(registro: any): void {
    const index = this.dataSource.data.indexOf(registro);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualiza la vista de la tabla
    }
  }

  cambiarPagina(event: any): void {
    // Puedes agregar lógica personalizada aquí si lo necesitas
  }
 

  openDialog(postId: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { postId: postId,componente: this } // Pasar el valor de postId como dato al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

@Component({
  selector: 'detalle',
  templateUrl: 'detalle.html',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule,MatDialogModule, MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,MatRadioModule ],
})
export class DialogContentExampleDialog {
  postId: any; 
  idInstanciaLocalHost: any;
  infoPost:any;
  checked: boolean = false;
  componente:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: AppService,private messageService: MessageService) {
    this.postId = data.postId;
    this.componente = data.componente;
  }

  ngOnInit(): void {
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    this.api.getPostId(this.idInstanciaLocalHost, this.postId).subscribe(
      (data) => {
        // Guarda la respuesta en la variable infoPost
        this.infoPost = data;
    
        // Aquí puedes realizar cualquier otra lógica necesaria con los datos
        console.log('Datos del post:', this.infoPost);
      },
      (error) => {
        console.error('Error al obtener los datos del post:', error);
      });
   
  }


  delete(){
    this.api.deletePost(this.idInstanciaLocalHost, this.postId).subscribe(
      (data) => {
        if(this.checked===true){
          this.sancionarUsuario();
          this.componente.ngOnInit();
         }
        this.messageService.showSuccess('Posteo Eliminado.');
        this.componente.ngOnInit();
      },
      (error) => {
        this.messageService.showSuccess('Error al Eliminado.');
      });
  }

  sancionarUsuario(){
    this.api.sancionarUsuario(this.idInstanciaLocalHost, this.infoPost.userOwner.userName).subscribe(
      (data) => {
        this.messageService.showSuccess('Usuario Sancionado');
      
      },
      (error) => {
        this.messageService.showSuccess('Sancionar Usuario.');
      });
  }

  dismissReport(){
    this.api.dismissReport(this.idInstanciaLocalHost, this.postId).subscribe(
      (data) => {
        this.messageService.showSuccess('Descartado');
        
      },
      (error) => {
        this.messageService.showSuccess('Error al descartar.');
      });
  }

  punishPost(){
    this.api.punishPost(this.idInstanciaLocalHost, this.postId).subscribe(
      (data) => {
        this.messageService.showSuccess('Validar Report');
        if(this.checked===true){
         this.sancionarUsuario();
         this.componente.ngOnInit();
        }
      },
      (error) => {
        this.messageService.showSuccess('Validar Report');
      });
  }
  }

