export interface UnauthorizedUserModalProps {
  user: {
    name: string,
    [key: string]: any,
  };
  isModalOpen: boolean;
  logoutUser: () => void;
}
