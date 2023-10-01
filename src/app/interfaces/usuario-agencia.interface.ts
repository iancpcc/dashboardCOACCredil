export interface IUsuarioAgencia{
usuario?: string | null
nombre?:  string
agencia?: string
}

export interface IUsuario{
  usuario?: string | null
nombre?:  string
agencia?: string
activo?: boolean
cambiaClave?: boolean
correo?: string
}
