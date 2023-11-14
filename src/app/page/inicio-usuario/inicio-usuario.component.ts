import { Component, Inject, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';

import { AppService } from 'src/app/servicios/app.service';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs';
import { Post } from 'src/app/modelos/post';
import { PostTodos } from 'src/app/modelos/postTodos';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { forkJoin } from 'rxjs';
import { MessageService } from 'src/app/message.service';


@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.scss']
})
export class InicioUsuarioComponent {
  public base64Image: any;
  public imgComentario: any;
  public idInstancia: any;
  misPost: Post[] = [];
  contenidoVisible: string = 'home'; // Inicialmente, muestra el primer contenido
  tipoU: string | null = null;
  userName: string | null = null;
  usuario: UsuarioRetorno | null = null;
  instanciaActual: InstanciaRetorno | null = null;
  tokenActual: string | null = null;
  idInstanciaLocalHost: any;
  inputText: any;
  inicioTodosPost: Post[] = [];
  inicioTodosPost1: Post[] = [];
  private scrollPos = 0;
  panelOpenState = false;
  mostrarDiv: Record<number, boolean> = {};
  contador: number = 0;
  mostrarBadge: boolean = true;
  inicioTodosLikes: any;
  public colorRojoMap: { [postId: number]: boolean } = {};
  misseguidores:any[] = [];

