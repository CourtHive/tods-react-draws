import React from 'react';
import { Meta, Story } from '@storybook/react';
import { EliminationStructure } from '../src';

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

const meta: Meta = {
  title: 'Draw',
  component: EliminationStructure,
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

const Template: Story = args => <EliminationStructure {...args} />;

export const Default = Template.bind({});

Default.args = {
  columns,
  roundMatchUps,
};
