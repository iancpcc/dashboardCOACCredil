export interface UserEntity {
  NOMBRE?: string;
  CLAVE?: string;
  IDAGENCIA?: string | number;
  EMAIL?: string;
  FECHACREACION?: string | Date;
  FECHACAMBIOCLAVE?: string | Date;
  CAMBIACLAVE?: boolean;
  DIASCAMBIOCLAVE?: number;
  TIENEBLOQUEO?: boolean;
  PUEDEINGRESARSISTEMA?: boolean;
  ACTIVO?: boolean;
}