  // Variable para controlar si el botón se ha hecho clic o no
  buttonClicked = false;
  constructor(public dialog: MatDialog, private api: AppService, private app: AppComponent, private el: ElementRef, private renderer: Renderer2) {
    this.tipoU = localStorage.getItem('tipoUsuario');

  }
  registrarForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });
  newComentario = new FormGroup({
    textComentario: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.userName = localStorage.getItem('userName');
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');

    if (this.userName) {
      this.api.obtenerInfoUsuario(this.userName, this.idInstanciaLocalHost).subscribe(
        (value) => {  
          this.usuario = value; // Asigna el valor de 'value' a this.usuario
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
    }

    if(this.userName){
      this.api.verMisSeguidores(this.idInstanciaLocalHost,this.userName).subscribe(
        (value) => {  
          this.misseguidores = value; // Asigna el valor de 'value' a this.usuario
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );

      }

    this.getMisPost();
    this.getPosteosInicio();
    this.getPosteosInicio1();
    setInterval(() => {
      this.tengoNewPostParaVer();
    }, 3000); // 3000 milisegundos = 3 segundos

  }
  mostrarContenido(contenido: string) {
    this.contenidoVisible = contenido;

  }
  alternarVisibilidad(postId: number) {
    // Cambia el estado del botón correspondiente al postId
    this.colorRojoMap[postId] = !this.colorRojoMap[postId];
  }
  onInputChange(event: any) {
    const text = event.target.value;
    const regex = /#(\w+)/g;
    this.inputText = text.replace(regex, (match: any) => `<span class="hashtag">${match}</span>`);
  }


  addLink(postId: any) {
    // Obtener la instancia y el nombre de usuario
    this.idInstancia = localStorage.getItem('idInstancia');
    this.userName = localStorage.getItem('userName');

    // Verificar que tengas el ID de instancia y el nombre de usuario
    if (!this.idInstancia || !this.userName) {
      console.error('Falta el ID de instancia o el nombre de usuario.');
      return;
    }

    // Realizar la solicitud POST para agregar el like
    this.api.darLikes(this.idInstancia, this.userName, postId).subscribe(
      (data: any) => {
        // Manejar la respuesta si es necesario
      },
      (error: any) => {
        console.error('Error al agregar el like:', error);
      }
    );
  }

  //EXPANCION COMENTARIOS
  toggleExpansionPanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  mostrarBange(seccion: string) {
    if (seccion === 'home') {
      this.contador = 0;
      this.mostrarBadge = false;
      // Resto de la lógica para mostrar el contenido de 'home'
    }
    // Otras secciones y lógica
  }


  newComentarioPost(postId: any) {
    const textValue = this.newComentario.controls['textComentario'].value ? this.newComentario.controls["textComentario"].value : " ";
    let hashtags = [];
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(textValue))) {
      hashtags.push(match[1]);
    }
    let x: any = {
      text: textValue ? textValue : " ",
      attachment: this.imgComentario,
      isSanctioned: false,
      hashtag: hashtags
    };
    this.idInstancia = localStorage.getItem('idInstancia');

    this.api.newComentarioPost(x, this.idInstanciaLocalHost, this.userName, postId).subscribe(data => {
    });
    this.imgComentario = '';
    this.newComentario.controls['textComentario'].reset();

  }
  removeImageComentario() {
    this.imgComentario = '';
  }

  convertToBase64ImgComentario(file: File) {

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })

    observable.subscribe((d) => {
      this.imgComentario = d;
    })
  }

  readFileImgComentario(file: File, subscriber: Subscriber<any>) {
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

  onFileSelectedImgComentario(event: any): void {
    this.convertToBase64ImgComentario(event.target.files[0]);
  }
  //FIN PARA IMG COM BASE 64
  showImageImgComentario() {
    if (this.imgComentario) {
      return `data:image/png;base64,${this.imgComentario}`;
    } else {
      return 'ruta_a_imagen_predeterminada_o_mensaje_de_error';
    }
  }
  //EXPANCION COMENTARIOS
  
  mostrarDivComentario(postId: number) {
    this.mostrarDiv[postId] = !this.mostrarDiv[postId];
  }

  tengoNewPostParaVer() {
    // Almacena los posts actuales en una variable separada
    const postsActuales = this.inicioTodosPost1;

    // Llama a getPosteosInicio para actualizar this.inicioTodosPost
    this.getPosteosInicio1();

    // Compara los posts actuales con los nuevos
    const diferencia = postsActuales.length - this.inicioTodosPost.length;

    // Actualiza la variable contador con la diferencia
    this.contador = diferencia;

  }




  newPost() {
    const textValue = this.registrarForm.controls['text'].value ? this.registrarForm.controls["text"].value : " ";
    let hashtags = [];
    const hashtagRegex = /#(\w+)/g;
    let match;
    while ((match = hashtagRegex.exec(textValue))) {
      hashtags.push(match[1]);
    }
    let x: any = {
      text: textValue ? textValue : " ",
      attachment: this.base64Image,
      isSanctioned: false,
      hashtag: hashtags // Agrega los hashtags al array
    };
    this.idInstancia = localStorage.getItem('idInstancia');
    this.api.newPost(x, this.idInstanciaLocalHost, this.userName).subscribe(data => {

      this.getMisPost();
      this.getPosteosInicio();
    });
    this.base64Image = '';
    this.registrarForm.controls['text'].reset();
  }

  getMisPost() {
    if (this.userName) {
      this.api.getMisPost(this.idInstanciaLocalHost, this.userName).subscribe({
        next: (value: Post[]) => {
          // Ordena los posts por fecha en orden descendente (de más reciente a más antiguo)
          this.misPost = value.sort((a, b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
          });
        },
        error: (err) => {
          console.error('Error al obtener los posts:', err);
        },
      });
    } else {
      console.error('El nombre de usuario es nulo.');
    }
  }

 
  getPosteosInicio() {
    this.inicioTodosPost = [];
    // 1. Obtener todos los suarios de la instancia
    this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
      // 2. Para cada usuario, obtener sus posts
      for (const usuario of users) {
        this.api.getMisPost(this.idInstanciaLocalHost, usuario.userName).subscribe((posts: PostTodos[]) => {
          // 3. Agregar los posts del usuario actual a la lista de posts
          for (const post of posts) {
            post.userOwner = usuario; // Asigna el usuario al post
          }
          this.inicioTodosPost.push(...posts);

          // 4. Ordenar los posts por fecha (de más reciente a más antiguo)
          this.inicioTodosPost.sort((a, b) => {
            const dateA = new Date(a.created).getTime();
            const dateB = new Date(b.created).getTime();
            return dateB - dateA;
          });
        });
      }
      console.log(this.inicioTodosPost);
    });
  }
  getPosteosInicio1() {
    this.inicioTodosPost1 = [];
    // 1. Obtener todos los suarios de la instancia
    this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
      // 2. Para cada usuario, obtener sus posts
      for (const usuario of users) {
        this.api.getMisPost(this.idInstanciaLocalHost, usuario.userName).subscribe((posts: PostTodos[]) => {
          // 3. Agregar los posts del usuario actual a la lista de posts
          for (const post of posts) {
            post.userOwner = usuario; // Asigna el usuario al post
          }
          this.inicioTodosPost1.push(...posts);

          // 4. Ordenar los posts por fecha (de más reciente a más antiguo)
          this.inicioTodosPost1.sort((a, b) => {
            const dateA = new Date(a.created).getTime();
            const dateB = new Date(b.created).getTime();
            return dateB - dateA;
          });
        });
      }

    });
  }



  removeImage() {
    this.base64Image = '';
  }

  //INI PARA IMG COM BASE 64
  convertToBase64(file: File) {

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })

    observable.subscribe((d) => {
      this.base64Image = d;

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

  checkForNewPosts() {
    if (this.userName) {
      // Obtiene la última fecha de creación de un post en la lista actual
      const lastPostTime = this.misPost.length > 0 ? new Date(this.misPost[0].created) : null;

      // Realiza una solicitud HTTP para obtener nuevos posts
      this.api.getMisPost(this.idInstanciaLocalHost, this.userName).subscribe({
        next: (value: Post[]) => {
          // Filtra solo los nuevos posts (los que tienen una fecha de creación más reciente que lastPostTime)
          const newPosts = value.filter((post) => {
            const postTime = new Date(post.created);
            return lastPostTime === null || postTime > lastPostTime;
          });

          if (newPosts.length > 0) {
            // Agrega los nuevos posts al principio del array
            this.misPost.unshift(...newPosts);
          }
        },
        error: (err) => {
          console.error('Error al obtener los posts:', err);
        },
      });
    } else {
      console.error('El nombre de usuario es nulo.');
    }
  }
  lediomg(postId: any, userName: any): number {
    this.inicioTodosLikes = []; // Array para almacenar todos los likes
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    let dioMeGusta = 0; // Inicializamos como 0, que significa que no dio "me gusta"

    // 1. Obtener todos los usuarios de la instancia
    this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
      // 2. Para cada usuario, obtener sus posts
      for (const usuario of users) {
        this.api.getMisPost(this.idInstanciaLocalHost, usuario.userName).subscribe((posts: PostTodos[]) => {
          // 3. Buscar el post específico por su postId
          const post = posts.find((p) => p.postId === postId);
          if (post) {
            // 4. Obtener los likes del post y agregarlos al array de likes
            if (post.likes && post.likes.length > 0) {
              this.inicioTodosLikes.push(...post.likes);

              // 5. Verificar si el usuario le dio "me gusta"
              if (post.likes.some((like) => like.userName === userName)) {
                dioMeGusta = 1; // El usuario le dio "me gusta", establecemos como 1
              }
            }
          }
        });
      }
    });

    return dioMeGusta;

  }
  openDialog(postId: any) {
    const dialogRef = this.dialog.open(DialogContentExample, {
      data: { postId: postId } // Pasar el valor de postId como dato al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Puedes acceder al valor de postId aquí si es necesario.
    });
  }
  openDialogSeguir(userName: any) {
    const dialogRefs = this.dialog.open(DialogSeguir, {
      data: { userName: userName }
    });
    dialogRefs.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Puedes acceder al valor de postId aquí si es necesario.
    });
  }
}

