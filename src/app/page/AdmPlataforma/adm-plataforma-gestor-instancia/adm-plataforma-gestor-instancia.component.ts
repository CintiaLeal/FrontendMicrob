import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instancia } from 'src/app/modelos/instancia';
import { AppService } from 'src/app/servicios/app.service';
import { Observable } from 'rxjs';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-plataforma-gestor-instancia',
  templateUrl: './adm-plataforma-gestor-instancia.component.html',
  styleUrls: ['./adm-plataforma-gestor-instancia.component.scss']
})

export class AdmPlataformaGestorInstanciaComponent {
  columnas: string[] = ['Nombre','Dominio','Tematica','Editar','Borrar','Detalle'];
  dataSource = new MatTableDataSource<any>([]);
  panelOpenState = false;
  Projects =  new Observable<Array<InstanciaRetorno>>();
  tipoU: string | null = null;

  constructor(public dialog: MatDialog,private api: AppService, private alerta: MatSnackBar,private router: Router) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí

  
  ngOnInit() {
    this.getInstancias();
    //this.dataSource.paginator = this.paginator;
    this.tipoU = localStorage.getItem('tipoUsuario');
  }

  public getInstancias(){
    this.api.getInstancia().subscribe(userData=>{
      this.dataSource.data=userData;
    })
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
 

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateTo(row: InstanciaRetorno) {
    this.router.navigate(['/ModificarInstancia/'+row.dominio]);
  }
  
  navigateToDetails(row: InstanciaRetorno) {
    this.router.navigate(['VerDetalleInstancia/'+row.dominio]);
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 
  
  }

  



  

@Component({
  selector: 'BorrarInstancia',
  templateUrl: 'BorrarInstancia.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,MatRadioModule ],
})

export class DialogContentExampleDialog {}
