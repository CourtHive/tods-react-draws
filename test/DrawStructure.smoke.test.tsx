import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DrawGridStructure } from '../stories/DrawStructure.stories';

import { roundsDefinition, generateColumns } from '../test/mocks/firstMock';
const columns = generateColumns({ height: 70, roundsDefinition });

describe('DrawStructure', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DrawGridStructure columns={columns} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
