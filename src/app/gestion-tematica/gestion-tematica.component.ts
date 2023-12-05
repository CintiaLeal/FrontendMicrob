import { Component, ViewChild } from '@angular/core';
import { AppService } from '../servicios/app.service';
import { AppComponent } from '../app.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Tematica } from '../modelos/Tematica';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-gestion-tematica',
  templateUrl: './gestion-tematica.component.html',
  styleUrls: ['./gestion-tematica.component.scss']
})
export class GestionTematicaComponent {
  columnas: string[] = ['Id','Nombre'];
  dataSource = new MatTableDataSource<any>([]);
  panelOpenState = false;
  Projects =  new Observable<Array<Tematica>>();
  tipoU: string | null = null;
  

  constructor(public dialog: MatDialog,private api: AppService, private alerta: MatSnackBar,private router: Router) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí

  
  ngOnInit() {
    this.getThemes();
    //this.dataSource.paginator = this.paginator;
    this.tipoU = localStorage.getItem('tipoUsuario');
  }

  public getThemes(){
    this.api.getThemes().subscribe(userData=>{
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 
  
  }

  



  

@Component({
  selector: 'AgregarTematica',
  templateUrl: 'AgregarTematica.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,MatRadioModule ],
})

export class DialogContentExampleDialog {
  constructor(private api: AppService, private alerta: MatSnackBar) {
  }
  registrarForm = new FormGroup({
    Name: new FormControl('', Validators.required),
});

  Addtheme(){
    var Name =  (<HTMLInputElement>document.getElementById("Value")).value;
    let x: Tematica={
      name: Name
    }
    this.api.crearTematica(x).subscribe(data => {
      console.log(data);
    });
    this.alerta.open("Creada con éxito", "OK!");
  }

}

