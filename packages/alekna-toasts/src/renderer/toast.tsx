import React from 'react';

export default function Toast({ id, jsx, dismiss }) {
  return (
    <div
      onClick={() => dismiss(id)}
      style={{
        position: 'relative',
        background: 'green',
        width: 200,
        height: 100,
        marginTop: 10,
      }}
    >
      {jsx}
    </div>
  );
}
