import imgPortada1 from "/assets/portada3.jpeg";

export default function NotFound() {
    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <img src={imgPortada1} alt="portada" className="img-fluid" height="300" width="300" />
            <br />
            <h2 className="h1">404 | Página no encontrada</h2>

            <p className="text-white-50">La página que busca no existe o fue eliminada.</p>
            <br />
            <a href="/" className="btn btn-primary">Volver al inicio</a>
        </div>
    )
}