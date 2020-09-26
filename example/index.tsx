import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DrawStructure } from '../.';

const App = () => {
  return (
    <div>
      <DrawStructure />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
