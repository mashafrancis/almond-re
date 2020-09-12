// react library
import React, { Component } from 'react';

// interfaces
import { RestrictProps } from './interface';

// helpers
import authorize from '@utils/authorize';

export class Restrict extends Component<RestrictProps> {
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
