export type ItemAction = '/logout';
export interface MenuItems {
  label: string;
  path?: string;
  isAdmin?: boolean;
  action?: ItemAction;
}

export const menuItems: MenuItems[] = [
  { label: 'My Orders', path: 'order/my/orders' },
  { label: 'Manage Products', path: '/admin/products', isAdmin: true },
  { label: 'Manage Orders', path: '/admin/orders', isAdmin: true },
  { label: 'Logout', action: '/logout' },
];
