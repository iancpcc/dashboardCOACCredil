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
      { name: 'seguridad', route: '/seguridad' },
      // { name: 'permisos', route: '/permisos' },
    ],
  },
  {
    name: 'gerencia',
    icon: 'bx bxs-user',
    roles: [Role.ADMIN, Role.ADMINISTRATIVO],
    active: true,
    submenu: [
      // { name: 'créditos', route: '/creditos' },
      { name: 'cuotas vencidas', route: '/cuotas-vencidas' },
      // { name: 'crédito preferencial', route: '/preferenciales' },
      // { name: 'recuperación cartera castigada', route: '/cartera-castigada' },
      { name: 'carta preferencial', route: '/carta-preferencial' },
    ],
  },

  {
    name: 'captaciones',
    icon: 'bx bx-male-female',
    roles: [Role.ADMIN, Role.ADMINISTRATIVO],
    active: true,
    submenu: [
      { name: 'ahorros', route: '/ahorros' },
      { name: 'recuperación cartera castigada', route: '/dpf' },
      // { name: 'mayores depositantes a 90 días', route: '#' },
      // { name: 'ahorro programado', route: '#' },
    ],
  },
  {
    name: 'dpf',
    icon: 'bx bx-line-chart',
    roles: [Role.ADMIN, Role.ADMINISTRATIVO, Role.GESTOR_CREDITO],
    active: true,
    submenu: [{ name: 'vencimientos', route: '/vencimientos' }],
  },
  {
    name: 'plazo fijo',
    icon: 'bx bx-trending-up',
    roles: [Role.ADMIN, Role.ADMINISTRATIVO, Role.JEFE_AGENCIA],
    active: false,
    submenu: [
      // { name: 'dpf por dias vencimiento', route: '#' },
      // { name: 'dpf por fechas de vencimiento', route: '#' },
      // { name: 'dpf aperturados', route: '#' },
    ],
  },
  {
    name: 'tesoreria',
    icon: 'bx bx-calculator',
    roles: [Role.ADMIN, Role.ADMINISTRATIVO],
    active: false,
    submenu: [
      { name: 'consultas', route: '/tesoreria/consultas' },
      { name: 'reportes', route: '/tesoreria/reportes' },
    ],
  },
  // {
  //   name: 'salir',
  //   icon: 'bx bxs-log-out',
  // roles:[
  //     Role.ADMIN,
  //     Role.ADMINISTRATIVO,
  //   ],
  //   active: true,
  //   submenu: [
  //     // { name: 'Salir', route: '/login' },
  //   ],
  // },
];
