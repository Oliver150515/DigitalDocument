export interface Sla {
    slaId: number;
    descripcion: string;
    cantidadHoras: number;
    estatus: string;
    borrado: boolean;
    fechaRegistro: string;
    fechaModificacion: string;
    creadoPor: number;
    modificadoPor: number;
}