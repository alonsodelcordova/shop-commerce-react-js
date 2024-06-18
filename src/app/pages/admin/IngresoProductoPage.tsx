import { useEffect, useState } from "react";
import { getIngresos } from "../../services/ingresos.service";
import { Ingreso } from "../../types/Ingreso";
import { formatFecha } from "../../utils/formats";


export default function IngresoProductoPage () {

    const [ingresos, setIngresos] = useState<Ingreso[]>([]);

    const allIngresos = async () =>{
        const data = await getIngresos();
        if (data.status == 200) {
            setIngresos(data.data);
        }else{
            alert('Error al cargar los ingresos');
        }
    }


    useEffect(() => {
        allIngresos();
    }, []);

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between">
                <h1>INGRESOS</h1>
                <div>
                    <button className="btn btn-success">Agregar</button>
                </div>
            </div>

            <table className="table table-bordered my-2 table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Vehiculo</th>
                        <th>Detalles</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso) => {
                        return (
                            <tr key={ingreso.id}>
                                <td>{ingreso.id} - {ingreso.nro_guia}</td>
                                <td>{formatFecha(ingreso.fecha_registro)}</td>
                                <td>{ingreso.vehiculo}</td>
                                <td>
                                    # {ingreso.detalles.length} 
                                </td>
                                <td>S/. {ingreso.total}</td>
                                <td>
                                    <button className="btn btn-info btn-sm">Ver</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}