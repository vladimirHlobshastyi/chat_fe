export interface EditAdminData {
  name: string;
  email: string;
  //isVerified: boolean;
  isBanned: boolean;
}

export interface AdminsTableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}
