import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { InstanciaRetorno } from 'src/app/modelos/instanciaRetorno';
import { Login } from 'src/app/modelos/login';
import { AppService } from 'src/app/servicios/app.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Usuario } from 'src/app/modelos/usuario';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageService } from 'src/app/message.service';
import { AppnosqlService } from 'src/app/servicios/appnosql.service';


@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class URLComponent implements OnInit {
  valorURL: string | null=null;
  instanciaActual: InstanciaRetorno | null=null;
  errorEncontrado: number = 0;
  tokens: string | null = null;
  tipoU: any| null = null;
  valorIdInstania: any | null=null;

  //loginredsocial
  tipoUsuario: string | null = null;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  jwtHelper: any;
  
  constructor(public dialog: MatDialog, private app: AppComponent,private router: Router,private route: ActivatedRoute,private api: AppService,private messageService: MessageService) {this.jwtHelper = new JwtHelperService();}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.valorURL = params['valorURL'];
      if (this.valorURL !== null) {
        localStorage.setItem('valorURL', this.valorURL);
        this.api.getInstanciaPorURL(this.valorURL).subscribe({
          next: value => {
            this.instanciaActual = value;
            this.valorIdInstania = value.tenantInstanceId;
            this.app.ngOnInit();
            localStorage.setItem("idInstancia", this.valorIdInstania); 
          },
          error: err => {
            this.errorEncontrado = 1; 
          }
        });
      } else {
        this.errorEncontrado = 1; 
      }
    });

    if (this.valorURL !== null) {
      localStorage.setItem('valorURL', this.valorURL);
      this.api.getInstanciaPorURL(this.valorURL).subscribe({
        next: value => {
          this.instanciaActual = value;
          this.valorIdInstania = value.tenantInstanceId;
          this.app.ngOnInit();
          localStorage.setItem("idInstancia", this.valorIdInstania); 
        },
        error: err => {
          this.errorEncontrado = 1; 
        }
      });
    } else {
      this.errorEncontrado = 1; 
    }
  }

  onLogin() {
    let x: Login = {
      username: this.loginForm.controls["username"].value ? this.loginForm.controls["username"].value : " ",
      password: this.loginForm.controls["password"].value ? this.loginForm.controls["password"].value : " "
    }
  
    this.api.loginByEmail(x, this.valorIdInstania).subscribe(
      (data) => {
        localStorage.setItem("token", data.token);
        this.tokens = data.token;
        localStorage.setItem("userName", x.username);
        const decodedToken = this.jwtHelper.decodeToken(this.tokens);
        this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
        switch (this.tipoUsuario) {
          case 'Platform-Administrator':
            localStorage.setItem("tipoUsuario", 'Platform-Administrator');
            this.router.navigate(['/inicioAdmPlataformaGestorInstancia']);
            this.messageService.showSuccess('Inicio de sesión exitoso como administrador de plataforma');
            break;
          case 'Instance-Administrator':
            localStorage.setItem("tipoUsuario", 'Instance-Administrator');
            this.router.navigate(['/inicioAdm']);
            this.messageService.showSuccess('Inicio de sesión exitoso como administrador de instancia');
            break;
          case 'Moderator':
            localStorage.setItem("tipoUsuario", 'Moderator');
            this.router.navigate(['/inicioUsuario']);
            this.messageService.showSuccess('Inicio de sesión exitoso como Moderator');
            break;
          case 'Common-User':
            localStorage.setItem("tipoUsuario", 'Common-User');
            this.router.navigate(['/inicioUsuario']);
            this.messageService.showSuccess('Inicio de sesión exitoso como usuario común');
            break;
          default:
            // Manejar otros roles o casos
            break;
        }
      },
      (error) => {
        // Ocurrió un error, mostrar un mensaje de error
        this.messageService.showError('Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo de nuevo.');
        console.error(error);
      }
    );
  }
  

  decodeToken(token: string) {
    console.log("llego al deco");
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    console.log("aud: ", decodedToken.aud);
    console.log("exp: ", decodedToken.exp);
    console.log("Role: ", decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    console.log("name: ", decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    console.log("iss: ", decodedToken.iss);

    this.tipoUsuario = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('tipoUsuario', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

    this.app.cambiarTipoUsuario(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  }


  



openDialog() {
  const dialogRef = this.dialog.open(DialogContentExampleDialog);

  dialogRef.afterClosed().subscribe(any => {
    console.log(`Dialog result: ${any}`);
  });
}
}

@Component({
selector: 'registrar',
templateUrl: 'registrar.html',
standalone: true,
styleUrls: ['./url.component.scss'],
imports: [  MatCardModule,
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
export class DialogContentExampleDialog {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  registrarForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      biography: new FormControl(''),
      occupation: new FormControl(''),
      city: new FormControl(''),
      birthday: new FormControl('')
    
  });
  public base64Image: any;
  idInstancia: any | null = null;
  public birthday: Date | null =null;
  listCitys: any;
  predefinedOccupations = ['Maestro', 'Programador', 'Doctor', 'Enfermero', 'Albañil', 'Ingeniero', 'Diseñador', 'Cocinero', 'Artista', 'Economista'];

  constructor(private _formBuilder: FormBuilder,private api: AppService,private messageService: MessageService,private appNosql: AppnosqlService) {}

  ngOnInit(): void {
    this.getCitys();
  }

  getCitys() {
    this.api.getCity().subscribe(
      (data: any[]) => {
        this.listCitys = data;  // Guarda el array en la variable listCitys
      },
      error => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }
  onRegistrar() {
      let x: any = {
        firstName: this.registrarForm.controls['firstName'].value ? this.registrarForm.controls["firstName"].value : " ",
        lastName: this.registrarForm.controls['lastName'].value ? this.registrarForm.controls["lastName"].value : " ",
        email: this.registrarForm.controls['email'].value ? this.registrarForm.controls["email"].value : " ",
        password: this.registrarForm.controls['password'].value ? this.registrarForm.controls["password"].value : " ",
        confirmPassword: this.registrarForm.controls['confirmPassword'].value ? this.registrarForm.controls["confirmPassword"].value : " ",
        profileImage: this.base64Image,
        role: 'Common-User',//'Moderator',//
        biography: this.registrarForm.controls['biography'].value ? this.registrarForm.controls["biography"].value : " ",
        occupation: this.registrarForm.controls['occupation'].value ? this.registrarForm.controls["occupation"].value : " ",
        city: {
          name: this.registrarForm.controls['city'].value ? this.registrarForm.controls["city"].value : " "
        },
        birthday: this.registrarForm.controls['birthday'].value ? this.registrarForm.controls["birthday"].value : " ",
        isSanctioned: false,
        username: this.registrarForm.controls['username'].value ? this.registrarForm.controls["username"].value : " ",
      };     
    this.idInstancia=localStorage.getItem('idInstancia');
    this.api.registrarUsuario(x, this.idInstancia).subscribe(
      (data) => {
          // La solicitud fue exitosa, mostrar un mensaje de éxito
          this.messageService.showSuccess('Usuario registrado exitosamente');
          console.log(data);
          const form: any ={
            userId: data.userId,
            tenantId: this.idInstancia,
            userName:data.userName,
            occupation: data.occupation,
            city: data.city.name,
            birthday: data.birthday,
            isSanctioned: data.isSanctioned,
            creationDate: data.creationDate
          }
          this.appNosql.registrarUsuarioNOSQL(form).subscribe(
            (data) => {}
          );     
          console.log(data);
        },
        (error) => {
          // Ocurrió un error, mostrar un mensaje de error
          this.messageService.showError('Error al registrar el usuario. Por favor, inténtelo de nuevo.');
          console.error(error);
        }
      );
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

removeImage(){
  this.base64Image = '';
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
