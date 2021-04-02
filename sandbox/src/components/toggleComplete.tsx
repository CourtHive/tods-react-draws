import * as React from 'react';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export function Completion({ completion, onChange }) {
  return (
    <ToggleButtonGroup
      value={completion}
      exclusive
      onChange={onChange}
      style={{ height: 36 }}
    >
      <ToggleButton value={'complete'}>Complete</ToggleButton>
      <ToggleButton value={'incomplete'}>Incomplete</ToggleButton>
      <ToggleButton value={'manual'}>Manual</ToggleButton>
    </ToggleButtonGroup>
  );
}
