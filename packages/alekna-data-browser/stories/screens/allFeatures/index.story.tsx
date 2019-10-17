import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RootView } from '../../components/globals';
import { TableHead, HeadCellText } from '../../components/table';
import { BaseTable } from '../../utils/base';
import { Checkbox } from '../../components/formElements';
import { HeadCell } from '../../components/table/components/HeadCell';
import TableListBody from './tableBody';

// TODO: use css prop for the header text to truncate long string

function Demo({
  onTableRowClick,
  onToggleSort,
  onCheckboxToggle,
  onSelectAll,
  onDeselectAll,
  onSortData,
  onReplaceColumnFlex,
}) {
  const fixedColWidth = 45;

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
                style={{
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
                  // onClick={() => toggleSort({ sortField: cell.sortField })}
                  render={({ isOpen, getToggleButtonProps }) => (
                    <HeadCellText {...getToggleButtonProps({ isOpen })}>
                      {cell.label}
                    </HeadCellText>
                  )}
                />
              ))}
            </TableHead>
            {viewSwitch({
              list: props => (
                <TableListBody {...props} fixedColWidth={fixedColWidth} />
              ),
            })}
          </RootView>
        );
      }}
    </BaseTable>
  );
}

storiesOf('all features', module).add('Demo', () => (
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
