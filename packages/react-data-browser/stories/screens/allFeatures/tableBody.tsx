import React from 'react';
import { sort } from 'ramda';
import { getBySortField } from '../../../src/index';
import fieldReducer from './fieldReducer';
import { Checkbox } from '../../components/formElements';
import { TableBody, Row, RowItem } from '../../components/table';

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
              {fieldReducer(getBySortField(row, sortField), sortField, row)}
            </RowItem>
          ))}
        </Row>
      ))}
    </TableBody>
  );
};

export default Body;
