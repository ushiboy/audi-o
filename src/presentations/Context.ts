import React, { useContext } from 'react';

import { AudioRecorderInterface } from '../infrastructures';

export const AudioRecorderContext = React.createContext<AudioRecorderInterface>(
  undefined!
);

export const useAudioRecorder = (): AudioRecorderInterface => {
  return useContext(AudioRecorderContext);
};
