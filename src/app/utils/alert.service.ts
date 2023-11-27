import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


async showAlertSucess(message:string){
 await Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,

    showConfirmButton: true,
    // timer: 1500
  })
}

async showAlertAnimated(message:string){

await Swal.fire({
  title: message,
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  },
  customClass: {
    confirmButton: 'show_alert-bg', // Aquí defines tu propia clase CSS
  }
})
}

async showAlertError(message:string){
  await Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  })
  }


}
