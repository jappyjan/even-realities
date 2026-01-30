import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Card, CardContent, CardFooter, CardHeader } from './card';
import { Button } from './button';

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>Card header</CardHeader>
      <CardContent>
        <p className="text-app-body-2 text-tc-2">
          This is a simple card example using tokens.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm" variant="accent">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};
