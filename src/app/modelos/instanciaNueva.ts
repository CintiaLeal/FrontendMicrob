export class InstanciaNueva {
    //public id: number;
    public nombre: string;
    public tematica: string;
 
    public esquemaColores: number;
    public activo: boolean; // Added field
    public url: string; // Added field
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
       url: string, // Added parameter
        logo: string, // Added parameter
        privacidad:number
    ) {
      //  this.id = id;
        this.nombre = nombre;
        this.tematica = tematica;
        this.privacidad = privacidad;
        this.esquemaColores = esquemaColores;
        this.activo = activo; // Initialize the added fields
        this.url = url; // Initialize the added fields
        this.logo = logo; // Initialize the added fields
    }
}
