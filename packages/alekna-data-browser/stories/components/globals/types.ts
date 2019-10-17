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

export type TextProps = TypographyProps & SpaceProps & ColorProps;
