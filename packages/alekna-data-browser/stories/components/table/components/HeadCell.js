import React from 'react';
import Downshift from 'downshift';
import { HeadRowItem } from '../styles';
import HeadCellMenu from './HeadCellMenu';

export const HeadCell = ({ style = {}, render, selected, flex }) => (
  <Downshift>
    {({
      isOpen,
      toggleMenu,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
    }) => {
      return (
        <div style={{ display: 'flex', flex, overflow: 'hidden', ...style }}>
          <HeadRowItem {...getLabelProps()}>
            {render({ getToggleButtonProps, isOpen })}
          </HeadRowItem>
          {isOpen && (
            <HeadCellMenu selected={selected} toggleMenu={toggleMenu} />
          )}
        </div>
      );
    }}
  </Downshift>
);
