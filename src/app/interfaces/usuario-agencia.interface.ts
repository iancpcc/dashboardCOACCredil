export interface IUsuarioAgencia {
  usuario?: string | null;
  nombre?: string;
  agencia?: string;
}

export interface IUsuario {
  usuario?: string | null;
  nombre?: string;
  agencia?: string;
  activo?: boolean;
  cambiaClave?: boolean;
  correo?: string;
}

export interface IPaginationModel<T> {
  pagina: 24;
  totalPaginas: 24;
  totalRegistros: 239;
  registros: T;
}
