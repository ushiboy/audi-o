import React, { useRef, useEffect, useState } from 'react';
import { Button, Box, Container } from '@material-ui/core';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';

import { AudioRecorder, AudioRecorderInterface } from '../infrastructures';
import { AudioRecordData } from '../domains';

import { CreateFileDialog } from './CreateFileDialog';
import { AudioRecordCard } from './AudioRecordCard';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioRecorderInterface>();
  const animationRef = useRef(0);
  const [records, setRecords] = useState<AudioRecordData[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordData | null>(null);
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
    <>
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
              const url = URL.createObjectURL(blob);
              setDraftRecord({ title: '', url });
              setRecording(false);
              cancelAnimationFrame(animationRef.current);
            }}
          >
            Stop
          </Button>
        </Box>
        {records.map((r, i) => (
          <AudioRecordCard key={i} record={r} />
        ))}
      </Container>
      {draftRecord !== null ? (
        <CreateFileDialog
          onCreatedFile={(title) => {
            setRecords((s) => [...s, { title, url: draftRecord.url }]);
            setDraftRecord(null);
          }}
          onCancelCreate={() => {
            setDraftRecord(null);
          }}
        />
      ) : null}
    </>
  );
};

export default App;
