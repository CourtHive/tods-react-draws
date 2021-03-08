import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EliminationStructure } from '../../dist';

import { mocksEngine, tournamentEngine } from 'tods-competition-factory';

const App = () => {
  const drawProfiles = [
    {
      drawSize: 32,
      participantsCount: 30,
      /*
      outcomes: [
        {
          roundNumber: 1,
          roundPosition: 2,
          scoreString: '6-1 6-2',
          winningSide: 1,
        },
        {
          roundNumber: 1,
          roundPosition: 3,
          scoreString: '6-1 6-3',
          winningSide: 1,
        },
      ],
      */
    },
  ];
  const {
    eventIds: [eventId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    completeAllMatchUps: true,
  });

  const { eventData } = tournamentEngine.getEventData({ eventId }) || {};
  const onScoreClick = ({ matchUp, e }) => {
    console.log('Scoring matchUp', { matchUp, e });
  };
  const onParticipantClick = ({ matchUp, sideNumber, e }) => {
    console.log('Participant matchUp', {
      sideNumber,
      matchUp,
      e,
    });
  };
  const args = {
    eventData,
    onScoreClick,
    onParticipantClick,
  };

  return (
    <div>
      <EliminationStructure {...args} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
