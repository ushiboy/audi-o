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

import { AudioRecordDraft } from '../domains';

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
  const [records, setRecords] = useState<AudioRecordDraft[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordDraft | null>(null);
  const [playTarget, setPlayTarget] = useState<AudioRecordDraft | null>(null);
  const [deletionTarget, setDeletionTarget] = useState<AudioRecordDraft | null>(
    null
  );
  const repository = useRepository();
  useEffect(() => {
    (async function () {
      const r = await repository.fetchAudioRecords();
      console.log(r);
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
        {records.map((r, i) => (
          <AudioRecordCard
            key={i}
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
            await repository.createAudioRecord(title, draftRecord.data);

            setRecords((s) => s.concat([{ title, data: draftRecord.data }]));
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
          onDeleteFile={(d) => {
            setRecords((s) =>
              s.filter(
                ({ title, data }) => !(title === d.title && data === d.data)
              )
            );
            if (
              playTarget !== null &&
              playTarget.title === d.title &&
              playTarget.data === d.data
            ) {
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
