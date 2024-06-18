


export  const formatFecha = (fecha: string) => {
    let date = new Date(fecha);
    return date.toLocaleDateString() ;
}