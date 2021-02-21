import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EliminationStructure } from '../../dist';

import { getRoundMatchUps } from '../../src/test/mocks/generateElimination';
import { generateRoundsDefinition } from '../../src/generators/generateRoundsDefinition';
import { generateStandardElimination } from '../../src/generators/columnGenerators/generateStandardElimination';

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
  const columns = generateStandardElimination({ height: 70, roundsDefinition });

  const onScoreClick = ({ matchUp, e }) => {
    console.log('Scoring matchUp', { matchUp, e });
  };
  const onParticipantClick = ({ matchUp, sideNumber, e }) => {
    console.log('Participant matchUp', { matchUp, sideNumber, e });
  };
  const args = { columns, roundMatchUps, onScoreClick, onParticipantClick };

  return (
    <div>
      <EliminationStructure {...args} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
