import InputText from '$lib/inputs/InputText.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
    component: InputText,
    title: 'Components/Input/Text',
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'The input value'
        }
    }
} satisfies Meta<InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: ''
    }
};

export const WithPrefilledText: Story = {
    args: {
        value: 'Hello World'
    }
};

export const Placeholder: Story = {
    args: {
        value: '',
        placeholder: 'Enter your text here'
    }
};

export const WithLabel: Story = {
    args: {
        value: '',
        label: 'Enter your text here'
    }
};

export const WithError: Story = {
    args: {
        value: '',
        error: 'This is an error'
    }
};