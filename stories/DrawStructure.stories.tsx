import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DrawGridStructure } from '../src';

import { roundsDefinition, generateColumns } from '../test/mocks/firstMock';

const columns = generateColumns({ height: 70, roundsDefinition });

const meta: Meta = {
  title: 'Draw',
  component: DrawGridStructure,
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

const Template: Story = args => <DrawGridStructure {...args} />;

export const Default = Template.bind({});

Default.args = {
  columns,
  roundsDefinition,
};
