import React from 'react';
import { useStyles } from './styles/gridStyles';
import cx from 'classnames';

import { Grid } from '@material-ui/core';

export function EliminationStructure(props) {
  const { columns, onScoreClick, onParticipantClick } = props;
  const classes = useStyles();

  const RoundName = ({ round }) => {
    const notConnectors = round.columnType !== 'connectors';
    const roundName = notConnectors && round.roundName;
    const bottom =
      (roundName && classes.thickBorderBottom) || classes.noBoderBottom;
    const className = `${classes.roundName} ${bottom}`;
    return <div className={className}>{roundName || ' '}</div>;
  };

  const handleScoreClick = ({ matchUpDetails, e }) => {
    if (typeof onScoreClick === 'function') {
      onScoreClick({ matchUpDetails, e });
    }
  };
  const handleParticipantClick = ({ matchUpDetails, sideNumber, e }) => {
    if (typeof onParticipantClick === 'function') {
      onParticipantClick({ matchUpDetails, sideNumber, e });
    }
  };

  const Side = ({ round, sideDetails, displayOnly }) => {
    const { side, readyToScore, matchUpDetails } = sideDetails || {};
    const { bye, drawPosition, participant, sideNumber } = side || {};
    const dpText = drawPosition || '';
    const seed = side?.seedValue;
    let sideText = bye ? 'BYE' : participant?.participantName || '';
    if (seed) sideText += ` (${seed})`;

    const participantStyle = !displayOnly
      ? {
          className: cx(classes.participant, {
            [classes.seededPrticipant]: seed,
            [classes.readyToScore]: readyToScore && displayOnly,
            [classes.hoveredPrticipant]: !displayOnly,
          }),
          width: '100%',
        }
      : {
          className: cx(classes.participant, {
            [classes.seededPrticipant]: seed,
          }),
        };

    const participantProps = {
      onClick: e => {
        handleParticipantClick({
          matchUpDetails,
          sideNumber,
          e,
        });
      },
      width: '100%',
      direction: 'row',
      justify: 'space-between',
    };
    const displayText = round?.columnType === 'classic';
    const displayDetails = round?.columnType === 'details';

    return (
      <Grid container {...participantStyle} {...participantProps}>
        <Grid item>
          {(displayText && sideText) || (displayDetails && dpText)}
        </Grid>
      </Grid>
    );
  };

  const Score = ({ round, scoreDetails, displayOnly }) => {
    const { scoreString, sourceMatchUpDetails } = scoreDetails || {};
    const displayText = round?.columnType === 'classic';
    const scoreProps = {
      onClick: e => {
        !displayOnly &&
          handleScoreClick({ matchUpDetails: sourceMatchUpDetails, e });
      },
      className: classes.score,
    };

    return <div {...scoreProps}>{displayText && scoreString}</div>;
  };

  const Frames = ({ column, displayOnly }) => {
    const { frames, round, matchUpHeight, firstMatchUpHeight } = column;
    return (
      <>
        <RoundName round={round} />
        {frames.map((frame, index) => {
          const isDetails = round?.columnType === 'details';
          const scoreDetails = (index && frame[0]) || [];
          const sideDetails = frame[frame.length - 1];

          const columnEnd = index && frame.length === 1;
          const isEven = index % 2;
          const height = columnEnd
            ? undefined
            : index
            ? matchUpHeight
            : firstMatchUpHeight;

          const contentProps = {
            style: { height },
            direction: 'column',
            justify: 'space-between',
            className:
              (isEven && !isDetails && classes.borderRight) || undefined,
          };

          const className = columnEnd
            ? ''
            : isEven
            ? classes.bracketBottom
            : classes.bracketTop;

          return (
            <Grid key={index} item className={className}>
              <Grid container {...contentProps}>
                <Score
                  round={round}
                  scoreDetails={scoreDetails}
                  displayOnly={displayOnly}
                />
                {columnEnd ? null : (
                  <Side
                    round={round}
                    sideDetails={sideDetails}
                    displayOnly={displayOnly}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  const GridColumns = ({ columns }) =>
    columns.map((column, columnIndex) => {
      const { round, matchUpHeight, firstMatchUpHeight } = column;
      const matchUpsCount = round.matchUpsCount;
      const displayText = round.columnType === 'classic';
      const matchUps = round.matchUps || [];

      const firstRound = round.roundNumber === 1;
      const classNames = {
        details: 'detailsColumn',
        divider: 'verticalDivider',
        connectors: 'connectorColumn',
        classic: firstRound ? 'initialColumn' : 'roundColumn',
      };
      const divider = round.columnType === 'divider';
      const columnClass = classNames[round.columnType];
      const className = classes[columnClass];

      // TODO: column width needs to be calculated based on # of detail columns
      const detailsCount = round?.details?.length || 1;
      const maxWidth =
        round?.columnType === 'details' ? detailsCount * 30 : undefined;

      return (
        <Grid
          container
          direction="column"
          key={columnIndex}
          className={className}
          style={{ maxWidth }}
        >
          {!divider && <Frames column={column} />}
        </Grid>
      );
    });

  return (
    <Grid container direction="row" className={classes.drawRoot}>
      <GridColumns columns={columns} />
    </Grid>
  );
}
