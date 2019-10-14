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
        <div style={{ display: 'flex', flex, ...style }}>
          <HeadRowItem>
            <label {...getLabelProps()}>
              {render(
                getToggleButtonProps({
                  style: {
                    cursor: 'pointer',
                    color: isOpen && 'black',
                  },
                }),
              )}
            </label>
            {isOpen && (
              <HeadCellMenu selected={selected} toggleMenu={toggleMenu} />
            )}
          </HeadRowItem>
        </div>
      );
    }}
  </Downshift>
);
