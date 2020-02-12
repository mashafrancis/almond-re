// react library
import * as React from 'react';

// interfaces
import { RestrictProps } from './interface';

// helpers
import authorize from '@utils/helpers/authorize';

export class Restrict extends React.Component<RestrictProps> {
  static defaultProps = {
    fallback: null,
    strict: false,
  };

  render () {
    return authorize(this.props.authorize, { strict: this.props.strict })
      ? this.props.children
      : this.props.fallback;
  }
}

export default Restrict;
