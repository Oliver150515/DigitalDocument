export interface Puesto {
    puestoId: number;
    departamentoId: number;
    nombre: string;
    estatus: string;
    borrado: boolean;
    fechaRegistro: string;
    fechaModificacion: string;
    creadoPor: number;
    modificadoPor: number;
}