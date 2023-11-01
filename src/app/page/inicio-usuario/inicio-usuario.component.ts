import { Component, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';

import { AppService } from 'src/app/servicios/app.service';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs';
import {Post} from 'src/app/modelos/post';
import { PostTodos } from 'src/app/modelos/postTodos';



@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.scss']
})
export class InicioUsuarioComponent {
  public base64Image: any;
  public imgComentario: any;
  public idInstancia:any;
   misPost: Post[] = [];
  contenidoVisible: string = 'home'; // Inicialmente, muestra el primer contenido
  tipoU: string | null = null;
  userName: string | null = null;
  usuario: UsuarioRetorno | null =null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;
  idInstanciaLocalHost: any;
  inputText: any;
  inicioTodosPost:Post[] = [];
  private scrollPos = 0;
  panelOpenState = false;
  mostrarContenido(contenido: string) {
    this.contenidoVisible = contenido;
    
  }

  constructor( private api: AppService, private app:AppComponent,private el: ElementRef, private renderer: Renderer2) {
    this.tipoU = localStorage.getItem('tipoUsuario');
   }
   registrarForm = new FormGroup({
    text: new FormControl('', Validators.required),
});
newComentario = new FormGroup({
  textComentario: new FormControl('', Validators.required),
});
   
  onInputChange(event: any) {
    const text = event.target.value;
    const regex = /#(\w+)/g;
    this.inputText = text.replace(regex, (match: any) => `<span class="hashtag">${match}</span>`);
  }

  //EXPANCION COMENTARIOS
  toggleExpansionPanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }  

  newComentarioPost(postId:any){
    const textValue = this.newComentario.controls['textComentario'].value   ? this.newComentario.controls["textComentario"].value : " ";
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
    this.idInstancia=localStorage.getItem('idInstancia');
    this.api.newComentarioPost(x, this.idInstanciaLocalHost ,this.userName, postId).subscribe(data => {
    });
    this.imgComentario = '';
    this.newComentario.controls['textComentario'].reset();

  }
  removeImageComentario(){
    this.imgComentario = '';
  }

  convertToBase64ImgComentario(file: File) {
    console.log(file);
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
  ngOnInit(): void {
    this.tokenActual = localStorage.getItem('token') ?? '';
    this.tipoU = localStorage.getItem('tipoUsuario');
    this.userName = localStorage.getItem('userName');
    this.idInstanciaLocalHost = localStorage.getItem('idInstancia');
    if (this.userName) {
      this.api.obtenerInfoUsuario(this.userName,this.idInstanciaLocalHost).subscribe(
        (value) => {
          this.usuario = value; // Asigna el valor de 'value' a this.usuario
          console.log(this.usuario);
        },
        (error) => {
          alert('Error al cargar las instancias: ' + error);
        }
      );
    }

    this.getMisPost();
    this.getPosteosInicio();
  }
 
  
  
  
  newPost() {
    const textValue = this.registrarForm.controls['text'].value   ? this.registrarForm.controls["text"].value : " ";
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
    this.idInstancia=localStorage.getItem('idInstancia');
    this.api.newPost(x, this.idInstanciaLocalHost ,this.userName).subscribe(data => {
      console.log(data);
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
  
  
  
  
  removeImage(){
    this.base64Image = '';
  }
  
//INI PARA IMG COM BASE 64
convertToBase64(file: File) {
  console.log(file);
  const observable = new Observable((subscriber: Subscriber<any>) => {
    this.readFile(file, subscriber);
  })

  observable.subscribe((d) => {
    this.base64Image = d;
    //console.log(this.base64Image);
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




}
