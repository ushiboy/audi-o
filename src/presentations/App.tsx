import React from 'react';

import { Recorder } from './Recorder';
import { AudioRecorder } from '../infrastructures/AudioRecorder';

const App: React.FC = () => {
  return (
    <div className="App">
      <Recorder
        onRecordClick={() => {
          console.log('record');
        }}
        onStopClick={() => {
          console.log('stop');
        }}
      />
    </div>
  );
};

export default App;
