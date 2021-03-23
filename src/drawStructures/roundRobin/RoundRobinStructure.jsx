import React from 'react';
import { RoundRobinGroup } from './RoundRobinGroup';
import { generateRoundRobinRows } from '../../generators/generateRoundRobinRows';

export function RoundRobinStructure(props) {
  const { eventData, dictionary, eventHandlers } = props;
  const { eventId } = eventData.eventInfo;

  const { drawsData } = eventData;
  const { drawId, structureId } = props;
  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

  const structureData = drawData?.structures?.find(
    structure => structure.structureId === structureId
  );
  const { roundMatchUps, participantResults } = structureData || {};
  const { rows } = generateRoundRobinRows({
    roundMatchUps,
    participantResults,
  });

  const contextData = { drawId, eventId, structureId };

  return (
    <>
      {rows.map((rowData, key) => (
        <RoundRobinGroup
          rowData={rowData}
          key={`CHRRG-${key}`}
          dictionary={dictionary}
          contextData={contextData}
          eventHandlers={eventHandlers}
        />
      ))}
    </>
  );
}
/*
 */
