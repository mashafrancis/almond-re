import React from 'react';

// interfaces
import { GeneralCardInfoProps } from './interfaces';

// styles
import './GeneralCardInfo.scss';

const GeneralCardInfo = (props: GeneralCardInfoProps): JSX.Element => {
  const {
    mainHeader,
    subHeader,
    actionItem,
    icon
  } = props;

  return (
    <div className="general-info-card">
      <div className="card-content">
        {icon}
        <div className="card-content__body">
          <div className="main">{mainHeader}</div>
          <div className="sub-main">{subHeader}</div>
        </div>
        <div className="card-content__button">
          {actionItem}
        </div>
      </div>
    </div>
  );
};

export default GeneralCardInfo;
