import React from 'react';
import { useStyles } from './roundRobinStyles';
import { RoundRobinGroup } from './RoundRobinGroup';
import { generateRoundRobinRows } from '../../generators/generateRoundRobinRows';

export function RoundRobinStructure(props) {
  const classes = useStyles();

  const { eventData, dictionary, onScoreClick, onParticipantClick } = props;

  const { drawsData } = eventData;
  let { drawId, structureId } = props;

  if (!drawId) drawId = drawsData?.length && drawsData[0].drawId;
  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);
  if (!structureId)
    structureId =
      drawData?.structures?.length && drawData.structures[0].structureId;

  const { eventId } = eventData.eventInfo;
  const contextData = { drawId, eventId, structureId };

  const structureData = drawData?.structures?.find(
    structure => structure.structureId === structureId
  );
  const { roundMatchUps, participantResults } = structureData || {};
  const { rows } = generateRoundRobinRows({
    roundMatchUps,
    participantResults,
  });

  return (
    <>
      {rows.map((rowData, key) => (
        <RoundRobinGroup
          rowData={rowData}
          key={`CHRRG-${key}`}
          dictionary={dictionary}
          contextData={contextData}
          onScoreClick={onScoreClick}
          onParticipantClick={onParticipantClick}
        />
      ))}
    </>
  );
}
/*
 */
