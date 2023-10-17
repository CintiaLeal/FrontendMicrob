export class Usuario {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public profileImage:string;
    public role: string;

    constructor(firstName: string, lastName: string, email: string, password: string, confirmPassword: string,profileImage: string, role:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.profileImage = profileImage;
        this.role = role;
    }
}
