import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDecorator, addParameters } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { Global, lightTheme, darkTheme } from '~/theme';
import { ColorProvider } from '~/components/Contexts/Color/Color';
import { Button } from '~/storybook/Button/Button';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const DarkModeContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

addDecorator(withNotes);
addDecorator(withKnobs);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'someDefault',
  },
});

let dark = false;

addDecorator(story => {
  const [darkMode, $$setDarkMode] = useState(dark);
  const setDarkMode = React.useCallback((toggle: boolean) => {
    $$setDarkMode((dark = toggle));
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <DarkModeContainer>
        <Button onClick={() => setDarkMode(!darkMode)}>DARK MODE</Button>
      </DarkModeContainer>

      <Router>
        <Reset />
        <Global />
        <ColorProvider default={theme.otherColors.logo}>{story()}</ColorProvider>
      </Router>
    </ThemeProvider>
  );
});