@Component({
  selector: 'mgUsuarios',
  templateUrl: 'mgUsuarios.html',
  standalone: true,
  styleUrls: ['./inicio-usuario.component.scss'],
  imports: [MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDividerModule,
    CommonModule]
})
export class DialogContentExample {
  postId: any; // Declarar la propiedad postId
  inicioTodosPost1: any;
  inicioTodosLikes: any;
  idInstanciaLocalHost: any;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: AppService) {
    this.postId = data.postId;
  }

  ngOnInit(): void {

     
    this.getPosteosInicio1(this.postId);
  }


  getPosteosInicio1(postId: any) {
    this.inicioTodosLikes = []; // Array para almacenar todos los likes
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    // 1. Obtener todos los suarios de la instancia
    this.api.obtenerUsuarios(this.idInstanciaLocalHost).subscribe((users: UsuarioRetorno[]) => {
      // 2. Para cada usuario, obtener sus posts
      for (const usuario of users) {
        this.api.getMisPost(this.idInstanciaLocalHost, usuario.userName).subscribe((posts: PostTodos[]) => {
          // 3. Buscar el post específico por su postId
          const post = posts.find((p) => p.postId === postId);
          if (post) {
            // 4. Obtener los likes del post y agregarlos al array de likes
            if (post.likes && post.likes.length > 0) {
              this.inicioTodosLikes.push(...post.likes);
            }
          }
        });
        console.log(this.inicioTodosLikes);
      }
    });
  }


}




@Component({
  selector: 'darSeguir',
  templateUrl: 'darSeguir.html',
  standalone: true,
  styleUrls: ['./inicio-usuario.component.scss'],
  imports: [MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDividerModule,
    CommonModule]
})
export class DialogSeguir {
  userName: any; // Declarar la propiedad postId
  inicioTodosPost1: any;
  inicioTodosLikes: any;
  idInstanciaLocalHost: any;
  usuario:any;
  misseguidores: any;
  miUsuario:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: AppService,private messageService: MessageService) {
    this.userName = data.userName;
  }

  ngOnInit(): void {
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    if (this.userName) {
      this.api.obtenerInfoUsuario(this.userName, this.idInstanciaLocalHost).subscribe(
        (value) => {  
          this.usuario = value; // Asigna el valor de 'value' a this.usuario
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
    }
    if(this.userName){
      this.api.verMisSeguidores(this.idInstanciaLocalHost,this.userName).subscribe(
        (value) => {  
          this.misseguidores = value; // Asigna el valor de 'value' a this.usuario
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
      }
  }

  seguirUsuario() {
    this.miUsuario = localStorage.getItem('userName');
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    console.log(this.miUsuario, this.userName, this.idInstanciaLocalHost);
  
    if (this.miUsuario && this.userName && this.idInstanciaLocalHost) {
      this.api.seguirUsuario(this.miUsuario, this.userName, this.idInstanciaLocalHost).subscribe(
        (data) => {
        },
        (error) => {
          this.messageService.showError('Ya lo sigues.');
        }
      );
    } else {
      console.error('Valores faltantes para seguirUsuario');
    }
  }
  
  
}

function mergeMap(arg0: (users: UsuarioRetorno[]) => Observable<any[]>): import("rxjs").OperatorFunction<UsuarioRetorno[], unknown> {
  throw new Error('Function not implemented.');
}

