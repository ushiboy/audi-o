import React, { useContext } from 'react';

import { AudioRecorderInterface, AudioRecorder } from '../infrastructures';

export const AudioRecorderContext = React.createContext<AudioRecorderInterface>(
  new AudioRecorder()
);

export const useAudioRecorder = (): AudioRecorderInterface => {
  return useContext(AudioRecorderContext);
};
