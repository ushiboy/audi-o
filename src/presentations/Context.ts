import React, { useContext } from 'react';

import { RepositoryInterface } from '../domains';
import {
  AudioRecorderInterface,
  AudioRecorder,
  LocalRepository,
} from '../infrastructures';

export const AudioRecorderContext = React.createContext<AudioRecorderInterface>(
  new AudioRecorder()
);

export const useAudioRecorder = (): AudioRecorderInterface => {
  return useContext(AudioRecorderContext);
};

export const RepositoryContext = React.createContext<RepositoryInterface>(
  new LocalRepository()
);

export const useRepository = (): RepositoryInterface => {
  return useContext(RepositoryContext);
};
