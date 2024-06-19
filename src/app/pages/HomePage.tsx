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
                    <div className="col-md-6">
                        <img src={imgPortada} alt="portada" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <img src={imgPortada1} alt="portada" className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    )
}