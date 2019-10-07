import React from 'react';
import { Body } from './Body/Body';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <Body>{children}</Body>
    <Footer />
  </>
);
