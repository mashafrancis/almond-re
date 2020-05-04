import * as React from 'react';

// interfaces
import { CardInfoProps } from './interfaces';

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

  return (
    <div className="info-card">
      <div className="card-content">
        {icon}
        <div className="card-content__body">
          <div className="main">{mainHeader}</div>
          <div className="sub-main">{subHeader}</div>
        </div>
        <div className="card-content__button">
          <button className="mdc-button mdc-button--raised" onClick={onClick}>
            <span className="mdc-button__label">{buttonName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
