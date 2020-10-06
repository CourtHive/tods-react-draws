import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DrawGridStructure } from '../../dist';
import {
  // roundsDefinition,
  generateColumns,
} from '../../src/test/mocks/firstMock';

import { getRoundMatchUps } from '../../src/test/mocks/generateElimination';
import { generateRoundsDefinition } from '../../src/generateRoundsDefinition';

const App = () => {
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

  const onScoreClick = ({ matchUp }) => {
    console.log('Scoring matchUp', { matchUp });
  };
  const onParticipantClick = ({ matchUp, sideNumber }) => {
    console.log('Participant matchUp', { matchUp, sideNumber });
  };
  const args = { columns, roundMatchUps, onScoreClick, onParticipantClick };

  return (
    <div>
      <DrawGridStructure {...args} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
