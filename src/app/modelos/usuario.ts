export class Usuario {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public profileImage: string;
    public role: string;
    public biography: string; // Agregamos el campo biography
    public occupation: string; // Agregamos el campo occupation
    public city: string; // Agregamos el campo city
    public birthday: string; // Agregamos el campo birthday
    public isSanctioned: boolean; // Agregamos el campo isSanctioned
    public username: string; // Agregamos el campo username
  
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      confirmPassword: string,
      profileImage: string,
      role: string,
      biography: string,
      occupation: string,
      city: string,
      birthday: string,
      isSanctioned: boolean,
      username: string
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.profileImage = profileImage;
      this.role = role;
      this.biography = biography;
      this.occupation = occupation;
      this.city = city;
      this.birthday = birthday;
      this.isSanctioned = isSanctioned;
      this.username = username;
    }
  }
  