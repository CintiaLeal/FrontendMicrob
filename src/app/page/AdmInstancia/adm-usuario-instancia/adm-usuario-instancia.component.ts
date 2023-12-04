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
  columnas: string[] = ['nombre', 'apellido', 'rol', 'correo', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  public usuarios: UsuarioRetorno[] = [];
  idInstanciaLocalHost: any;
  totalUsuarios: number = 0;
  pageSizeOptions: number[] = [3, 6];
  pageSize: number = this.pageSizeOptions[0];
  cantUser:any;
  usuariosPorArobar:any;
  mostrarTabla: boolean = true;
  instanciaActual:any;

  constructor( private messageService: MessageService,private api: AppService,public dialog: MatDialog ){ }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí

 
    ngOnInit(): void {
      this.tipoU = localStorage.getItem('tipoUsuario');
      this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
      
   
      this.dataSource.paginator = this.paginator;
      this.getGetUsersByInstancePaginado(1, 10);

      this.api.getInstanciaPorId(this.idInstanciaLocalHost).subscribe(
        data => {
          this.instanciaActual = data;
        },
        error => {
          console.error('Error al obtener la cantidad de usuarios:', error);
        }
      );

        
      

      this.api.getCantidadUsuariosAllTenant(this.idInstanciaLocalHost).subscribe(
        data => {
          this.cantUser = data.total;
        },
        error => {
          console.error('Error al obtener la cantidad de usuarios:', error);
        }
      );

      this.obtenerUsuariosParaAprobar();
    }

    aprobar(userName:any){
      this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
        this.api.activarUsuario(this.idInstanciaLocalHost,userName).subscribe(data => {
          this.messageService.showSuccess('Usuario Aprobado.');
          this.obtenerUsuariosParaAprobar();
        },
        error => {
          this.messageService.showError('Error');
        });
      
    }
    toggleMostrarTabla() {
      this.mostrarTabla = !this.mostrarTabla;
    }
    onPageChange(event: any) {
      const page = event.pageIndex + 1; // Páginas en el backend generalmente comienzan desde 1
      const itemsPerPage = event.pageSize;
  
      // Llamada al servicio backend
      this.getGetUsersByInstancePaginado(page, itemsPerPage);
    }

    getGetUsersByInstancePaginado(page: number, itemsPerPage: number) {
      // Evitar llamadas de página fuera de rango
      if (page < 1 || page > this.cantUser / itemsPerPage) {
        return;
      }
    
      this.api.getGetUsersByInstancePaginado(this.idInstanciaLocalHost, page, itemsPerPage).subscribe((users: any[]) => {
        this.usuarios = users;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
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
  
  //getUsuariosPorAcivar(x:any,Page:any,ItemsPerPage:any)
  obtenerUsuariosParaAprobar(){
    if(this.idInstanciaLocalHost){
      this.api.getUsuariosPorAcivar(this.idInstanciaLocalHost,1,30).subscribe(
        (value) => {
          this.usuariosPorArobar = value; 
          console.log("Para APROBAR" +value);    
        });
      }
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
  miusuario: any; 
  idInstanciaLocalHost: any;
  userNamePasado: any ;
  rolSeleccionado: string = '';
  usuario:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: AppService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { 
    this.userNamePasado = data.userName;
  }

  ngOnInit(): void {
    console.log(this.userNamePasado);
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    this.api.obtenerInfoUsuario(this.userNamePasado,this.idInstanciaLocalHost).subscribe((data: any[]) => {
      this.miusuario = data;
      this.usuario = data; // Asigna los usuarios al arreglo usuarios
      this.dataSource = new MatTableDataSource(this.miusuario); // Actualiza la fuente de datos de la tabla
     console.log(this.miusuario);
    }, (error) => {
      // Manejo del error
    });
    
  }

  onCambiar(rolSeleccionado: string) {

    if (this.userNamePasado) {
      let x: any = {
        userId: this.miusuario?.userId ?? " ",
        firstName: this.miusuario?.firstName ?? " ",
        lastName: this.miusuario?.lastName ?? this.miusuario?.lastName ?? " ",
        email:  this.miusuario?.email ?? " ",
        profileImage:  this.miusuario?.profileImage ?? " ",
        birthday: this.miusuario?.birthday ?? this.miusuario?.birthday ?? " ",
        biography: this.miusuario?.biography ?? " ",
        occupation:  this.miusuario?.occupation ?? " ",
        city: {
          id: this.miusuario?.city.id,
          name: this.miusuario?.city.name
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
  
  sancionar(){
    //sancionarUsuario
    this.api.sancionarUsuario(this.idInstanciaLocalHost,this.userNamePasado).subscribe(data => {
      this.messageService.showSuccess('Usuario Sancionado.');
    },
    error => {
      this.messageService.showError('Error');
    });
  }
}