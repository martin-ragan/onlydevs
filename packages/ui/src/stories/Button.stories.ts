import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../lib/button/Button.svelte';
import Icon from '../lib/icon/Icon.svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Halo'
  }
};
