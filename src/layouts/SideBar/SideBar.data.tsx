export const MENU_ITEMS = {
  admin: [
    // { title: 'Profile', path: '/admin/profile' },
    // { title: 'Transactions', path: '/admin/transactions' },
    // {
    //   title: 'Users Management',
    //   path: '/admin/users',
    // },
    // { title: 'Chatter Accounts', path: '/admin/chatters' },
    { iconName: 'ChatIcon', title: 'User Dialogs', path: '/admin/dialogs' },
    { iconName: 'AdminIcon', title: 'Admin Accounts', path: '/admin/admins' },
    { iconName: 'ModelIcon', title: 'Models', path: '/admin/models' },
    { iconName: 'GiftIcon', title: 'Gift Catalog', path: '/admin/gifts' },
    // {
    //   title: 'Pricing Models',
    //   path: '/admin/tariffs',
    // },
  ],
  user: [
    { iconName: 'ChatIcon', title: 'Messages', path: '/user/dialogs' },
    {
      iconName: 'UsersIcon',
      title: 'Users',
      path: '/user/users',
    },
    { iconName: 'ModelIcon', title: 'Models', path: '/user/models' },
    { iconName: 'GiftIcon', title: 'Gifts', path: '/user/gifts' },
  ],
};
