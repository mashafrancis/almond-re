import * as React from 'react';
import {
  MenuContextProps,
  MenuContextState
} from "@context/MenuContext/interfaces";

const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') as string);

const MenuContext = React.createContext({
  isMenuOpen: false,
  selectedIndex: {
    group: selectedIndex === null || undefined || false ? 0 : selectedIndex.group,
    item: selectedIndex === null || undefined || false ? 0 : selectedIndex.item,
  },
  isSelectDeviceModalOpen: false,
  isActivityDrawerOpen: false,
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  setDeviceModalOpen: (_open: boolean) => {},
  handleSelectDeviceModal: () => {},
  handleCloseDeviceModal: () => {},
  toggleActivityDrawer: (_isActivityDrawerOpen: boolean) => {}
});

const MenuProvider = ({ children }: MenuContextProps) => {
  const [state, setState] = React.useState<MenuContextState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: {
      group: 0,
      item: 0,
    },
    isSelectDeviceModalOpen: false,
    isActivityDrawerOpen: false,
  });

  const setOpen = (isOpen: boolean) => setState({ ...state, isMenuOpen: isOpen });

  const setSelectedIndex = (selectedIndex: { group: number, item: number }) => {
    setState({ ...state, selectedIndex });
    window.localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
  };
  const setDeviceModalOpen = (isModalOpen: boolean) => {
    setState({
      ...state,
      isSelectDeviceModalOpen: isModalOpen,
    });
  };

  const toggleActivityDrawer = (isActivityDrawerOpen: boolean) => setState({ ...state, isActivityDrawerOpen: isActivityDrawerOpen })

  const handleSelectDeviceModal = () => setState({ ...state, isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen });

  const handleCloseDeviceModal = () => {
    setState({
      ...state,
      isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen,
      // device: '',
    });
  };

  const {
    selectedIndex,
    isMenuOpen,
    isSelectDeviceModalOpen,
    isActivityDrawerOpen
  } = state;

  return (
    <MenuContext.Provider value={{
      isMenuOpen,
      selectedIndex,
      isSelectDeviceModalOpen,
      isActivityDrawerOpen,
      setSelectedIndex,
      setOpen,
      setDeviceModalOpen,
      handleSelectDeviceModal,
      handleCloseDeviceModal,
      toggleActivityDrawer
    }}>
      { children }
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
