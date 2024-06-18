export interface Producto{
    id: number;
    nombre: String;
    descripcion:String;
    precio_venta: number;
    imagen: String;
    subcategoria_id?: number;
    usuario_id?: number;
}

export interface Categoria{
    id: number;
    nombre: String;
    descripcion:String;
    is_active: boolean;
    subcategorias: SubCategoria[];
}

export interface SubCategoria{
    id: number;
    nombre: String;
    descripcion:String;
    is_active: boolean;
    categoria_id: number;
}