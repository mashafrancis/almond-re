import React, { useState, createContext } from 'react';
import {
  MenuContextProps,
  MenuContextState
} from '@context/MenuContext/interfaces';
import isArrayNotNull from '@utils/checkArrayEmpty';

const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') as string);

const MenuContext = createContext({
  isMenuOpen: false,
  selectedIndex: {
    group: isArrayNotNull(selectedIndex) ? selectedIndex.group : 0,
    item: isArrayNotNull(selectedIndex) ? selectedIndex.item : 0,
  },
  isSelectDeviceModalOpen: false,
  isActivityDrawerOpen: false,
  activityLogsViewed: false,
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  setDeviceModalOpen: (_open: boolean) => {},
  handleSelectDeviceModal: () => {},
  handleCloseDeviceModal: () => {},
  toggleActivityDrawer: (_isActivityDrawerOpen: boolean, _activityLogsViewed: boolean) => {}
});

const MenuProvider = ({ children }: MenuContextProps) => {
  const [state, setState] = useState<MenuContextState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: {
      group: 0,
      item: 0,
    },
    isSelectDeviceModalOpen: false,
    isActivityDrawerOpen: false,
    activityLogsViewed: false
  });

  const setOpen = (isOpen: boolean) => setState(prevState => ({ ...prevState, isMenuOpen: isOpen }));

  const setSelectedIndex = (selectedIndex: { group: number, item: number }) => {
    setState({ ...state, selectedIndex });
    window.localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
  };

  const setDeviceModalOpen = (isModalOpen: boolean) => setState({ ...state, isSelectDeviceModalOpen: isModalOpen });

  const toggleActivityDrawer = (isActivityDrawerOpen: boolean, activityLogsViewed: boolean) => setState({
    ...state,
    isActivityDrawerOpen,
    activityLogsViewed
  })

  const handleSelectDeviceModal = () => setState({ ...state, isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen });

  const handleCloseDeviceModal = () => setState({ ...state, isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen });

  const {
    selectedIndex,
    isMenuOpen,
    isSelectDeviceModalOpen,
    isActivityDrawerOpen,
    activityLogsViewed
  } = state;

  return (
    <MenuContext.Provider value={{
      isMenuOpen,
      selectedIndex,
      isSelectDeviceModalOpen,
      isActivityDrawerOpen,
      activityLogsViewed,
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
