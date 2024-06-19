

export interface Ingreso {
    id?: number;
    nro_guia: string;
    vehiculo: string;
    descripcion: string;
    total: number;
    usuario_id?: number;
    fecha_registro: string;
    detalles: DetalleIngreso[];
}

export interface DetalleIngreso {
    id?: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    total: number;
    producto_nombre: string;
}
