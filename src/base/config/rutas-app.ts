import { Role } from 'src/app/interfaces/role.enum';

export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_LOGGED_KEY = 'user_logged';

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
    name: 'gerencia',
    icon: 'bx bxs-user',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.GESTOR_DPF,
      Role.PROMOTOR_PRODUCTOS_SERVICIOS,
    ],
    active: true,
    submenu: [
      // { name: 'créditos', route: '/creditos' },
      { name: 'cuotas vencidas', route: '/cuotas-vencidas' },
      { name: 'cuotas vencidas por agencia', route: '/cuotas-agencia' },
      { name: 'carta preferencial', route: '/carta-preferencial' },
      { name: 'situación crediticia', route: '/situacion-crediticia' },
    ],
  },

  {
    name: 'dpf',
    icon: 'bx bx-line-chart',
    roles: [
      Role.ADMIN,
      Role.ADMINISTRATIVO,
      Role.GESTOR_CREDITO,
      Role.OFICIAL_CUMPLIMIENTO,
      Role.GESTOR_DPF,
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
    submenu: [{ name: 'cumpleaños', route: '/cumpleanios' }],
  },
];
