export type IconNamesType =
  | 'ChatIcon'
  | 'BellIcon'
  | 'AdminIcon'
  | 'ModelIcon'
  | 'GiftIcon'
  | 'ProfileIcon'
  | 'LogoutIcon'
  | 'SearchIcon';

export type IconProps = {
  name: IconNamesType;
} & React.SVGProps<SVGSVGElement>;
