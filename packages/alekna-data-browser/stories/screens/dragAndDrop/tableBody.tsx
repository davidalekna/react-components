import React from 'react';
import { sort } from 'ramda';
import { getBySortField } from '../../../src/index';
import fieldReducer from './fieldReducer';
import { Checkbox } from '../../components/formElements';
import { TableBody, Row, RowItem } from '../../components/table';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
    <Droppable droppableId="213">
      {provided => (
        <TableBody ref={provided.innerRef}>
          {sort(defaultSortMethod, data).map((row, key) => (
            <Draggable draggableId={row.id} index={key}>
              {provided => (
                <Row
                  selectable
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
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
                        getBySortField(row, sortField),
                        sortField,
                        row,
                      )}
                    </RowItem>
                  ))}
                </Row>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </TableBody>
      )}
    </Droppable>
  );
};

export default Body;
