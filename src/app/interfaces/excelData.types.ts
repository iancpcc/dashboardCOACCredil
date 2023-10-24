export type excelDataCuotasVencidas = {
  header: {
    title: string;
    date: string;
    asesor: string;
    agencia: string;
  };
  data: [];
  titleColumns:string[]
  footer: {
    cartera: number;
    colocacion: number;
    morosidad: number;
    sociosNuevos: number;
    socios: number;
  };
};
