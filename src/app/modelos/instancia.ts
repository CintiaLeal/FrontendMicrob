

export class Instancia{
  //public id: number;
  public nombre: string;
  public tematica: string;

  public esquemaColores: number;
  public activo: boolean; // Added field
  public dominio: string; // Added field
 public logo: string; // Added field
  public privacidad: number;

 /*{
"tenantInstanceId": 3,
"nombre": "string",
"url": "string",
"logo": "string",
"activo": true,
"tematica": "string",
"esquemaColores": 0,
"privacidad": 0
}*/
  constructor(
    //  id: number,
      nombre: string,
      tematica: string,
      esquemaColores: number,
     activo: boolean, // Added parameter
     dominio: string, // Added parameter
      logo: string, // Added parameter
      privacidad:number
  ) {
    //  this.id = id;
      this.nombre = nombre;
      this.tematica = tematica;
      this.privacidad = privacidad;
      this.esquemaColores = esquemaColores;
      this.activo = activo; // Initialize the added fields
      this.dominio = dominio; // Initialize the added fields
      this.logo = logo; // Initialize the added fields
  }
}

/*
{
  "tenantInstanceId": 2,
  --"nombre": "AllMusic",
  "dominio": "entidad1.com",
  --"logo": "ruta/al/logo1.png",
  --"activo": true,
  --"tematica": "Tema 1",
  --"esquemaColores": 0,
  --"privacidad": 0
} */