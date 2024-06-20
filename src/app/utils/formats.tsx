import moment from 'moment';


export  const formatFecha = (fecha: string) => {
    let date = new Date(fecha);
    return moment(date).format("DD/MM/YYYY hh:mm A")
}







export const getArrayPages = (total: number, limit: number) => {
    let arr_pages = []
    let num_pages = Math.ceil(total / limit)
    for (let i = 0; i < num_pages; i++) {
        arr_pages.push(i);
    }
    arr_pages = arr_pages.length >0 ? arr_pages : [0] 
    return arr_pages
}