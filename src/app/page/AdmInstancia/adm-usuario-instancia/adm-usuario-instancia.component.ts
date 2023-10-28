
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/modelos/usuario';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-adm-usuario-instancia',
  templateUrl: './adm-usuario-instancia.component.html',
  styleUrls: ['./adm-usuario-instancia.component.scss']
})
export class AdmUsuarioInstanciaComponent implements OnInit {
  tipoU: string | null = null;
  columnas: string[] = ['nombre', 'apellido', 'rol', 'correo', 'borrar'];
  dataSource = new MatTableDataSource<any>([]);
  public usuarios: Usuario[] = [];
  constructor(private api: AppService ){ }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Añadir el signo de exclamación (!) aquí
/*
  ngOnInit() {
    this.dataSource.data = [
      { nombre: 'Juan', apellido: 'Perez', usuario: 'juan123', correo: 'juan@example.com' },
      { nombre: 'Ana', apellido: 'Gomez', usuario: 'ana456', correo: 'ana@example.com' },
      { nombre: 'Luis', apellido: 'Martinez', usuario: 'luis789', correo: 'luis@example.com' },
      { nombre: 'María', apellido: 'López', usuario: 'maria101', correo: 'maria@example.com' },
      { nombre: 'Carlos', apellido: 'Rodriguez', usuario: 'carlos555', correo: 'carlos@example.com' },
      { nombre: 'Laura', apellido: 'Hernandez', usuario: 'laura333', correo: 'laura@example.com' },
      { nombre: 'Pedro', apellido: 'Sanchez', usuario: 'pedro777', correo: 'pedro@example.com' },
      { nombre: 'Sofia', apellido: 'Torres', usuario: 'sofia999', correo: 'sofia@example.com' },
      { nombre: 'Diego', apellido: 'Ramirez', usuario: 'diego222', correo: 'diego@example.com' },
      { nombre: 'Valentina', apellido: 'Gutierrez', usuario: 'valentina444', correo: 'valentina@example.com' },
      { nombre: 'Javier', apellido: 'Lara', usuario: 'javier666', correo: 'javier@example.com' },
      { nombre: 'Paula', apellido: 'Diaz', usuario: 'paula808', correo: 'paula@example.com' },
      { nombre: 'Andres', apellido: 'Fernandez', usuario: 'andres999', correo: 'andres@example.com' },
      { nombre: 'Marta', apellido: 'Paredes', usuario: 'marta111', correo: 'marta@example.com' },
      { nombre: 'Alejandro', apellido: 'Ortega', usuario: 'alejandro777', correo: 'alejandro@example.com' },
      { nombre: 'Isabel', apellido: 'Soto', usuario: 'isabel505', correo: 'isabel@example.com' },
      { nombre: 'Ricardo', apellido: 'Vargas', usuario: 'ricardo123', correo: 'ricardo@example.com' },
      { nombre: 'Carmen', apellido: 'Mendoza', usuario: 'carmen555', correo: 'carmen@example.com' },
      { nombre: 'Gabriel', apellido: 'Castro', usuario: 'gabriel999', correo: 'gabriel@example.com' },
      { nombre: 'Lucia', apellido: 'Chavez', usuario: 'lucia444', correo: 'lucia@example.com' },
    ];
    this.dataSource.paginator = this.paginator;
    this.tipoU = localStorage.getItem('tipoUsuario');
  }
*/
 
    ngOnInit(): void {

    this.api.obtenerUsuarios().subscribe({
      next: value => this.usuarios = value,
      error: err => { alert('Error al cargar los Usuarios: ' + err) }
    });
    console.log(this.usuarios);
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
  
}
