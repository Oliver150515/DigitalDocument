export interface Incidente {
    incidenteId: number;
    usuarioReportaId: number;
    usuarioAsignadoId: number;
    prioridadId: number;
    departamentoId: number;
    titulo: string;
    descripcion: string;
    fechaCierre: string;
    comentarioCierre: string;
    estatus: string;
    borrado: boolean;
    fechaRegistro: string;
    fechaModificacion: string;
    creadoPor: number;
    modificadoPor: number;
}