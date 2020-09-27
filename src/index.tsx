import React from 'react';
import { GridStructure } from './GridStructure';

/**
 * A Component to generate draws
 */
export const DrawGridStructure = props => {
  return (
    <div>
      <GridStructure {...props} />
    </div>
  );
};
