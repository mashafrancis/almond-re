import * as React from 'react';

export interface RestrictProps {
  authorize: string | string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
  strict: boolean;
}
