export class Post {
    public tenantInstanceId: number;
    public postId: number;
    public text: string;
    public attachment: string;
    public userOwner: any;
    public isSanctioned: boolean;
    public created: Date;
    public comments: Post[]; // Puedes reemplazar 'any[]' con un modelo de comentario si es necesario
    public likes: any[];    // Puedes reemplazar 'any[]' con un modelo de "like" si es necesario
    public hashtag: string[]; // Un array de cadenas para representar hashtags
  
    constructor(
      tenantInstanceId: number,
      postId: number,
      text: string,
      attachment: string,
      userOwner: any,
      isSanctioned: boolean,
      created: Date,
      comments: Post[],
      likes: any[],
      hashtag: string[]
    ) {
      this.tenantInstanceId = tenantInstanceId;
      this.postId = postId;
      this.text = text;
      this.attachment = attachment;
      this.userOwner = userOwner;
      this.isSanctioned = isSanctioned;
      this.created = created;
      this.comments = comments;
      this.likes = likes;
      this.hashtag = hashtag;
    }
  }
  