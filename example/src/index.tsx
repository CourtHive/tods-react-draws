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
    drawIds: [drawId],
    eventIds: [eventId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    completeAllMatchUps: true,
  });

  const { eventData } = tournamentEngine.getEventData({ eventId }) || {};
  const structureId = eventData.drawsData.find(
    drawData => drawData.drawId == drawId
  )?.structures[0]?.structureId;

  const onScoreClick = ({ matchUpDetails, e }) => {
    console.log('Scoring matchUp', { matchUpDetails, e });
  };
  const onParticipantClick = ({ matchUpDetails, sideNumber, e }) => {
    console.log('Participant matchUp', { matchUpDetails, sideNumber, e });
  };
  const args = {
    eventData,
    drawId,
    structureId,
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
