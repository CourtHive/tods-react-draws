import React from 'react';
import { useStyles } from './roundRobinStyles';

export function RoundRobinStructure(props) {
  const classes = useStyles();

  const { eventData, onScoreClick, onParticipantClick } = props;

  const { drawsData } = eventData;
  let { drawId, structureId } = props;

  if (!drawId) drawId = drawsData?.length && drawsData[0].drawId;
  const drawData = drawsData?.find(drawData => drawData.drawId === drawId);

  return <>Round Robin Structure</>;
}
