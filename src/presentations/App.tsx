import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import { AudioRecordData } from '../domains';

import { CreateFileDialog } from './CreateFileDialog';
import { AudioRecordCard } from './AudioRecordCard';
import { Recorder } from './Recorder';

const App: React.FC = () => {
  const [records, setRecords] = useState<AudioRecordData[]>([]);
  const [draftRecord, setDraftRecord] = useState<AudioRecordData | null>(null);
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
              setRecords((s) =>
                s.filter(
                  ({ title, url }) => !(title === d.title && url === d.url)
                )
              );
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
    </>
  );
};

export default App;
