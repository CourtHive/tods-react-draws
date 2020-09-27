import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DrawGridStructure } from '../../dist';
import { roundsDefinition, generateColumns } from '../../test/mocks/firstMock';

const App = () => {
  const columns = generateColumns({ height: 70, roundsDefinition });
  const args = { roundsDefinition, columns };
  return (
    <div>
      <DrawGridStructure {...args} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
