
export interface Venta{
    razon_social: string;
    tipo_comprobante: string;
    subtotal: number;
    igv: number;
    total: number;
    usuario_id: number;
    cliente_id: number;
    id: number;
    fecha_registro: string;
    detalles: DetalleVenta[];
}

export interface DetalleVenta{
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    total: number;
    id: number;
}

/*
{
    "razon_social": "string",
    "tipo_comprobante": "factura",
    "subtotal": 0,
    "igv": 0,
    "total": 0,
    "usuario_id": 0,
    "cliente_id": 0,
    "id": 0,
    "fecha_registro": "string",
    "detalles": [
      {
        "producto_id": 0,
        "cantidad": 0,
        "precio_unitario": 0,
        "total": 0,
        "id": 0
      }
    ]
  }
*/