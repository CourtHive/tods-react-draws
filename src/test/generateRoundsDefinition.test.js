import { generateRoundsDefinition } from '../generateRoundsDefinition';
import {
  drawEngine,
  mocksEngine,
  tournamentEngine,
} from 'tods-competition-factory';

it('can generate roundsDefinition', () => {
  const drawProfiles = [
    {
      drawSize: 32,
    },
  ];
  const {
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
  });

  const { matchUps } = tournamentEngine.allDrawMatchUps({
    drawId,
    inContext: true,
  });

  const { roundMatchUps } = drawEngine.getRoundMatchUps({
    matchUps,
  });
  const { roundsDefinition } = generateRoundsDefinition({ roundMatchUps });
  console.log({ roundsDefinition });
});
