import React, { useRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
  AudioRecorder,
  AudioRecorderInterface,
} from '../infrastructures/AudioRecorder';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioRecorderInterface>();
  const animationRef = useRef(0);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);

  const animate = () => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    animationRef.current = requestAnimationFrame(animate);
    if (canvas == null || audio == null) {
      return;
    }
    const { width, height } = canvas;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#e0f7fa';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4caf50';

    ctx.beginPath();
    try {
      const bufferLength = audio.getBufferSize();
      const sliceWidth = (width * 1.0) / bufferLength;
      const dataArray = audio.getData();
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    audioRef.current = new AudioRecorder();
    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="App">
      <div>
        <Button
          color="primary"
          disabled={recording}
          onClick={() => {
            setRecording(true);
            audioRef.current?.start();
          }}
        >
          Record
        </Button>
        <Button
          color="primary"
          disabled={!recording}
          onClick={async () => {
            const blob = await audioRef.current?.stop();
            const u = URL.createObjectURL(blob);
            setAudioUrls((s) => [...s, u]);
            setRecording(false);
          }}
        >
          Stop
        </Button>
      </div>
      <canvas ref={canvasRef} style={{ height: 120, width: 640 }} />
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
