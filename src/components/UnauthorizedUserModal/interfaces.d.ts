export interface UnauthorizedUserModalProps {
  user: {
    name: string,
    [key: string]: any,
  };
  showModal: boolean;
  logoutUser: () => void;
}
