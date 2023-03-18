export interface Comentario {
    comentarioId: number;
    incidenteId: number;
    usuarioComentaId: number;
    descripcion: string;
    estatus: string;
    borrado: boolean;
    fechaRegistro: Date;
    fechaModificacion: Date;
    creadoPor: number;
    modificadoPor: number;
}