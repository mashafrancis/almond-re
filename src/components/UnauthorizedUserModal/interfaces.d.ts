export interface UnauthorizedUserModalProps {
  userName: {
    name: string,
    [key: string]: any,
  };
  showModal: boolean;
  logoutUser: () => void;
}
