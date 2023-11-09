export class InstanciaModificada {

        public tenantInstanceId: number;
        public nombre: string;
        public tematica: Tematica; // Cambiar el tipo de tematica a la nueva clase
        public description: string;
        public esquemaColores: number;
        public activo: boolean;
        public dominio: string;
        public logo: string;
        public privacidad: number;
      
        constructor(
          tenantInstanceId: number,
          nombre: string,
          tematica: Tematica,
          esquemaColores: number,
          activo: boolean,
          dominio: string,
          logo: string,
          privacidad: number,
          description: string
        ) {
          this.tenantInstanceId = tenantInstanceId;
          this.nombre = nombre;
          this.tematica = tematica;
          this.privacidad = privacidad;
          this.esquemaColores = esquemaColores;
          this.activo = activo;
          this.dominio = dominio;
          this.logo = logo;
          this.description = description;
        }
      }
      
      export class Tematica {
        public id: number;
        public name: string;
      
        constructor(id: number, name: string) {
          this.id = id;
          this.name = name;
        }
      }
      