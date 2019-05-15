import * as React from 'react';

export default function Select({ options, ...props }) {
  return (
    <select {...props}>
      <option label="" />
      {options.map(({ value }, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
