import React from 'react';

export function getColumnComponents() {
  const rowDetails = [
    {
      key: 'drawPosition',
      getHeader: () => ({ children: <>Header</>, className: '' }),
      getValue: row => {
        return {
          children: <>{row?.drawPosition}</>,
          className: '',
        };
      },
    },
  ];

  const columnMatchUps = [];
  const participantResults = [];

  const columnComponents = [
    ...rowDetails,
    ...columnMatchUps,
    ...participantResults,
  ];
  return { columnComponents };
}
