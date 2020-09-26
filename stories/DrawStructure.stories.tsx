import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DrawStructure, Props } from '../src';

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
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <DrawStructure {...args} />;

export const Default = Template.bind({});

Default.args = {};
