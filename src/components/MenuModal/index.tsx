// react libraries
import * as React from 'react';

// interfaces
import { MenuModalProps } from './interfaces';

const MenuModal: React.FunctionComponent<MenuModalProps> = props => 
    <div className="feedback-menu">
    <div className="account-menu__actions">
      <button className="mdc-button">
        <span className="mdc-button__label">{props.content}</span>
      </button>
    </div>
  </div>
  ;

export default MenuModal;
