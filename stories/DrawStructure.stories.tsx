import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DrawStructure } from '../src';

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

const meta: Meta = {
  title: 'Draw',
  component: DrawStructure,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: false },
  },
};

export default meta;

const Template: Story = args => <DrawStructure {...args} />;

export const Default = Template.bind({});

Default.args = {
  eventData,
};
