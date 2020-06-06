import * as React from "react";

export interface TopBarProps {
  photoImage: React.ReactNode;
  openProfileDialog: any;
  isActivityLogsEmpty: boolean;
  children?: React.ReactElement | any;
  window?: () => Window;
}

export interface ElevationBarProps {
  window?: () => Window;
  children: React.ReactElement;
}
