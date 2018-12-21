export class Usuario {
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