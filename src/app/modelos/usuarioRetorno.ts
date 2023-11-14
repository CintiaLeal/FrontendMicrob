export class UsuarioRetorno {
  public tenantInstanceId: number;
  public userId: number;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public profileImage: string;
  public biography: string;
  public occupation: string;
  public city: { id: number, name: string }; // Change here
  public birthday: string;
  public isSanctioned: boolean;
  public creationDate: string;
  public administratedInstances: any[];
  public followUsers: any[];
  public blockUsers: any[];
  public muteUsers: any[];
  public posts: any[];
  public likes: any[];

  constructor(
      tenantInstanceId: number,
      userId: number,
      userName: string,
      firstName: string,
      lastName: string,
      email: string,
      profileImage: string,
      biography: string,
      occupation: string,
      city: { id: number, name: string }, // Change here
      birthday: string,
      isSanctioned: boolean,
      creationDate: string,
      administratedInstances: any[],
      followUsers: any[],
      blockUsers: any[],
      muteUsers: any[],
      posts: any[],
      likes: any[]
  ) {
      this.tenantInstanceId = tenantInstanceId;
      this.userId = userId;
      this.userName = userName;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.profileImage = profileImage;
      this.biography = biography;
      this.occupation = occupation;
      this.city = city;
      this.birthday = birthday;
      this.isSanctioned = isSanctioned;
      this.creationDate = creationDate;
      this.administratedInstances = administratedInstances;
      this.followUsers = followUsers;
      this.blockUsers = blockUsers;
      this.muteUsers = muteUsers;
      this.posts = posts;
      this.likes = likes;
  }
}
