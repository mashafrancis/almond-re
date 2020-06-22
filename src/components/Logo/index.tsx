import * as React from 'react';
import './Logo.scss';

const logo = 'https://res.cloudinary.com/almondgreen/image/upload/v1588810357/Almond/logo_vdwkvw.png';

const Logo = () => 
  <div className="main-logo">
    <span className="main-logo__image">
    <img
      className="main-logo__image"
      src={logo}
      alt="avatar"
      />
      <h4>Almond</h4>
    </span>
  </div>


export default Logo;
