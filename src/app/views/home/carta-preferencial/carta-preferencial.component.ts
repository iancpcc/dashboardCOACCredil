import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
    private _alertSrv: AlertService
  ) {}

  @ViewChild('htmlToPDF') page1!: ElementRef;
  @ViewChild('htmlToPDF2') page2!: ElementRef;

  socioInfo: IUsuarioCliente = {
    numero: null,
    nombre: null,
    monto: null,
    identificacion: null,
    telefonoJefe: null,
    telefonoAsesor: null,
  };
  tabActual = 'tab1';

  clienteInfo = {
    cliente: null,
    identificacion: null,
    jefeAgencia: null,
    asesor: null,
    monto: null,
    numeroCliente: null,
    telefonoJefe: null,
    telefonoAsesor: null,
  };

  cliente: AppStateEntity<IUsuarioCliente> = {};
  dataSubscription!: Subscription;
  readonly DataState = DataState;
  generatePDF() {
    // const content = this.bodyPDF.nativeElement;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const content1 = this.page1.nativeElement;
    const content2 = this.page2.nativeElement;

    Promise.all([
      this.addPageToPDF(pdf, content1),
      this.addPageToPDF(pdf, content2),
    ]).then(() => {
      // Guardar el PDF en un archivo
      pdf.deletePage(3);
      pdf.save('carta-preferencial.pdf');
    });

    // html2canvas(content, { scale: 2 }).then((canvas) => {
    //   // Configurar el tamaño del PDF
    //   console.log(canvas)
    //   const imgData = canvas.toDataURL('image/png', 1.0);

    //   // Añadir la imagen al PDF
    //   pdf.addImage(
    //     imgData,
    //     'PNG',
    //     0,
    //     0,
    //     pdf.internal.pageSize.getWidth(),
    //     pdf.internal.pageSize.getHeight()
    //   );
    //   pdf.addFont('Arial', 'Helvetica', 'normal');
    //   // Guardar el PDF en un archivo
    //   pdf.save('carta-preferencial.pdf');
    // });
  }

  addPageToPDF(pdf: jsPDF, content: any): Promise<void> {
    return new Promise<void>((resolve) => {
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
        pdf.addPage();

        resolve();
      });
    });
  }

  abrirTab(tab: string) {
    this.restablecerValoresFormulario(tab);
    this.tabActual = tab;
  }

  restablecerValoresFormulario(tab: string) {
    if (tab == 'tab1') {
      this.clienteInfo = {
        identificacion: null,
        cliente: null,
        jefeAgencia: null,
        asesor: null,
        monto: null,
        numeroCliente: null,
        telefonoAsesor: null,
        telefonoJefe: null,
      };
    } else {
      this.socioInfo = {
        numero: null,
        nombre: null,
        monto: null,
        identificacion: null,
        telefonoAsesor: null,
        telefonoJefe: null,
      };
    }
  }

  findClient() {
    if (!this.isAValidNumber(+this.socioInfo.numero!)) {
      this._alertSrv.showAlertError('Ingrese un número de socio válido');
      return;
    }

    this.dataSubscription = this.clientSrv
      .getClient$(this.socioInfo.numero!)
      .pipe(
        tap((response) => {
          const {
            nombre,
            numero,
            jefeagencia = 'SIN-JEFEAGENCIA',
            asesor = 'SIN-ASESOR',
            identificacion,
          } = response.data!;
          // this.socioInfo = {
          //   nombre,
          //   numero,
          //   jefeagencia,
          //   asesor,
          //   identificacion,
          // };
          this.socioInfo.nombre = nombre;
          this.socioInfo.numero = numero;
          this.socioInfo.jefeagencia = jefeagencia;
          this.socioInfo.asesor = asesor;
          this.socioInfo.identificacion = identificacion;
        }),
        map((response) => {
          return { state: DataState.LOADED, data: response.data };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          this._alertSrv.showAlertError(error.message);
          return of({ state: DataState.ERROR, error });
        })
      )
      .subscribe((res) => (this.cliente = res));
  }

  isAValidNumber(numeroCliente: number): boolean {
    return (
      typeof numeroCliente === 'number' && numeroCliente.toString().length >= 4
    );
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
