import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Bar, BarContent } from './Bar';

export default { title: 'Atoms|Bar' };

export const Default: React.FC = () => {
  return (
    <Bar>
      <BarContent
        justify={select(
          'Justify',
          {
            Default: undefined,
            Between: 'between',
            Around: 'around',
            End: 'end',
          },
          undefined
        )}
      >
        <div>Content here</div>
        <div>will be</div>
        <div>spaced aligned left and contained</div>
      </BarContent>
    </Bar>
  );
};
