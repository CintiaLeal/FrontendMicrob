export class UsuarioRetorno {
    public tenantInstanceId: number;  // Nuevo campo
    public userId: number;           // Nuevo campo
    public firstName: string;
    public lastName: string;
    public email: string;
    public profileImage: string;
    public administratedInstances: any;  // Nuevo campo

    constructor(
        tenantInstanceId: number,
        userId: number,
        firstName: string,
        lastName: string,
        email: string,
        profileImage: string,
        administratedInstances: any
    ) {
        this.tenantInstanceId = tenantInstanceId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profileImage = profileImage;
        this.administratedInstances = administratedInstances;
    }
}
