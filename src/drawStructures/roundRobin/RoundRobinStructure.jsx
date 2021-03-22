import React from 'react';
import { RoundRobinGroup } from './RoundRobinGroup';
import { generateRoundRobinRows } from '../../generators/generateRoundRobinRows';

export function RoundRobinStructure(props) {
  const { eventData, dictionary, onScoreClick, onParticipantClick } = props;

  const { drawsData } = eventData;
  const { drawId, structureId } = props;

  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

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
