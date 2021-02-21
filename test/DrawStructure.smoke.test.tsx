import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DrawGridStructure } from '../stories/DrawStructure.stories';
import { generateRoundsDefinition } from '../src/generators/generateRoundsDefinition';

import {
  drawEngine,
  mocksEngine,
  tournamentEngine,
} from 'tods-competition-factory';

import {
  /*roundsDefinition,*/ generateColumns,
} from '../src/test/mocks/firstMock';

const drawProfiles = [
  {
    drawSize: 32,
  },
];
const {
  drawIds: [drawId],
} = mocksEngine.generateTournamentRecord({
  drawProfiles,
});

const { matchUps } = tournamentEngine.allDrawMatchUps({
  drawId,
  inContext: true,
});

const { roundMatchUps } = drawEngine.getRoundMatchUps({
  matchUps,
});

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
