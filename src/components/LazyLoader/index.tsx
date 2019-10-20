// react libraries
import * as React from 'react';

// third party libraries
import LazyLoad from 'react-lazy-load';

// style
import './LazyLoader.scss';

// interface
import { LazyLoaderProps } from './interface.d';

const LazyLoader: React.SFC<LazyLoaderProps> = (props) => {
  const defaultProps = {
    offset: -100,
    overflow: true,
    scroll: true,
    ...props,
  };

  return (
    <LazyLoad {...defaultProps}>
      {props.children}
    </LazyLoad>
  );
};

export default LazyLoader;
