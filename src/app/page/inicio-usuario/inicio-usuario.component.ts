import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/servicios/app.service';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { UsuarioRetorno } from 'src/app/modelos/usuarioRetorno';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.scss']
})
export class InicioUsuarioComponent {
  public base64Image: any;
  public idInstancia:any;
  contenidoVisible: string = 'home'; // Inicialmente, muestra el primer contenido
  tipoU: string | null = null;
  userName: string | null = null;
  usuario: UsuarioRetorno | null =null;
  instanciaActual: InstanciaRetorno | null=null;
  tokenActual: string | null=null;
  idInstanciaLocalHost: any;

  inputText: any;

  mostrarContenido(contenido: string) {
    this.contenidoVisible = contenido;
    
  }

  constructor( private api: AppService, private app:AppComponent) {
    this.tipoU = localStorage.getItem('tipoUsuario');
   }
   registrarForm = new FormGroup({
    text: new FormControl('', Validators.required),
});
   
  onInputChange(event: any) {
    const text = event.target.value;
    const regex = /#(\w+)/g;
    this.inputText = text.replace(regex, (match: any) => `<span class="hashtag">${match}</span>`);
  }

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

  }
  newPost() {
    const textValue = this.registrarForm.controls['text'].value   ? this.registrarForm.controls["text"].value : " ";
    let hashtags = [];
    
    // Busca y extrae los hashtags del texto
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
  
  console.log(x);
    this.idInstancia=localStorage.getItem('idInstancia');

    this.api.newPost(x, this.idInstanciaLocalHost ,this.userName).subscribe(data => {
      console.log(data);
    });
    this.base64Image = '';
    this.registrarForm.controls['text'].reset();
    

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
    console.log(this.base64Image);
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

}
