
import Swal from 'sweetalert2';



export const successAlerta = (msg:string) => {
    Swal.fire({
      title: 'Éxito!',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

export const errorAlerta = (msg:string) => {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  };

export const timerSuccessAlert = (msg:string) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 2000
      });
}

export const confirmAlert = (msg:string, callback:Function) => {
    Swal.fire({
        title: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
      });
}