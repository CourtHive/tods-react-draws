import React from 'react';
import { getColumnComponents } from './getColumnComponents';
import { useStyles } from './roundRobinStyles';

export function RoundRobinGroup(props) {
  const classes = useStyles();

  const { eventData, onScoreClick, onParticipantClick } = props;

  const { drawsData } = eventData;
  let { drawId, structureId, groupStructureId } = props;

  if (!drawId) drawId = drawsData?.length && drawsData[0].drawId;
  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

  const structureData = drawData?.structures?.find(
    structure => structure.structureId === structureId
  );

  const { roundMatchUps } = structureData || {};
  const allMatchUps = Object.values(roundMatchUps).flat();
  const groupMatchUps = allMatchUps.filter(
    matchUp => matchUp.structureId === groupStructureId
  );
  const positionAssignments = groupMatchUps.reduce(
    (positionAssignments, { sides }) => {
      sides.forEach(({ bye, drawPosition, participant, qualifier }) => {
        const participantResults = strucure.participantResults.find(
          ({ participantId }) => participant.participantId === participantId
        );
        positionAssignments[drawPosition] = {
          bye,
          drawPosition,
          participant,
          participantResults,
          qualifier,
        };
      });
      return positionAssignments;
    },
    {}
  );
  const groupDrawPositions = Object.keys(positionAssignments);

  const columnComponents = getColumnComponents();
  const rowData = [];

  return (
    <div className={classes.tableContainer}>
      <GroupTable columnComponents={columnComponents} data={rowData} />
    </div>
  );
}
