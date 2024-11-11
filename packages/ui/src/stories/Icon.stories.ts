import type { Meta, StoryObj } from '@storybook/svelte';
import Icon from '$lib/icon/Icon.svelte';

const meta = {
  component: Icon,
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name/id to be used',
    },
    size: {
      control: 'text',
      description: 'Size of the icon',
      defaultValue: '24px'
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
      defaultValue: 'currentColor'
    }
  }
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'bell',
    size: '24px',
    color: '#fff'
  }
};

export const Large: Story = {
  args: {
    name: 'bell',
    size: '48px',
    color: '#fff'
  }
};

export const Colored: Story = {
  args: {
    name: 'bell',
    size: '24px',
    color: '#ff0000'
  }
};