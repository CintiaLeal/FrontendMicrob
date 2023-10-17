export class InstanciaRetorno {
    public tenantInstanceId: number;
    public nombre: string;
    public tematica: string;
 
    public esquemaColores: number;
    public activo: boolean; // Added field
    public dominio: string; // Added field
   public logo: string; // Added field
    public privacidad: number;

    constructor(
       tenantInstanceId: number,
        nombre: string,
        tematica: string,
        esquemaColores: number,
       activo: boolean, // Added parameter
       dominio: string, // Added parameter
        logo: string, // Added parameter
        privacidad:number
    ) {
        this.tenantInstanceId = tenantInstanceId;
        this.nombre = nombre;
        this.tematica = tematica;
        this.privacidad = privacidad;
        this.esquemaColores = esquemaColores;
        this.activo = activo; // Initialize the added fields
        this.dominio = dominio; // Initialize the added fields
        this.logo = logo; // Initialize the added fields
    }
}
