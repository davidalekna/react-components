import React from 'react';
import { sort } from 'ramda';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { getObjectPropertyByString } from '../../../src/index';
import { View } from '../../components/globals';
import {
  TableHead,
  HeadRowItem,
  TableBody,
  TableRow,
  TableRowItem,
} from '../../components/table';
import { BaseTable } from '../base';
import fieldReducer from './fieldReducer';

function Demo({ onTableRowClick, onToggleSort }) {
  return (
    <BaseTable onToggleSort={onToggleSort}>
      {(
        data,
        { columnFlex, visibleColumns, defaultSortMethod, toggleSort },
      ) => (
        <View>
          <TableHead>
            {visibleColumns.map((cell, index) => (
              <HeadRowItem
                key={index}
                selected={cell}
                flex={columnFlex[index]}
                onClick={() => toggleSort({ sortField: cell.sortField })}
              >
                {cell.label}
              </HeadRowItem>
            ))}
          </TableHead>
          <TableBody>
            {sort(defaultSortMethod, data).map((row, key) => (
              <TableRow key={key} selectable>
                {visibleColumns.map(({ sortField, isLocked }, index) => (
                  <TableRowItem
                    key={sortField}
                    flex={columnFlex[index]}
                    cursor="pointer"
                    onClick={() => onTableRowClick(`row id ${row.id}`)}
                  >
                    {isLocked && `🔒 `}
                    {fieldReducer(
                      getObjectPropertyByString(row, sortField),
                      sortField,
                    )}
                  </TableRowItem>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </View>
      )}
    </BaseTable>
  );
}

storiesOf('sort', module).add('Demo', () => (
  <Demo
    onTableRowClick={action('onTableRowClick')}
    onToggleSort={action('onToggleSort')}
  />
));
