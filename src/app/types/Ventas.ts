
export interface Venta{
    razon_social?: string;
    tipo_comprobante: string;
    subtotal?: number;
    igv?: number;
    total?: number;
    usuario_id?: number;
    cliente_id: number;
    id?: number;
    fecha_registro?: string;
    detalles: DetalleVenta[];
}

export interface DetalleVenta{
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    total: number;
    id?: number;
    producto_nombre: string;
}
