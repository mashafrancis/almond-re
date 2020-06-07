import * as React from 'react';

import { useViewport } from "../../hooks";

// interfaces
import { CardInfoProps } from './interfaces';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

// styles
import './CardInfo.scss';

const CardInfo: React.FunctionComponent<CardInfoProps> = (props) => {
  const {
    mainHeader,
    subHeader,
    buttonName,
    onClick,
    icon
  } = props;

  const cardButton = () => (
    <div className="card-content__button">
      {
        (width > breakpoint) ?
          <button className="mdc-button mdc-button--raised" onClick={onClick}>
            <span className="mdc-button__label">{buttonName}</span>
          </button> :
          <Fab
            size="small"
            style={{ backgroundColor: '#1967D2', color: '#eaeaea' }}
            aria-label="add"
            onClick={onClick}
          >
            <Add />
          </Fab>
      }
    </div>
  );

  const { width } = useViewport();
  const breakpoint = 539;

  return (
    <div className="info-card">
      <div className="card-content">
        {icon}
        <div className="card-content__body">
          <div className="main">{mainHeader}</div>
          <div className="sub-main">{subHeader}</div>
        </div>
        {cardButton}
      </div>
    </div>
  );
};

export default CardInfo;
