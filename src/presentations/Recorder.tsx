import React, { useRef, useEffect, useState } from 'react';
import { Button, Box } from '@material-ui/core';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';

import { AudioRecorderInterface } from '../infrastructures';

import { useAudioRecorder } from './Context';

type Props = {
  onRecordedAudio: (blob: Blob) => void;
};

export const Recorder: React.FC<Props> = ({ onRecordedAudio }: Props) => {
  const audioRecorder = useAudioRecorder();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);
  const [recording, setRecording] = useState(false);

  const animate = () => {
    animationRef.current = requestAnimationFrame(animate);
    drawAmplitude(canvasRef.current, audioRecorder);
  };

  useEffect(() => {
    resetAmplitude(canvasRef.current);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <Box>
      <canvas ref={canvasRef} style={{ height: 120, width: '100%' }} />
      <Button
        style={{ marginRight: 5 }}
        variant="contained"
        color="secondary"
        disabled={recording}
        startIcon={<KeyboardVoiceIcon />}
        onClick={async () => {
          setRecording(true);
          await audioRecorder.start();
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
          const blob = await audioRecorder.stop();
          setRecording(false);
          cancelAnimationFrame(animationRef.current);
          resetAmplitude(canvasRef.current);
          if (blob !== undefined) {
            onRecordedAudio(blob);
          }
        }}
      >
        Stop
      </Button>
    </Box>
  );
};

const resetAmplitude = (canvas: HTMLCanvasElement | null | undefined): void => {
  if (canvas == null) {
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
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
};

const drawAmplitude = (
  canvas: HTMLCanvasElement | null | undefined,
  audio: AudioRecorderInterface
): void => {
  if (canvas == null) {
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
};
