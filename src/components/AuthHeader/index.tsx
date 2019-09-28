import * as React from 'react';

// components
import Button from '../../components/Button';

// third-party
import { NavLink } from 'react-router-dom';

// interfaces
import { AuthHeaderProps } from './interfaces';

const forwardArrow = (link, name) => (
  <React.Fragment>
    <NavLink to={link}>
      <span className="register-toolbar-actions">
        <div className="register__logo">
          <span className="product-logo-text">{name}</span>
        </div>
          <Button
            type="button"
            name="arrow_forward"
            classes="mdc-icon-button material-icons"
            aria_label="Go forward"
          />
      </span>
    </NavLink>
  </React.Fragment>
);

const backArrow = (link, name) => (
  <React.Fragment>
    <NavLink to={link}>
      <span className="register-toolbar-actions">
        <Button
          type="button"
          name="arrow_back"
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

const AuthHeader: React.SFC<AuthHeaderProps> = props => (
  <React.Fragment>
    <header>
        {backArrow(props.backwardLink, props.backwardButtonName)}
        <div className="mini-account-menu">
          <div className="mini-account-menu--desktop">
            {forwardArrow(props.forwardLink, props.forwardButtonName)}
          </div>
          <div className="mini-account-menu--mobile">
            {forwardArrow(props.forwardLink, props.forwardButtonName)}
          </div>
        </div>
      </header>
  </React.Fragment>
);

export default AuthHeader;
