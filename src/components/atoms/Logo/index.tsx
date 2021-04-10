import './Logo.scss';

import logo from '../../../assets/images/logo.png';

const Logo = (): JSX.Element => (
	<div className="main-logo" data-testid="logo">
		<span className="main-logo__image">
			<img className="main-logo__image" src={logo} alt="avatar" />
			<h4>Almond</h4>
		</span>
	</div>
);

export default Logo;
