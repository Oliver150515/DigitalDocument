export interface Usuario {
    usuarioId: number;
    puestoId: number;
    nombre: string;
    apellido: string
    cedula: string
    correo: string;
    telefono: string
    fechaNacimiento: Date;
    nombreUsuario: string
    contrasena: string;
    estatus: string;
    borrado: boolean;
    fechaRegistro: Date;
    fechaModificacion: Date;
    creadoPor: number;
    modificadoPor: number;
}