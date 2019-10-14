import React from 'react';
import { sort } from 'ramda';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { getObjectPropertyByString } from '../../../src/index';
import { RootView } from '../../components/globals';
import { TableHead, TableBody, Row, RowItem } from '../../components/table';
import { BaseTable } from '../base';
import fieldReducer from './fieldReducer';
import { Checkbox } from '../../components/formElements';
import { HeadCell } from '../../components/table/components/HeadCell';

const Body = ({
  defaultSortMethod,
  data,
  fixedColWidth,
  checkboxState,
  checkboxToggle,
  visibleColumns,
  onTableRowClick,
  columnFlex,
}: any) => {
  return (
    <TableBody>
      {sort(defaultSortMethod, data).map((row, key) => (
        <Row key={key} selectable>
          <RowItem width={fixedColWidth} flex="0 0 auto">
            <Checkbox
              id={row.id}
              checked={checkboxState(row.id)}
              onChange={() => {
                checkboxToggle({ rowId: row.id });
              }}
            />
          </RowItem>
          {visibleColumns.map(({ sortField }, index) => (
            <RowItem
              key={sortField}
              flex={columnFlex[index]}
              checked={checkboxState(row.id)}
              onClick={() => onTableRowClick(`row id ${row.id}`)}
            >
              {fieldReducer(
                getObjectPropertyByString(row, sortField),
                sortField,
                row,
              )}
            </RowItem>
          ))}
        </Row>
      ))}
    </TableBody>
  );
};

function Demo({
  onTableRowClick,
  onToggleSort,
  onCheckboxToggle,
  onSelectAll,
  onDeselectAll,
  onSortData,
  onReplaceColumnFlex,
}) {
  const fixedColWidth = 40;

  return (
    <BaseTable
      onToggleSort={onToggleSort}
      onCheckboxToggle={onCheckboxToggle}
      onSelectAll={onSelectAll}
      onDeselectAll={onDeselectAll}
      onSortData={onSortData}
      onTableRowClick={onTableRowClick}
      onReplaceColumnFlex={onReplaceColumnFlex}
    >
      {(viewSwitch, data, loading, dbProps) => {
        const {
          columnFlex,
          visibleColumns,
          selectAllCheckboxState,
          onSelection,
        } = dbProps;

        return (
          <RootView>
            {/* HEAD */}
            <TableHead>
              {/* Head Columns */}
              <HeadCell
                flex="0 0 auto"
                selected
                style={{
                  position: 'relative',
                  width: fixedColWidth,
                }}
                render={() => (
                  <Checkbox
                    selectAllCheckboxState={selectAllCheckboxState}
                    disabled={loading}
                    onChange={() => {
                      onSelection({
                        items: data.map(row => row.id),
                      });
                    }}
                  />
                )}
              />
              {visibleColumns.map((cell, index) => (
                <HeadCell
                  key={index}
                  selected={cell}
                  flex={columnFlex[index]}
                  style
                  // onClick={() => toggleSort({ sortField: cell.sortField })}
                  render={props => <div {...props}>{cell.label}</div>}
                />
              ))}
            </TableHead>
            {viewSwitch({
              list: Body,
            })}
          </RootView>
        );
      }}
    </BaseTable>
  );
}

storiesOf('features', module).add('Demo', () => (
  <Demo
    onSelectAll={action('onSelectAll')}
    onDeselectAll={action('onDeselectAll')}
    onCheckboxToggle={action('onCheckboxToggle')}
    onTableRowClick={action('onTableRowClick')}
    onToggleSort={action('onToggleSort')}
    onSortData={action('onSortData')}
    onReplaceColumnFlex={action('onReplaceColumnFlex')}
  />
));
