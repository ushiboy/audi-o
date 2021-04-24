import React from 'react';
import ReactDOM from 'react-dom';

import { AudioRecorder } from './infrastructures';
import App from './presentations/App';
import { AudioRecorderContext } from './presentations/Context';

ReactDOM.render(
  <AudioRecorderContext.Provider value={new AudioRecorder()}>
    <App />
  </AudioRecorderContext.Provider>,
  document.getElementById('root')
);
