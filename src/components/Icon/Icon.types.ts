export type IconNamesType =
  | 'ChatIcon'
  | 'BellIcon'
  | 'AdminIcon'
  | 'ModelIcon'
  | 'GiftIcon'
  | 'ProfileIcon'
  | 'LogoutIcon'
  | 'SearchIcon'
  | 'LetterIcon'
  | 'OpenYeyIcon'
  | 'UsersIcon'
  | 'PlusIcon'
  | 'RowsIcon'
  | 'StraightLinesIcons';

export type IconProps = {
  name: IconNamesType;
} & React.SVGProps<SVGSVGElement>;
