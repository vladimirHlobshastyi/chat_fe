import Icon from '@/components/Icon';

export const MENU_ITEMS = [
  // { title: 'Profile', path: '/admin/profile' },
  // { title: 'Transactions', path: '/admin/transactions' },
  // {
  //   title: 'Users Management',
  //   path: '/admin/users',
  // },
  {
    icon: <Icon className='fill-text-icon' name='ChatIcon' />,
    title: 'User Dialogs',
    path: '/admin/dialogs',
  },
  {
    icon: <Icon className='w-6 h-6 text-text-icon' name='AdminIcon' />,

    title: 'Admin Accounts',
    path: '/admin/admins',
  },
  // { title: 'Chatter Accounts', path: '/admin/chatters' },
  {
    icon: <Icon className='w-6 h-6 text-text-icon' name='ModelIcon' />,
    title: 'Models',
    path: '/admin/models',
  },
  {
    icon: <Icon className='w-6 h-6 text-text-icon' name='GiftIcon' />,
    title: 'Gift Catalog',
    path: '/admin/gifts',
  },
  // {
  //   title: 'Pricing Models',
  //   path: '/admin/tariffs',
  // },
];
