import moment from 'moment';


export  const formatFecha = (fecha: string) => {
    let date = new Date(fecha);
    return moment(date).format("DD/MM/YYYY hh:mm A")
}