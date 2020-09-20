// react library
import { Component } from 'react';

// helpers
import authorize from '@utils/authorize';

// interfaces
import { RestrictProps } from './interface';

export class Restrict extends Component<RestrictProps> {
	static defaultProps = {
		fallback: null,
		strict: false,
	};

	render() {
		return authorize(this.props.authorize, { strict: this.props.strict })
			? this.props.children
			: this.props.fallback;
	}
}

export default Restrict;
