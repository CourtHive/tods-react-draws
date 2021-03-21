import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import { BaseInput } from './BaseInput';

import { drawDefinitionConstants, utilities } from 'tods-competition-factory';
const {
  SINGLE_ELIMINATION,
  ROUND_ROBIN,
  MULTI_STRUCTURE_DRAWS,
} = drawDefinitionConstants;

export function DrawType({ drawType, onChange }) {
  const renderIcon = props => (
    <ExpandMoreIcon {...props} fontSize="small" style={{ top: 'unset' }} />
  );
  const drawTypes = utilities
    .unique([SINGLE_ELIMINATION, ROUND_ROBIN, ...MULTI_STRUCTURE_DRAWS])
    .sort();
  const menuItems = drawTypes.map(t => (
    <MenuItem key={t} value={t}>
      {t.split('_').join(' ')}
    </MenuItem>
  ));

  return (
    <Select
      value={drawType}
      input={<BaseInput />}
      IconComponent={renderIcon}
      onChange={e => onChange(e.target.value)}
    >
      {menuItems}
    </Select>
  );
}
