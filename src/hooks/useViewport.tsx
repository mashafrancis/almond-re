import * as React from 'react';
import { ViewportContext } from '@context/ViewportContext';

export const useViewport = () => {
  const { width, height } = React.useContext(ViewportContext);
  return { width, height };
};
