export type UsersStore = {
  onlineUsers: Set<string>;
  setOnlineUsers: (ids: string[]) => void; //TODO will move come selectors to the new store
};
