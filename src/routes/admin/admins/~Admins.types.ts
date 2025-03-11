export interface EditAdminData {
  name: string;
  email: string;
  //isVerified: boolean;
  isBanned: boolean;
  avatar?: string;
}

export interface AdminsTableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}
