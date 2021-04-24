import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';

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
    animationRef.current = requestAnimationFrame(animate);
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (canvas == null || audio == null) {
      return;
    }
    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }
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

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    audioRef.current = new AudioRecorder();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box>
        <canvas ref={canvasRef} style={{ height: 120, width: 640 }} />
        <Button
          variant="contained"
          color="secondary"
          disabled={recording}
          startIcon={<KeyboardVoiceIcon />}
          onClick={() => {
            setRecording(true);
            audioRef.current?.start();
            animate();
          }}
        >
          Record
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!recording}
          startIcon={<StopIcon />}
          onClick={async () => {
            const blob = await audioRef.current?.stop();
            const u = URL.createObjectURL(blob);
            setAudioUrls((s) => [...s, u]);
            setRecording(false);
            cancelAnimationFrame(animationRef.current);
          }}
        >
          Stop
        </Button>
      </Box>
      {audioUrls.map((u, i) => (
        <Card key={i}>
          <div>
            <CardContent>
              <Typography>test</Typography>
            </CardContent>
            <div>
              <audio src={u} controls />
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default App;
