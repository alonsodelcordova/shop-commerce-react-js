import { useEffect, useState } from "react";
import { getVentas } from "../../services/ventas.service";
import { Venta } from "../../types/Ventas";
import { formatFecha } from "../../utils/formats";




export default function VentasProductPage() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const allVentas = async () => {
        const data = await getVentas();
        if (data.status == 200) {
            setVentas(data.data);
        } else {
            alert('Error al cargar las ventas');
        }
    }

    useEffect(() => {
        allVentas();
    }, []);

    return (
        <div className="container my-2">
            <h2>Ventas</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Detalles</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <tr key={index}>
                            <td>{venta.id}</td>
                            <td>{formatFecha(venta.fecha_registro)}</td>
                            <td>{venta.razon_social}</td>
                            <td># {venta.detalles.length}</td>
                            <td>S/. {venta.total}</td>
                            <td>
                                <button className="btn btn-info btn-sm">Ver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}