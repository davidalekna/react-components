import React from 'react';
import styled from 'styled-components';
import { FlexProps, TextProps } from './types';
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  typography,
  border,
  position,
} from 'styled-system';

export const Flex = styled.div.attrs(({ theme }) => ({
  display: 'flex',
}))<FlexProps>(
  compose(
    flexbox,
    space,
    layout,
    position,
    typography,
    color,
    border,
  ),
);

export const Text = styled('span').attrs(({ theme }) => ({
  overflowWrap: 'break-word',
  lineHeight: '1em',
}))<TextProps>(
  compose(
    typography,
    space,
    color,
  ),
);

export const RootView = styled(Flex)`
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  position: relative;
  overflow-y: auto;
  width: 100vw;
`;

export const RootGrid = styled.section`
  display: grid;
  align-content: flex-start;
  overflow-x: auto;
  grid-gap: 15px;
  padding: 15px;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(260px, auto));
`;

export const Transition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
  reaction: {
    on: 'all 0.15s ease-in',
    off: 'all 0.1s ease-out',
  },
  dropdown: {
    off: 'all 0.35s ease-out',
  },
};
