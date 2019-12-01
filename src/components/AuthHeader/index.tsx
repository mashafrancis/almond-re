import * as React from 'react';

// components
import Button from '../Button';

// third-party
import { NavLink } from 'react-router-dom';

// interfaces
import { AuthHeaderProps } from './interfaces';

const notificationsIcon = (link, name) => (
  <React.Fragment>
      <span className="register-toolbar-actions">
        <div className="register__logo">
          <span className="product-logo-text">{name}</span>
        </div>
          <Button
            type="button"
            name="notifications_none"
            classes="mdc-icon-button material-icons"
            aria_label="Notifications"
          />
      </span>
  </React.Fragment>
);

const backArrow = (link, name) => (
  <React.Fragment>
    <NavLink to={link}>
      <span className="register-toolbar-actions">
        <Button
          type="button"
          name="keyboard_backspace"
          classes="mdc-icon-button material-icons"
          aria_label="Go back"
        />
        <div className="register__logo">
          <span className="product-logo-text">{name}</span>
        </div>
      </span>
    </NavLink>
  </React.Fragment>
);

const AuthHeader: React.FunctionComponent<AuthHeaderProps> = props => (
  <React.Fragment>
    <header>
        {backArrow(props.backwardLink, props.backwardButtonName)}
        <div className="mini-account-menu">
          <div className="mini-account-menu--desktop">
            {notificationsIcon(props.forwardLink, props.forwardButtonName)}
          </div>
          <div className="mini-account-menu--mobile">
            {notificationsIcon(props.forwardLink, props.forwardButtonName)}
          </div>
        </div>
      </header>
  </React.Fragment>
);

export default AuthHeader;
