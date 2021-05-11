import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { AudioRecordDraft } from '../domains';

type Props = {
  audioRecord: AudioRecordDraft;
};

export const AudioControlBar: React.FC<Props> = ({ audioRecord }: Props) => {
  const ref = useRef<HTMLAudioElement>(null);
  const { title, data } = audioRecord;
  useEffect(() => {
    const audio = ref.current;
    if (audio === null) {
      return;
    }
    audio.src = URL.createObjectURL(data);
    audio.play();
    return () => {
      audio.pause();
    };
  }, [audioRecord]);
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography style={{ marginRight: 20 }}>{title}</Typography>
        <audio ref={ref} controls />
      </Toolbar>
    </AppBar>
  );
};
