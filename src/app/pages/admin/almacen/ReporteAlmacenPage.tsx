import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { strFormatDateBackend } from '../../../utils/formats';
import { getReporteIngreso } from '../../../services/ingresos.service';



export default function ReporteAlmacenPage() {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [ url, setUrl ] = useState("")

    const getReporte = ()=>{
        let startFecha = strFormatDateBackend(startDate||new Date())
        let endFecha = strFormatDateBackend(endDate||new Date())
        
        let url =  getReporteIngreso(startFecha, endFecha)
        setUrl(url)
    }
    return (
        <div className="container-md my-3">

            <div className="card card-body text-black my-3">
                <h3>Reporte Almacen</h3>

                <div className="row">
                    <div className="col-md-6 my-2">
                        <div className="form-group">
                            <label>Fecha Inicio</label><br />
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showIcon
                                className='form-control'
                                placeholderText='dd/mm/yyyy'
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="form-group">
                            <label>Fecha Fin</label> <br />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showIcon
                                className='form-control'
                                placeholderText='dd/mm/yyyy'
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group mt-2">
                    <button className="btn btn-primary"
                        onClick={getReporte}
                    >Generar Reporte</button>
                </div>

            </div>

            {url != ''  && 
                <iframe src={url} width="100%" height="800px"/>
            }


        </div>
    )
}