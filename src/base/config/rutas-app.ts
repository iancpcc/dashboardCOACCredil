import { Role } from 'src/app/interfaces/role.enum';

export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_LOGGED_KEY = 'user_logged';
export const NINGUN_ITEM_SELECCIONADO_CONFIG = "-1"

export const MENU_OPTIONS = [
  {
    name: 'administración',
    icon: 'bx bxs-cog',
    roles: [Role.ADMIN,Role.JEFE_FINANCIERO, Role.ASISTENTE_TECNOLOGIA, Role.COORDINADOR_TECNOLOGIA],
    active: true,
    submenu: [
      // { name: 'usuarios', route: '/usuarios' },
      { name: 'usuarios', route: '/usuarios-adm' },
      { name: 'modulos acceso', route: '/modulos-adm' },
    ],
  },
  {
    name: 'gerencia',
    icon: 'bx bxs-briefcase',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.COORDINADOR_MARKETING,
      Role.GERENTE,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA,
      Role.PROMOTOR_PRODUCTOS_SERVICIOS
      // Role.GESTOR_DPF,
    ],
    active: true,
    submenu: [
      { name: 'Morosidad', route: '/georeferenciacion' },
      { name: 'Satisfacción Cliente', route: '/satisfaccion-cliente' },
    ],
  },
  {
    name: 'dpf',
    icon: 'bx bx-line-chart',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA,
      Role.GESTOR_DPF,
      Role.JEFE_AGENCIA,
      Role.JEFE_NEGOCIOS
    ],
    active: true,
    submenu: [
      { name: 'vencimientos', route: '/proximos-vencimientos' },
    ],
  },
  {
    name: 'socios',
    icon: 'bx bx-male-female',
    roles: [
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
      Role.ADMIN,
      Role.GERENTE,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.JEFE_OPERATIVO,
      Role.ASISTENTE_OPERACIONES,
      Role.GESTOR_DPF,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA
    ],
    active: true,
    submenu: [
      { name: 'cumpleaños', route: '/cumpleanios' },
      // { name: 'depositos', route: '/depositos' }
  ],
  },
  {
    name: 'creditos',
    icon: 'bx bxl-mastercard',
    roles: [
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
      Role.ADMIN,
      Role.GERENTE,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.JEFE_OPERATIVO,
      Role.GESTOR_DPF,
      Role.GESTOR_CREDITO,
      Role.JEFE_NEGOCIOS,
      Role.ASISTENTE_CREDITO,
      Role.ASESOR_CAPTACIONES,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA
    ],
    active: true,
    submenu: [
    { name: 'cuotas vencidas', route: '/cuotas-vencidas' },
    { name: 'carta preferencial', route: '/carta-preferencial' },
    // { name: 'cuotas vencidas por agencia', route: '/cuotas-agencia' },
  ],
  },

  {
    name: 'Otros',
    icon: 'bx bxs-color',
    roles: [
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
      Role.ADMIN,
      Role.GERENTE,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.JEFE_OPERATIVO,
      Role.ASISTENTE_OPERACIONES,
      Role.ASISTENTE_DE_SERVICIO_AL_SOCIO,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA
    ],
    active: true,
    submenu: [
    { name: 'situación crediticia', route: '/situacion-crediticia' },
    { name: 'socios morosos (sms de texto)', route: '/morosos-mensajes' },
  ],
  },
  {
    name: 'administrativos',
    icon: 'bx bxs-user-detail',
    roles: [
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
      Role.ADMIN,
      Role.GERENTE,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.JEFE_OPERATIVO,
      Role.JEFE_NEGOCIOS,
      Role.ASISTENTE_OPERACIONES,
      Role.ASISTENTE_DE_SERVICIO_AL_SOCIO,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA
    ],
    active: true,
    submenu: [
    { name: 'créditos adjudicados', route: '/creditos-adjudicados' },
    { name: 'créditos aprobados', route: '/creditos-aprobados' },
  ],
  },
];
