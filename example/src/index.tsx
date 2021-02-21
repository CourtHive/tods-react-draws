import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EliminationStructure } from '../../dist';

import { generateRoundsDefinition } from '../../src/generators/generateRoundsDefinition';
import { generateStandardElimination } from '../../src/generators/columnGenerators/generateStandardElimination';

import {
  drawEngine,
  mocksEngine,
  tournamentEngine,
} from 'tods-competition-factory';

const App = () => {
  const drawProfiles = [
    {
      drawSize: 32,
      participantsCount: 30,
      outcomes: [
        {
          roundNumber: 1,
          roundPosition: 2,
          scoreString: '6-2 6-1',
          winningSide: 1,
        },
      ],
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

  const { roundMatchUps } = drawEngine.getRoundMatchUps({ matchUps });
  const { roundsDefinition } = generateRoundsDefinition({ roundMatchUps });
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
