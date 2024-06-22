import { useEffect } from "react";
import imgPortada from "/logo.svg";
import imgPortada1 from "/assets/portada3.jpeg";

export function HomePage() {


    useEffect(() => {

    }, [])
    return (
        <>

            <div className="container my-3">
                <h1>HOME</h1>
            </div>
            <div className="container my-3">

                <div className="row">
                    <div className="col-md-6 my-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ingresos</h5>
                                <div className="card-text">Total</div>
                                <h2># 45</h2> 
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ventas</h5>
                                <div className="card-text">Total</div>
                                <h2># 12</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Productos</h5>
                                <div className="card-text">Total</div>
                                <h2># 12</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                        <img src={imgPortada} alt="portada" className="img-fluid" width="400"/>
                </div>
            </div>
        </>
    )
}