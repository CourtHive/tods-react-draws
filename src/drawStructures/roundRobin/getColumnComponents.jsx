import React from 'react';

import { useStyles } from './roundRobinStyles';
import { Grid } from '@material-ui/core';

export function getColumnComponents({ contextData, dictionary, rowData }) {
  const classes = useStyles();
  const rowDetails = [
    {
      key: 'drawPosition',
      getHeader: () => ({
        children: <>{(rowData && rowData[0].structureName) || ''}</>,
        cellClassName: classes.groupName,
        contentClassName: '',
      }),
      getValue: row => ({
        children: <>{row?.drawPosition}</>,
        cellClassName: classes.drawPositions,
      }),
    },
    {
      key: 'participant',
      getHeader: () => ({ node: '', cellClassName: classes.participantHeader }),
      getValue: row => {
        const participantDisplay =
          row?.participant?.participantName || (row?.bye && 'BYE') || '';
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{participantDisplay}</Grid>
            </Grid>
          ),
          contentClassName: classes.participantContent,
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
          children: participantDisplay,
          cellClassName: classes.positions,
          contentClassName: classes.centerContent,
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
            <Grid
              container
              justify="space-between"
              className={classes.contentContainer}
            >
              <Grid item>{score}</Grid>
            </Grid>
          ),
          cellClassName: classes.cellContent,
          contentClassName: classes.centerContent,
        };
      },
    };
  });
  const participantResults = [
    {
      key: 'winLoss',
      getHeader: row => {
        return {
          children: dictionary?.winLoss || 'W/L',
          cellClassName: classes.positions,
          contentClassName: classes.centerContent,
        };
      },
      getValue: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{row?.participantResult?.result}</Grid>
            </Grid>
          ),
          cellClassName: classes.cellContent,
          contentClassName: classes.centerContent,
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
          cellClassName: classes.positions,
          contentClassName: classes.centerContent,
        };
      },
      getValue: row => {
        return {
          children: (
            <Grid container justify="space-between">
              <Grid item>{row?.participantResult?.groupOrder}</Grid>
            </Grid>
          ),
          cellClassName: classes.cellContent,
          contentClassName: classes.centerContent,
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
