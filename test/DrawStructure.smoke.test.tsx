import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DrawStructure } from '../stories/DrawStructure.stories';

describe('DrawStructure', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DrawStructure />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
