import React, { useRef, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Recorder } from './Recorder';
import {
  AudioRecorder,
  AudioRecorderInterface,
} from '../infrastructures/AudioRecorder';

const App: React.FC = () => {
  const audioRef = useRef<AudioRecorderInterface>();
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  useEffect(() => {
    audioRef.current = new AudioRecorder();
  }, []);

  return (
    <div className="App">
      <Recorder
        onRecordClick={() => {
          audioRef.current?.start();
        }}
        onStopClick={async () => {
          const blob = await audioRef.current?.stop();
          const u = URL.createObjectURL(blob);
          console.log(blob);
          console.log(u);
          setAudioUrls((s) => [...s, u]);
        }}
      />
      {audioUrls.map((u, i) => (
        <Card key={i}>
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                test
              </Typography>
            </CardContent>
            <div>
              <audio src={u} controls />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default App;
