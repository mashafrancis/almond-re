import * as React from 'react';

// components
import Button from '../Button';

// third-party
import { NavLink } from 'react-router-dom';

// interfaces
import { NavigationHeaderProps } from './interfaces';

export const NavigationHeader: React.FunctionComponent<NavigationHeaderProps> = props => {
  const {
    forwardButtonName,
    backwardButtonName,
    backwardLink,
    forwardLink
  } = props;

  const forwardArrow = () => (
    <React.Fragment>
      <NavLink to={forwardLink}>
        <span className="register-toolbar-actions">
          <div className="register__logo">
            <span className="product-logo-text">{forwardButtonName}</span>
          </div>
            <Button
              type="button"
              name="arrow_forward"
              classes="mdc-icon-button material-icons"
              aria_label="Notifications"
            />
        </span>
      </NavLink>
    </React.Fragment>
  );

  const backArrow = () => (
    <React.Fragment>
      <NavLink to={backwardLink}>
        <span className="register-toolbar-actions">
          <Button
            type="button"
            name="arrow_back"
            classes="mdc-icon-button material-icons"
            aria_label="Go back"
          />
          <div className="register__logo">
            <span className="product-logo-text">{backwardButtonName}</span>
          </div>
        </span>
      </NavLink>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header>
        {backArrow()}
        <div className="mini-account-menu">
          <div className="mini-account-menu--desktop">
            {forwardArrow()}
          </div>
          <div className="mini-account-menu--mobile">
            {forwardArrow()}
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default NavigationHeader;
