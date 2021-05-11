import React from 'react';
import ReactDOM from 'react-dom';

import { AudioRecorder, LocalRepository } from './infrastructures';
import App from './presentations/App';
import {
  AudioRecorderContext,
  RepositoryContext,
} from './presentations/Context';
import './index.css';

ReactDOM.render(
  <RepositoryContext.Provider value={new LocalRepository()}>
    <AudioRecorderContext.Provider value={new AudioRecorder()}>
      <App />
    </AudioRecorderContext.Provider>
  </RepositoryContext.Provider>,
  document.getElementById('root')
);
