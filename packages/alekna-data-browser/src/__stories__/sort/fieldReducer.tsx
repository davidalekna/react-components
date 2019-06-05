import React from 'react';

export default function fieldReducer(
  fieldValue: any = '🍔',
  fieldName: string,
) {
  switch (fieldName) {
    case 'name':
      return `🌄 ${fieldValue}`;
    case 'username':
      return `📝 ${fieldValue}`;
    case 'email':
      return (
        <div style={{ color: 'orange', fontStyle: 'italic' }}>{fieldValue}</div>
      );
    default:
      return fieldValue;
  }
}
