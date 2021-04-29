import React, { useState } from 'react';
import {
  AppBar,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

import { AudioRecordData } from '../domains';

import { CreateFileDialog } from './CreateFileDialog';
import { DeleteFileDialog } from './DeleteFileDialog';
import { AudioRecordCard } from './AudioRecordCard';
import { Recorder } from './Recorder';

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
  const [records, setRecords] = useState<AudioRecordData[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordData | null>(null);
  const [deletionTarget, setDeletionTarget] = useState<AudioRecordData | null>(
    null
  );
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
            <IconButton edge="end" color="inherit">
              <GitHubIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Recorder
          onRecordedAudio={(blob) => {
            const url = URL.createObjectURL(blob);
            setDraftRecord({ title: '', url });
          }}
        />
        {records.map((r, i) => (
          <AudioRecordCard
            key={i}
            record={r}
            onDeleteClick={(d) => {
              setDeletionTarget(d);
            }}
          />
        ))}
      </Container>
      {draftRecord !== null ? (
        <CreateFileDialog
          onCreatedFile={(title) => {
            setRecords((s) => s.concat([{ title, url: draftRecord.url }]));
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
                ({ title, url }) => !(title === d.title && url === d.url)
              )
            );
            setDeletionTarget(null);
          }}
          onCancelDelete={() => {
            setDeletionTarget(null);
          }}
        />
      ) : null}
    </div>
  );
};

export default App;
