import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { AudioRecordDraft } from '../domains';

type Props = {
  record: AudioRecordDraft;
  onDeleteFile: (record: AudioRecordDraft) => void;
  onCancelDelete: () => void;
};

export const DeleteFileDialog: React.FC<Props> = ({
  record,
  onDeleteFile,
  onCancelDelete,
}: Props) => {
  return (
    <Dialog open={true}>
      <DialogTitle>Delete Audio</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete the file?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelDelete} color="primary">
          CANCEL
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => {
            onDeleteFile(record);
          }}
          color="primary"
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
