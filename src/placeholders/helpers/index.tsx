// react libraries
import * as React from 'react';

// styles
import '../Loader.scss';

/**
 * This function renders multiple
 * loading contents
 *
 * @param {number} numberOfContents
 * @param {string} className
 *
 * @returns JSX
 */
export const renderContent = (numberOfContents, className) => {
  let elements: any[] = [];

  for (let i = 1; i <= numberOfContents; i += 1) {
    const content = <span key={i} className="loading" />;
    elements = [...elements, content];
  }

  return <div className={className}>{...elements}</div>;
};

/**
 * This function renders a single
 * loading element
 *
 * @param {string} elementClass
 * @param {number} key
 *
 * @returns JSX
 */
export const singleElement = (elementClass: string, key?: number) => {
  return <span key={key} className={`${elementClass}__item loading`} />;
};
