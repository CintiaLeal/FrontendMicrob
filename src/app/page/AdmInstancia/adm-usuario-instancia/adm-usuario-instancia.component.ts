import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from 'src/app/servicios/app.service';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageService } from 'src/app/message.service';



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
  
  openDialog(userName: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { userName: userName } // Pasa el userName como dato al diálogo
    });
  
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
export class DialogContentExampleDialog {
  dataSource = new MatTableDataSource<any>([]);
  public usuarios: UsuarioRetorno[] = [];
  idInstanciaLocalHost: any;
  userNamePasado: any ;
  rolSeleccionado: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: AppService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { 
    this.userNamePasado = data.userName;
  }

  ngOnInit(): void {
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
      this.usuarios = users; // Asigna los usuarios al arreglo usuarios
      this.dataSource = new MatTableDataSource(this.usuarios); // Actualiza la fuente de datos de la tabla
     
    }, (error) => {
      // Manejo del error
    });
    
  }

  onCambiar(rolSeleccionado: string) {
    const usuarioEncontrado: any | undefined = this.usuarios.find(
      (usuario: any) => usuario.userName === this.userNamePasado
    );
  
    if (usuarioEncontrado) {
      let x: any = {
        userId: usuarioEncontrado.userId,
        firstName: usuarioEncontrado.firstName ?? " ",
        lastName: usuarioEncontrado.lastName ?? usuarioEncontrado.lastName ?? " ",
        email:  usuarioEncontrado.email ?? " ",
        profileImage:  usuarioEncontrado.profileImage ?? " ",
        birthday: usuarioEncontrado.birthday ?? usuarioEncontrado.birthday ?? " ",
        biography: usuarioEncontrado.biography ?? " ",
        occupation:  usuarioEncontrado.occupation ?? " ",
        city: {
          id: usuarioEncontrado.city.id,
          name: usuarioEncontrado.city.name
        },
        role: rolSeleccionado
      };
  
      this.api.modificarUsuario(x, this.idInstanciaLocalHost).subscribe(data => {
        this.messageService.showSuccess('Rol cambiado correctamente.');
      },
      error => {
        this.messageService.showError('Error');
      });
    } else {
      this.messageService.showError('Error');
    }
  }
  
}