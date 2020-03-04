import React, { useState } from 'react';
import { Tooltip } from '~/storybook/components/Tooltip/Tooltip';

interface CopyToClioboardProps {
  text?: string;
}

export const CopyToClioboard: React.FC<CopyToClioboardProps> = ({ children, text }) => {
  const [message, setMessage] = useState('Click to copy!');

  const onClick = () => {
    try {
      navigator.clipboard.writeText(text!);
      setMessage('Copied!');
    } catch (err) {
      console.error(err);
      setMessage('Error!');
    }
  };

  return (
    <div onClick={onClick}>
      <Tooltip value={message}>{children}</Tooltip>
    </div>
  );
};
