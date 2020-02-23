import * as React from 'react';

export interface MenuComponentProps {
  primaryText: string;
  component: any; /* TODO: Fix type */
  icon: any;
}

export interface MenuBottomProps {
  label: string;
  icon: any;
  value: string;
}
