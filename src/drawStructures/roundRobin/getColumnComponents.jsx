import React from 'react';

import { Grid } from '@material-ui/core';

export function getColumnComponents({ contextData, dictionary, rowData }) {
  const rowDetails = [
    {
      key: 'drawPosition',
      getHeader: () => ({
        children: <>{(rowData && rowData[0].structureName) || ''}</>,
        className: '',
      }),
      getValue: row => {
        return {
          children: <>{row?.drawPosition}</>,
          className: '',
        };
      },
    },
    {
      key: 'participant',
      getHeader: () => ({ node: '', className: '' }),
      getValue: row => {
        const participantDisplay =
          row?.participant?.participantName || (row?.bye && 'BYE') || '';
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{participantDisplay}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
      onClick: (e, row) => {
        const { drawPosition, participant, rowIndex } = row || {};
        console.log({ drawPosition, participant, rowIndex, contextData });
      },
    },
  ];

  const columnMatchUps = rowData[0]?.positionColumns?.map((position, i) => {
    const participantDisplay =
      position?.participant?.participantName || (position?.bye && 'BYE') || '';
    return {
      key: `drawPosition${i.toString()}`,
      getHeader: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{participantDisplay}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
      headerClick: e => {
        console.log({ e, position, contextData });
      },
      onClick: (e, row) => {
        const matchUp = row?.matchUps && row?.matchUps[i];
        console.log({ matchUp }, matchUp?.drawPositions);
      },
      getValue: row => {
        const matchUp = row?.matchUps && row?.matchUps[i];
        const score = matchUp?.score?.scoreStringSide1;
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{score}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
    };
  });
  const participantResults = [
    {
      key: 'winLoss',
      getHeader: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{dictionary?.winLoss || 'W/L'}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
      getValue: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{row?.participantResult?.result}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
    },
    {
      key: 'finishingPosition',
      getHeader: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{dictionary?.finishingPosition || 'Pos'}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
      getValue: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{row?.participantResult?.groupOrder}</Grid>
            </Grid>
          ),
          className: '',
        };
      },
    },
  ];

  const columnComponents = [
    ...rowDetails,
    ...columnMatchUps,
    ...participantResults,
  ];
  return { columnComponents };
}
