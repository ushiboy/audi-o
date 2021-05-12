import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Container,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

import { AudioRecordDraft, AudioRecordOutline } from '../domains';

import { CreateFileDialog } from './CreateFileDialog';
import { DeleteFileDialog } from './DeleteFileDialog';
import { AudioRecordCard } from './AudioRecordCard';
import { Recorder } from './Recorder';
import { AudioControlBar } from './AudioControlBar';
import { useRepository } from './Context';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [records, setRecords] = useState<AudioRecordOutline[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordDraft | null>(null);
  const [playTarget, setPlayTarget] = useState<AudioRecordOutline | null>(null);
  const [
    deletionTarget,
    setDeletionTarget,
  ] = useState<AudioRecordOutline | null>(null);
  const repository = useRepository();
  useEffect(() => {
    (async function () {
      const r = await repository.fetchAudioRecords();
      setRecords(r);
    })();
  }, [repository]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Audi-O
          </Typography>
          <Link
            href="https://github.com/ushiboy/audi-o"
            color="inherit"
            target="_blank"
            rel="noopener"
          >
            <Tooltip title="github">
              <IconButton edge="end" color="inherit">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Recorder
          onRecordedAudio={(blob) => {
            setDraftRecord({ title: '', data: blob });
          }}
        />
        {records.map((r) => (
          <AudioRecordCard
            key={r.id}
            record={r}
            onPlayClick={(d) => {
              setPlayTarget(d);
            }}
            onDeleteClick={(d) => {
              setDeletionTarget(d);
            }}
          />
        ))}
      </Container>
      {draftRecord !== null ? (
        <CreateFileDialog
          onCreatedFile={async (title) => {
            const r = await repository.createAudioRecord(
              title,
              draftRecord.data
            );
            setRecords((s) => s.concat([r]));
            setDraftRecord(null);
          }}
          onCancelCreate={() => {
            setDraftRecord(null);
          }}
        />
      ) : null}
      {deletionTarget !== null ? (
        <DeleteFileDialog
          record={deletionTarget}
          onDeleteFile={async (d) => {
            await repository.deleteAudioRecord(d.id);
            setRecords((s) => s.filter(({ id }) => id !== d.id));
            if (playTarget !== null && playTarget.id === d.id) {
              setPlayTarget(null);
            }
            setDeletionTarget(null);
          }}
          onCancelDelete={() => {
            setDeletionTarget(null);
          }}
        />
      ) : null}
      {playTarget !== null ? (
        <AudioControlBar audioRecord={playTarget} />
      ) : null}
    </div>
  );
};

export default App;
