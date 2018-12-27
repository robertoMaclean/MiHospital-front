export class Usuario {
    public constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }
    rut: string;
    nombres: string;
    apellido: string;
    correo: string;
    contrasena: string;
    institucion: {
        id: number;
        nombre_institucion: string;
    }
    telefono: string;
}