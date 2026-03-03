import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'clinical',
      values: [
        { name: 'clinical', value: '#F0F4F5' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#212B32' },
      ],
    },
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 80, max: 320, step: 10 },
      description: 'Rendered width in pixels',
    },
    label: {
      control: 'text',
      description: 'Accessible aria-label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    width: 160,
  },
};

export const Large: Story = {
  args: { width: 280 },
};

export const Small: Story = {
  args: { width: 80 },
};

// TODO [CHALLENGE: Storybook]
// Add a story that shows the logo on a dark background and check contrast ratios
// Hint: use the backgrounds parameter above and toggle to 'dark'
