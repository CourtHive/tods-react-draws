import {
  drawDefinitionConstants,
  tournamentEngine,
  drawEngine,
  fixtures,
} from 'tods-competition-factory';

import { eventConstants } from 'tods-competition-factory';

const { SINGLES } = eventConstants;

const { SEEDING_ITF } = fixtures;
const { MAIN, ELIMINATION } = drawDefinitionConstants;

export function getRoundMatchUps({ participantsCount = 32 } = {}) {
  const drawSize = participantsCount / 2;
  const { tournamentRecord, participants } = tournamentRecordWithParticipants({
    startDate: '2020-01-01',
    endDate: '2020-01-06',
    participantsCount,
  });

  const mainDrawParticipantIds = participants
    .slice(0, drawSize)
    .map(participant => participant.participantId);

  tournamentEngine.setState(tournamentRecord);
  drawEngine.newDrawDefinition();
  drawEngine.attachPolicy({ policyDefinition: SEEDING_ITF });
  drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  drawEngine.generateDrawType({ stage: MAIN, drawType: ELIMINATION });
  drawEngine.addDrawEntries({
    stage: MAIN,
    participantIds: mainDrawParticipantIds,
  });
  const { structures: mainStructures } = drawEngine.getDrawStructures({
    stage: MAIN,
    stageSequence: 1,
  });
  const [mainStructure] = mainStructures;
  const { structureId: mainStructureId } = mainStructure;

  drawEngine.automatedPositioning({ structureId: mainStructureId });

  const { drawDefinition } = drawEngine.getState();
  const { matchUps } = drawEngine.allDrawMatchUps({ drawDefinition });

  const { roundMatchUps } = drawEngine.getRoundMatchUps({ matchUps });
  return { roundMatchUps };
}

function tournamentRecordWithParticipants({
  startDate,
  endDate,
  participantsCount,
  matchUpType = SINGLES,
}) {
  tournamentEngine.newTournamentRecord({ startDate, endDate });

  const { participants } = tournamentEngine.generateFakeParticipants({
    participantsCount,
    matchUpType,
  });

  tournamentEngine.addParticipants({ participants });

  return { tournamentRecord: tournamentEngine.getState(), participants };
}
