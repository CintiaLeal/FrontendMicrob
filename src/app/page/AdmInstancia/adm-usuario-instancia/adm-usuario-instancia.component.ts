
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/modelos/usuario';
import { AppService } from 'src/app/servicios/app.service';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-adm-usuario-instancia',
  templateUrl: './adm-usuario-instancia.component.html',
  styleUrls: ['./adm-usuario-instancia.component.scss']
})
export class AdmUsuarioInstanciaComponent implements OnInit {
  tipoU: string | null = null;
  columnas: string[] = ['nombre', 'apellido', 'rol', 'correo', 'borrar','editar'];
  dataSource = new MatTableDataSource<any>([]);
  public usuarios: UsuarioRetorno[] = [];
  idInstanciaLocalHost: any;

  constructor(private api: AppService,public dialog: MatDialog ){ }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí

 
    ngOnInit(): void {
      this.tipoU = localStorage.getItem('tipoUsuario');
      this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
      this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
        this.usuarios = users; // Asigna los usuarios al arreglo usuarios
        this.dataSource = new MatTableDataSource(this.usuarios); // Actualiza la fuente de datos de la tabla
        console.log(this.usuarios);
      }, (error) => {
        // Manejo del error
      });
      
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
}

@Component({
selector: 'detalle',
templateUrl: 'detalle.html',
standalone: true,
imports: [MatDialogModule,MatSelectModule,MatFormFieldModule, MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,MatRadioModule ],
})
export class DialogContentExampleDialog {}