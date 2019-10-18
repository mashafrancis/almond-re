// react libraries
import * as React from 'react';

// third party
import MaterialIcon from '@material/react-material-icon';

// styles
import './InternalServerError.scss';

// interfaces
import { InternalServerErrorMessageProps } from '../../components/InternalServerErrorMessage/interfaces';

const InternalServerErrorMessage: React.FunctionComponent<InternalServerErrorMessageProps> = (props) => {
  return (
    <div id="internal-server-error">
      <div className="server-error">
        <div className="server-error-500"/>
        <h1>500</h1>
        <h2>Sorry. It is not you. It is us.</h2>
        <p>We are experiencing an internal server problem.</p>
        <p>Please try again later or contact support <span
          className="mail">almond.froyo@gmail.com</span></p>
          <button onClick={props.history.goBack} className="mdc-button mdc-button--raised">
            <MaterialIcon className="back-button" icon="arrow_back" />
            <span className="mdc-button__label">Back to homepage</span>
          </button>
      </div>
    </div>
  );
};

export default InternalServerErrorMessage;
