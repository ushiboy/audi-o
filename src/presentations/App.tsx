import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import { AudioRecordData } from '../domains';

import { CreateFileDialog } from './CreateFileDialog';
import { DeleteFileDialog } from './DeleteFileDialog';
import { AudioRecordCard } from './AudioRecordCard';
import { Recorder } from './Recorder';

const App: React.FC = () => {
  const [records, setRecords] = useState<AudioRecordData[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordData | null>(null);
  const [deletionTarget, setDeletionTarget] = useState<AudioRecordData | null>(
    null
  );
  return (
    <>
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
    </>
  );
};

export default App;
