import React from 'react';
import styled, { css, keyframes } from 'styled-components';
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
import {
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  PositionProps,
  TypographyProps,
  ColorProps,
  BorderProps,
} from 'styled-system';

export type FlexProps = FlexboxProps &
  SpaceProps &
  LayoutProps &
  PositionProps &
  TypographyProps &
  ColorProps &
  BorderProps;

export const Flex = styled.div.attrs(() => ({
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
