import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DrawGridStructure } from '../stories/DrawStructure.stories';
import { generateRoundsDefinition } from '../src/generateRoundsDefinition';
import { getRoundMatchUps } from '../src/test/mocks/generateElimination';

import {
  /*roundsDefinition,*/ generateColumns,
} from '../src/test/mocks/firstMock';

const { roundMatchUps } = getRoundMatchUps();

// add some mocked scores
const roundKeys = Object.keys(roundMatchUps);
roundKeys.forEach(key => {
  roundMatchUps[key].forEach(matchUp => {
    if (!matchUp.sides) matchUp.sides = matchUp.Sides;
    matchUp.score = `6-${matchUp.roundNumber} 6-${matchUp.roundPosition}`;
  });
});

const { roundsDefinition } = generateRoundsDefinition({
  roundMatchUps,
});
const columns = generateColumns({ height: 70, roundsDefinition });

describe('DrawStructure', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const args = { columns, roundMatchUps };
    ReactDOM.render(<DrawGridStructure {...args} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
