import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'storeis/Button',
	component: Button
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Large: Story = {
	args: {
		label: '검섹',
		size: 'large'
	}
};

export const Small: Story = {
	args: {
		label: '검섹',
		size: 'small'
	}
};
