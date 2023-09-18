export class Usuario {
    public nombre: string;
    public correo: string;
    public pass: string;
    constructor(nombre: string, correo: string, pass: string) {
        this.nombre = nombre;
        this.correo = correo;
        this.pass = pass;
    }
}
