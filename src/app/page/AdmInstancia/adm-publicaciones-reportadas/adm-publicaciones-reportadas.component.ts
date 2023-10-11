import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-adm-publicaciones-reportadas',
  templateUrl: './adm-publicaciones-reportadas.component.html',
  styleUrls: ['./adm-publicaciones-reportadas.component.scss']
})
export class AdmPublicacionesReportadasComponent {
  columnas: string[] = ['Fecha', 'UsuarioEmisor', 'Categoria','borrar'];
  dataSource = new MatTableDataSource<any>([]);
  panelOpenState = false;
  constructor(public dialog: MatDialog) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí

  ngOnInit() {
    this.dataSource.data = [
      { Fecha: '21/08/2023', UsuarioEmisor: '@Perez', Categoria: 'Acoso' },
      { Fecha: '22/08/2023', UsuarioEmisor: '@Gomez', Categoria: 'Reclamación' },
      { Fecha: '23/08/2023', UsuarioEmisor: '@Lopez', Categoria: 'Sugerencia' },
      { Fecha: '24/08/2023', UsuarioEmisor: '@Rodriguez', Categoria: 'Queja' },
      { Fecha: '25/08/2023', UsuarioEmisor: '@Hernandez', Categoria: 'Agradecimiento' },
      { Fecha: '26/08/2023', UsuarioEmisor: '@Sanchez', Categoria: 'Acoso' },
      { Fecha: '27/08/2023', UsuarioEmisor: '@Torres', Categoria: 'Reclamación' },
      { Fecha: '28/08/2023', UsuarioEmisor: '@Ramirez', Categoria: 'Sugerencia' },
      { Fecha: '29/08/2023', UsuarioEmisor: '@Gutierrez', Categoria: 'Queja' },
      { Fecha: '30/08/2023', UsuarioEmisor: '@Lara', Categoria: 'Agradecimiento' },
      { Fecha: '31/08/2023', UsuarioEmisor: '@Diaz', Categoria: 'Acoso' },
      { Fecha: '01/09/2023', UsuarioEmisor: '@Fernandez', Categoria: 'Reclamación' },
      { Fecha: '02/09/2023', UsuarioEmisor: '@Paredes', Categoria: 'Sugerencia' },
      { Fecha: '03/09/2023', UsuarioEmisor: '@Ortega', Categoria: 'Queja' },
      { Fecha: '04/09/2023', UsuarioEmisor: '@Soto', Categoria: 'Agradecimiento' },
      { Fecha: '05/09/2023', UsuarioEmisor: '@Vargas', Categoria: 'Acoso' },
      { Fecha: '06/09/2023', UsuarioEmisor: '@Mendoza', Categoria: 'Reclamación' },
      { Fecha: '07/09/2023', UsuarioEmisor: '@Castro', Categoria: 'Sugerencia' },
      { Fecha: '08/09/2023', UsuarioEmisor: '@Chavez', Categoria: 'Queja' },
      { Fecha: '09/09/2023', UsuarioEmisor: '@Perez', Categoria: 'Agradecimiento' }
    ];
    this.dataSource.paginator = this.paginator;
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
  imports: [MatDialogModule, MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,MatRadioModule ],
})
export class DialogContentExampleDialog {}
