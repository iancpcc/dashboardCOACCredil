import { Role } from 'src/app/interfaces/role.enum';

export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_LOGGED_KEY = 'user_logged';
export const NINGUN_ITEM_SELECCIONADO_CONFIG = "-1"

export const MENU_OPTIONS = [
  {
    name: 'administración',
    icon: 'bx bxs-cog',
    roles: [Role.ADMIN],
    active: true,
    submenu: [
      // { name: 'usuarios', route: '/usuarios' },
      { name: 'usuarios', route: '/usuarios-adm' },
      // { name: 'permisos', route: '/permisos' },
    ],
  },
  {
    name: 'georeferencia',
    icon: 'bx bxs-map-pin',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.GERENTE,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.COORDINADOR_TECNOLOGIA,
      Role.ASISTENTE_TECNOLOGIA
      // Role.GESTOR_DPF,
    ],
    active: true,
    submenu: [
      // { name: 'créditos', route: '/creditos' },
      { name: 'Morosidad', route: '/georeferenciacion' },
    ],
  },
  {
    name: 'dpf',
    icon: 'bx bx-line-chart',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
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
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.GESTOR_DPF,
    ],
    active: true,
    submenu: [
      { name: 'cumpleaños', route: '/cumpleanios' },
      { name: 'depositos', route: '/depositos' }
  ],
  },
  {
    name: 'creditos',
    icon: 'bx bxl-mastercard',
    roles: [
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.GESTOR_DPF,
      Role.GESTOR_CREDITO,
      Role.JEFE_NEGOCIOS,
      Role.ASISTENTE_CREDITO,
      Role.ASESOR_CAPTACIONES,
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
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
    ],
    active: true,
    submenu: [
    { name: 'situación crediticia', route: '/situacion-crediticia' },
  ],
  },
];
