import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, catchError, map, of, startWith, tap } from 'rxjs';

import { AlertService } from 'src/app/utils/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IUsuarioCliente } from 'src/app/interfaces/usuario-cliente.interface';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-carta-preferencial',
  templateUrl: './carta-preferencial.component.html',
  styleUrls: ['./carta-preferencial.component.css'],
})
export class CartaPreferencialComponent implements OnDestroy {
  constructor(
    public utilSrv: HelpersService,
    private clientSrv: ClientService,
    private _alertSrv:AlertService
  ) {}

  @ViewChild('htmlToPDF') bodyPDF!: ElementRef;

  socioInfo:IUsuarioCliente = { numero: '', nombre: '', monto: 0 };

  cliente: AppStateEntity<IUsuarioCliente> = {};
  dataSubscription!: Subscription;
  readonly DataState = DataState;
  generatePDF() {
    const content = this.bodyPDF.nativeElement;

    html2canvas(content, { scale: 2 }).then((canvas) => {
      // Configurar el tamaño del PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png', 1.0);

      // Añadir la imagen al PDF
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.addFont('Arial', 'Helvetica', 'normal')
      // Guardar el PDF en un archivo
      pdf.save('carta-preferencial.pdf');
    });
  }

  findClient() {
    console.log("click")

    if (this.socioInfo.numero!.toString().length <=4){
       this._alertSrv.showAlertError("Ingrese un número de socio válido")
    }
    else{

    this.dataSubscription = this.clientSrv
      .getClient$(this.socioInfo.numero!)
      .pipe(
        tap((response) => {

          const {nombre, numero, jefeagencia="SIN-JEFEAGENCIA", asesor="SIN-ASESOR"} = response.data!;
          this.socioInfo = {nombre, numero,jefeagencia,asesor, monto:0};
        }),
        map((response) => {

          return { state: DataState.LOADED, data: response.data };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          this._alertSrv.showAlertError(error.message)
          return of({ state: DataState.ERROR, error });
        })
      )
      .subscribe((res)=>
      this.cliente = res);
    }

  }

  validarNumero() {
    // Utiliza una expresión regular para permitir solo números
  //   //
  //   if(!/^[0-9]+$/.test(this.socioInfo.numero)){
  //
  //       this.socioInfo.numero = this.socioInfo.numero.toString().substring(1,-1)
  //   }
  }

  ngOnDestroy(): void {

    if(this.dataSubscription)
    this.dataSubscription.unsubscribe();
  }
}
