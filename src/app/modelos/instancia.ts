export class Instancia {
    //public id: number;
    public nombre: string;
    public tipo: string;
    public tematica: string;
    public pais: string;
    public esquemaColores: string;
    public activo: boolean; // Added field
    public url: string; // Added field
   public logo: string; // Added field

    constructor(
      //  id: number,
        nombre: string,
        tipo: string,
        tematica: string,
        pais: string,
        esquemaColores: string,
       activo: boolean, // Added parameter
       url: string, // Added parameter
        logo: string // Added parameter
    ) {
      //  this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.tematica = tematica;
        this.pais = pais;
        this.esquemaColores = esquemaColores;
        this.activo = activo; // Initialize the added fields
        this.url = url; // Initialize the added fields
        this.logo = logo; // Initialize the added fields
    }
}
