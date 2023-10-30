import { UsuarioRetorno } from "./usuarioRetorno";

export class PostTodos {
    public tenantInstanceId: number;
    public postId: number;
    public text: string;
    public attachment: string;
    public userOwner: UsuarioRetorno; // Cambia el tipo de userOwner a UsuarioRetorno
    public isSanctioned: boolean;
    public created: Date;
    public comments: any[]; // Puedes reemplazar 'any[]' con un modelo de comentario si es necesario
    public likes: any[];    // Puedes reemplazar 'any[]' con un modelo de "like" si es necesario
    public hashtag: string[]; // Un array de cadenas para representar hashtags
  
    constructor(
      tenantInstanceId: number,
      postId: number,
      text: string,
      attachment: string,
      userOwner: UsuarioRetorno, // Cambia el tipo aquí también
      isSanctioned: boolean,
      created: Date,
      comments: any[],
      likes: any[],
      hashtag: string[]
    ) {
      this.tenantInstanceId = tenantInstanceId;
      this.postId = postId;
      this.text = text;
      this.attachment = attachment;
      this.userOwner = userOwner; // Cambia aquí
      this.isSanctioned = isSanctioned;
      this.created = created;
      this.comments = comments;
      this.likes = likes;
      this.hashtag = hashtag;
    }
  }
  