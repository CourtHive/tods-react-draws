import React from "react";

import { useStyles } from "./roundRobinStyles";
import { Grid } from "@material-ui/core";
import { getContextScoreString } from "./getContextScoreString";

export function getColumnComponents({
  contextData,
  dictionary,
  eventHandlers,
  rowData,
}) {
  const classes = useStyles();
  const rowDetails = [
    {
      key: "drawPosition",
      getHeader: (row) => ({
        children: <>{row?.structureName || ""}</>,
        cellClassName: classes.groupName,
        contentClassName: "",
      }),
      headerClick: (e, row) => {
        if (typeof eventHandlers?.onHeaderClick === "function") {
          const { groupStructureId, structureName } = row;
          eventHandlers.onHeaderClick({
            e,
            ...contextData,
            groupStructureId,
            columnName: "structureName",
            structureName,
          });
        }
      },
      getValue: (row) => ({
        children: <>{row?.drawPosition}</>,
        cellClassName: classes.drawPositions,
      }),
      onClick: (e, row) => {
        if (typeof eventHandlers?.onStatsClick === "function") {
          const { drawPosition, participant, participantResult } = row || {};
          eventHandlers.onStatsClick({
            e,
            drawPosition,
            participant,
            ...contextData,
            participantResult,
            columnName: "drawPosition",
          });
        }
      },
    },
    {
      key: "participant",
      getHeader: () => ({ node: "", cellClassName: classes.participantHeader }),
      getValue: (row) => {
        const participantDisplay =
          row?.participant?.participantName || (row?.bye && "BYE") || "";
        return {
          children: (
            <Grid container justifyContent="space-between">
              <Grid item>{participantDisplay}</Grid>
            </Grid>
          ),
          cellClassName:
            (!participantDisplay && classes.participantContainer) || "",
          contentClassName: classes.participantContent,
        };
      },
      onClick: (e, row) => {
        const { drawPosition, participant } = row || {};
        if (typeof eventHandlers?.onParticipantClick === "function") {
          eventHandlers.onParticipantClick({
            e,
            participant,
            drawPosition,
            ...contextData,
          });
        }
      },
    },
  ];

  const columnMatchUps = rowData[0]?.positionColumns?.map((position, i) => {
    const byeColumn = position?.bye;
    const participantDisplay =
      position?.participant?.participantName || (byeColumn && "BYE") || "";
    const getSideNumber = (matchUp, row) =>
      matchUp?.sides?.find(
        (side) => side.drawPosition && side.drawPosition === row?.drawPosition
      )?.sideNumber;

    return {
      key: `drawPosition${i.toString()}`,
      getHeader: () => {
        return {
          children: participantDisplay,
          cellClassName: classes.positions,
          contentClassName: classes.centerContent,
        };
      },
      headerClick: (e) => {
        if (typeof eventHandlers?.onParticipantClick === "function") {
          const { participant, drawPosition } = position;
          eventHandlers.onParticipantClick({
            e,
            drawPosition,
            participant,
            ...contextData,
          });
        }
      },
      onClick: (e, row) => {
        const matchUp = row?.matchUps && row?.matchUps[i];
        const sideNumber = getSideNumber(matchUp, row);
        if (typeof eventHandlers?.onScoreClick === "function") {
          eventHandlers.onScoreClick({
            e,
            matchUp,
            sideNumber,
            ...contextData,
          });
        }
      },
      getValue: (row) => {
        const matchUp = row?.matchUps && row?.matchUps[i];
        const sideNumber = getSideNumber(matchUp, row);
        const {
          contextScoreString,
          highlightLosingSide,
        } = getContextScoreString({
          matchUp,
          sideNumber,
          dictionary,
        });
        const reflexive = row?.rowIndex === position.rowIndex;
        const byeContent = byeColumn || row.bye;

        const cellClassName = reflexive
          ? classes.reflexiveContent
          : byeContent
          ? classes.byeContent
          : highlightLosingSide
          ? classes.loserContent
          : classes.cellContent;

        return {
          matchUp,
          byeColumn,
          children: contextScoreString || "",
          cellClassName,
          positionIndex: position.rowIndex,
          contentClassName: classes.centerContent,
        };
      },
    };
  });
  const participantResults = [
    {
      key: "winLoss",
      getHeader: () => {
        return {
          children: dictionary?.winLoss || "W/L",
          cellClassName: classes.valueHeader,
          contentClassName: classes.centerValue,
        };
      },
      headerClick: (e) => {
        console.log("winLossColumnClick");
        if (typeof eventHandlers?.onHeaderClick === "function") {
          eventHandlers.onHeaderClick({
            e,
            columnName: "winLoss",
            ...contextData,
          });
        }
      },
      getValue: (row) => {
        return {
          children: (
            <Grid container justifyContent="space-between">
              <Grid item>{row?.participantResult?.result}</Grid>
            </Grid>
          ),
          cellClassName: classes.cellContent,
          contentClassName: classes.centerValue,
        };
      },
      onClick: (e, row) => {
        if (typeof eventHandlers?.onStatsClick === "function") {
          const { drawPosition, participant, participantResult } = row || {};
          eventHandlers.onStatsClick({
            e,
            ...contextData,
            drawPosition,
            participant,
            participantResult,
            columnName: "winLoss",
          });
        }
      },
    },
    {
      key: "finishingPosition",
      getHeader: () => {
        return {
          children: dictionary?.finishingPosition || "Pos",
          cellClassName: classes.valueHeader,
          contentClassName: classes.centerValue,
        };
      },
      headerClick: (e) => {
        console.log("finishingPositionColumnClick");
        if (typeof eventHandlers?.onHeaderClick === "function") {
          eventHandlers.onHeaderClick({
            e,
            ...contextData,
            columnName: "finishingPosition",
          });
        }
      },
      getValue: (row) => {
        return {
          children: row?.participantResult?.groupOrder || "",
          cellClassName: classes.cellContent,
          contentClassName: classes.centerValue,
        };
      },
      onClick: (e, row) => {
        if (typeof eventHandlers?.onStatsClick === "function") {
          const { drawPosition, participant, participantResult } = row || {};
          eventHandlers.onStatsClick({
            e,
            drawPosition,
            participant,
            ...contextData,
            participantResult,
            columnName: "finishingPosition",
          });
        }
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
