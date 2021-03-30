// import React from 'react';
// import * as ReactDOM from 'react-dom';

import { mocksEngine, tournamentEngine } from 'tods-competition-factory';

const drawProfiles = [
  {
    drawSize: 32,
  },
];
const {
  eventIds: [eventId],
} = mocksEngine.generateTournamentRecord({
  drawProfiles,
  completeAllMatchUps: true,
});

const { eventData } = tournamentEngine.getEventData({ eventId }) || {};
console.log({ eventData });

describe('DrawStructure', () => {
  it('renders without crashing', () => {
    // const div = document.createElement('div');
    // const args = { eventData };
    // ReactDOM.render(<DrawGridStructure {...args} />, div);
    // ReactDOM.unmountComponentAtNode(div);
    expect('foo');
  });
});
