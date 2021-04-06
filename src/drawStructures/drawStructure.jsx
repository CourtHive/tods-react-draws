import React from 'react';

import { EliminationStructure } from './elimination/EliminationStructure';
import { RoundRobinStructure } from './roundRobin/RoundRobinStructure';

export function DrawStructure(props) {
  const { dictionary, eventData, eventHandlers, nameFilter } = props;
  const drawsData = eventData?.drawsData;
  let { drawId, structureId } = props;

  if (!drawId) drawId = drawsData?.length && drawsData[0].drawId;
  const drawData = drawsData?.find(drawData => drawData?.drawId === drawId);
  if (!structureId)
    structureId =
      drawData?.structures?.length && drawData.structures[0].structureId;

  const structure = drawData?.structures?.find(
    structure => structure.structureId === structureId
  );

  // ROUND_ROBIN structures have { structureType: CONTAINER }
  const isRoundRobin = structure?.structureType === 'CONTAINER';

  const args = {
    drawId,
    eventData,
    structureId,
    dictionary,
    eventHandlers,
    nameFilter,
  };

  return (
    <>
      {isRoundRobin ? (
        <RoundRobinStructure {...args} />
      ) : (
        <EliminationStructure {...args} />
      )}
    </>
  );
}
