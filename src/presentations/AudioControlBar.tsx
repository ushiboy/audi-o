import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { AudioRecordOutline } from '../domains';

import { useRepository } from './Context';

type Props = {
  audioRecord: AudioRecordOutline;
};

export const AudioControlBar: React.FC<Props> = ({ audioRecord }: Props) => {
  const ref = useRef<HTMLAudioElement>(null);
  const { id, title } = audioRecord;
  const repository = useRepository();
  useEffect(() => {
    const audio = ref.current;
    if (audio === null) {
      return;
    }
    (async function () {
      const r = await repository.fetchAudioRecord(id);
      audio.src = URL.createObjectURL(r.data);
      audio.play();
    })();
    return () => {
      audio.pause();
    };
  }, [audioRecord, repository]);
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography style={{ marginRight: 20 }}>{title}</Typography>
        <audio ref={ref} controls />
      </Toolbar>
    </AppBar>
  );
};
