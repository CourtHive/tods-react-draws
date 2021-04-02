import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import { BaseInput } from './BaseInput';

export function SelectStructure({ structureName, structureNames, onChange }) {
  const renderIcon = props => (
    <ExpandMoreIcon {...props} fontSize="small" style={{ top: 'unset' }} />
  );
  const menuItems = structureNames.map(t => (
    <MenuItem key={t} value={t}>
      {t.split('_').join(' ')}
    </MenuItem>
  ));

  return (
    <Select
      value={structureName}
      input={<BaseInput />}
      IconComponent={renderIcon}
      onChange={e => onChange(e.target.value)}
    >
      {menuItems}
    </Select>
  );
}
