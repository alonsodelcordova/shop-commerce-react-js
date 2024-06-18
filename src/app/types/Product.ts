export interface Producto{
    id?: number;
    nombre: string;
    descripcion:string;
    precio_venta: number;
    imagen?: string;
    subcategoria_id?: number;
    usuario_id?: number;
}

export interface Categoria{
    id?: number;
    nombre: string;
    descripcion:string;
    is_active?: boolean;
    subcategorias: SubCategoria[];
}

export interface SubCategoria{
    id?: number;
    nombre: string;
    descripcion:string;
    is_active?: boolean;
    categoria_id?: number;
}