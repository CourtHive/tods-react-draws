import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { GridStructure } from './GridStructure';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

/**
 * A Component to generate draws
 */
export const DrawStructure: FC<Props> = ({ children }) => {
  return <div>{children || <GridStructure />}</div>;
};
