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
  | 'StraightLinesIcons'
  | 'FaceExplodeIcon';

export type IconProps = {
  name: IconNamesType;
} & React.SVGProps<SVGSVGElement>;
