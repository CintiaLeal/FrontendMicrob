import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { AppService } from '../servicios/app.service';
import { AppnosqlService } from '../servicios/appnosql.service';

@Component({
  selector: 'app-datos-pruebas',
  templateUrl: './datos-pruebas.component.html',
  styleUrls: ['./datos-pruebas.component.scss']
})
export class DatosPruebasComponent {
  base64Image:any;
  intancia: any;
  constructor(public dialog: MatDialog,private appNosql: AppnosqlService,private app:AppComponent, private api: AppService) {}

  ngOnInit() {
    this.intancia=1;
    this.base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX8AAAGXCAYAAABbU1CIAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAEdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTEwLTI5PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmRmNjkwNTA5LWU5ZDEtNDBhOC1iYTY3LTA3OTI3ODlhYzUxZjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5EaXNlw7FvIHNpbiB0w610dWxvIC0gMTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAg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";

  }




  crearUsuarios() {
    const nombres = ["Leandro", "Ana", "Juan", "María", "Pedro", "Laura", "Diego", "Carla", "Andrés", "Valentina"];
    const apellidos = ["Lopez", "Gomez", "Rodriguez", "Fernandez", "Alvarez", "Perez", "Garcia", "Martinez", "Diaz", "Ruiz"];
  
    for (let i = 0; i < 10; i++) {
      const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
      const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
  
      const usuario:any = {
        firstName: nombreAleatorio,
        lastName: apellidoAleatorio,
        email: `${nombreAleatorio.toLowerCase()}${apellidoAleatorio.toLowerCase()}${i}@gmail.com`,
        password: "Passwordxyz1-",
        confirmPassword: "Passwordxyz1-",
        profileImage: this.base64Image,
        role: 'Common-User',
        biography: "Peñarol Peñarol",
        occupation: "Maestro",
        city: {
          name: "Montevideo"
        },
        birthday: "2095-10-27T22:07:37.764Z",
        isSanctioned: false,
        username: `${nombreAleatorio.toLowerCase()}${apellidoAleatorio.toLowerCase()}${i}`,
      };
  
      this.api.registrarUsuario(usuario, 1).subscribe(
        (data) => {
          // La solicitud fue exitosa, mostrar un mensaje de éxito
          const form: any = {
            userId: data.userId,
            tenantId: this.intancia,
            userName: data.userName,
            occupation: data.occupation,
            city: data.city.name,
            birthday: data.birthday,
            isSanctioned: data.isSanctioned,
            creationDate: data.creationDate
          };
  
          this.appNosql.registrarUsuarioNOSQL(form).subscribe(
            (data) => { }
          );
  
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
  seguirUsuariosEntreSi() {
    const usuarios = ["Leandroarol", "AnaGomez", "JuanRodriguez", "MaríaFernandez", "PedroAlvarez", "LauraPerez", "DiegoGarcia", "CarlaMartinez", "AndrésDiaz", "ValentinaRuiz"];
  
    // Iterar sobre cada usuario
    usuarios.forEach((usuarioOrigen) => {
      // Seleccionar aleatoriamente la mitad de los otros usuarios
      const usuariosDestino = this.seleccionarMitadUsuariosDiferentes(usuarios, usuarioOrigen);
  
      // Seguir a los usuarios seleccionados
      usuariosDestino.forEach((usuarioDestino) => {
        this.seguirUsuario(usuarioOrigen, usuarioDestino, this.intancia);
      });
    });
  }
  
  seleccionarMitadUsuariosDiferentes(usuarios: string[], usuarioActual: string): string[] {
    const mitadUsuarios = usuarios.length / 2;
    const usuariosDestino = [];
  
    while (usuariosDestino.length < mitadUsuarios) {
      const usuarioAleatorio = this.seleccionarUsuarioAleatorioDiferente(usuarios, usuarioActual);
      usuariosDestino.push(usuarioAleatorio);
    }
  
    return usuariosDestino;
  }
  
  seleccionarUsuarioAleatorioDiferente(usuarios: string[], usuarioActual: string): string {
    let usuarioAleatorio;
    do {
      usuarioAleatorio = usuarios[Math.floor(Math.random() * usuarios.length)];
    } while (usuarioAleatorio === usuarioActual); // Asegurarse de que el usuario aleatorio sea diferente al actual
  
    return usuarioAleatorio;
  }
  
  seguirUsuario(usuarioOrigen: string, usuarioDestino: string, instancia: number) {
    this.api.seguirUsuario(usuarioOrigen + "@uruweb", usuarioDestino + "@uruweb", instancia).subscribe(
      (data) => {
        console.log(`Usuario ${usuarioOrigen} sigue a ${usuarioDestino}`);
      },
      (error) => {
        console.error(`Error al seguir a ${usuarioDestino} desde ${usuarioOrigen}:`, error);
      }
    );
  }
  


  crearPosteosParaUsuarios() {
    const usuarios = ["Leandroarol", "AnaGomez", "JuanRodriguez", "MaríaFernandez", "PedroAlvarez", "LauraPerez", "DiegoGarcia", "CarlaMartinez", "AndrésDiaz", "ValentinaRuiz"];
  
    usuarios.forEach((userName) => {
      for (let i = 0; i < 3; i++) {
        const textValue = `Hoy puede ser un gran día para ${userName} - Publicación ${i + 1} #DíaFeliz #Uruweb`;
        const hashtags = this.extraerHashtags(textValue);
  
        const post = {
          text: textValue,
          attachment: "",
          isSanctioned: false,
          hashtag: hashtags
        };
  
        this.crearPublicacion(post, userName);
      }
    });
  }
  
  extraerHashtags(textValue: string): string[] {
    const hashtags = [];
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(textValue))) {
      hashtags.push(match[1]);
    }
    return hashtags;
  }
  
  crearPublicacion(post: any, userName: string) {
    this.api.newPost(post, this.intancia, `${userName}@uruweb`).subscribe(
      (data) => {
        const formatoPost: any = {
          userId: data.userOwner.userId,
          tenantId: this.intancia,
          postId: data.postId,
          postCreated: data.created,
          isSanctioned: data.isSanctioned,
          hashtags: data.hashtag
        };
  
        this.appNosql.crearPostNOSQL(formatoPost).subscribe(
          (data) => {
            // Manejar la respuesta del servicio appNosql.crearPostNOSQL si es necesario
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
  }
  

  addLike() {
    const postIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const userNames = ["Leandroarol@uruweb", "AnaGomez@uruweb", "JuanRodriguez@uruweb", "MaríaFernandez@uruweb"];
  
    userNames.forEach((userName) => {
      postIds.forEach((postId) => {
        this.api.darLikes(this.intancia, userName, postId).subscribe(
          (data: any) => {
            const likeData: any = {
              userId: data.userId,
              tenantId: this.intancia,
              postId: postId
            };
            this.appNosql.darMgNOSQL(likeData).subscribe(
              (data) => {
                console.log(`Usuario ${userName} dio like al post ${postId}`);
              },
              (error) => {
                console.error(`Error al agregar el like en NOSQL para ${userName} y post ${postId}:`, error);
              }
            );
          },
          (error: any) => {
            console.error(`Error al agregar el like para ${userName} y post ${postId}:`, error);
          }
        );
      });
    })
  
  
  
}

}