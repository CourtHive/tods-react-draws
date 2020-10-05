import { getRoundMatchUps } from './mocks/generateElimination';
import { generateRoundsDefinition } from '../generateRoundsDefinition';

it('can generate roundMatchUps', () => {
  const { roundMatchUps } = getRoundMatchUps();
  const { roundsDefinition } = generateRoundsDefinition({ roundMatchUps });
  console.log({ roundsDefinition });
});
