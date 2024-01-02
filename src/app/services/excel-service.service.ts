import * as fs from 'file-saver';

import { HelpersService } from '../utils/helpers.service';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { excelDataCuotasVencidas } from '../interfaces/excelData.types';
import { imgBase64 } from '../shared/imgBase64.shared';

@Injectable({
  providedIn: 'root',
})
export class ExcelServiceService {


  exportExcel(infoData: excelDataCuotasVencidas) {
    //Title, Header & Data
    const title = infoData.header.title || "SIN-TITULO";
    const data = infoData.data;
    const footer = infoData.footer;
    const titleColumns = infoData.titleColumns;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('CuotasVencidas');

    //Add Row and formatting
    worksheet.mergeCells('D1', 'G4');
    let titleRow = worksheet.getCell('D1');
    titleRow.value = "Cuotas Vencidas";
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      bold: true,
      color: { argb: '4167B8' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    //Blank Row
    worksheet.addRow([]);
    // Date
    worksheet.mergeCells('A5:B5');
    let date = infoData.header.date;
    let dateCell = worksheet.getCell('B5');
    dateCell.value = `Fecha: ${date}`;
    dateCell.font = {
      name: 'Calibri',
      size: 11,
      bold:true
    };
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' };
    //Asesor
    worksheet.mergeCells('A6:D6');
    let asesor = infoData.header.asesor;
    let asesorCell = worksheet.getCell('B6');
    asesorCell.value = `Asesor: ${asesor}`;
    asesorCell.font = {
      name: 'Calibri',
      size: 11,
      bold:true
    };
    asesorCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // Agencia
    worksheet.mergeCells('A7:B7');
    let agencia = infoData.header.agencia;
    let agenciaCell = worksheet.getCell('B7');
    agenciaCell.value = `Agencia: ${agencia}`;
    agenciaCell.font = {
      name: 'Calibri',
      size: 11,
      bold:true
    };
    agenciaCell.alignment = { vertical: 'middle', horizontal: 'center' };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: imgBase64,
      extension: 'png',
    });
    worksheet.mergeCells('A1:C4');
    worksheet.addImage(myLogoImage, 'A1:C4');

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(titleColumns);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
    });

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      let row = worksheet.addRow(d);

      //   let sales = row.getCell(6);
      //   let color = 'FF99FF99';
      //   if (+sales.value! < 200000) {
      //     color = 'FF9999'
      //   }

      //   sales.fill = {
      //     type: 'pattern',
      //     pattern: 'solid',
      //     fgColor: { argb: color }
      //   }
    });

    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);

    //Footer Row
    // let footerRow = worksheet.addRow(['Employee Sales Report Generated from example.com at ' + date],
    // );
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    worksheet.addRow(['Catera: ' + footer.cartera]);
    worksheet.addRow(['Colocación: ' + footer.colocacion]);
    worksheet.addRow(['Morosidad: ' + footer.morosidad]);
    worksheet.addRow(['Socios Nuevos: ' + footer.sociosNuevos]);
    worksheet.addRow(['Socios: ' + footer.socios]);

    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
}
