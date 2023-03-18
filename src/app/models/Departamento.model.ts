export interface Departamento {
    departamentoId: number;
    nombre: string;
    estatus: string;
    borrado: boolean;
    fechaRegistro: Date;
    fechaModificacion: Date;
    creadoPor: number;
    modificadoPor: number;
}