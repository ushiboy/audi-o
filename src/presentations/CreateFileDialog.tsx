import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

type Props = {
  onCreatedFile: (title: string) => void;
  onCancelCreate: () => void;
};

export const CreateFileDialog: React.FC<Props> = ({
  onCreatedFile,
  onCancelCreate,
}: Props) => {
  const [title, setTitle] = useState('');
  return (
    <Dialog open={true}>
      <DialogTitle>Create Audio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the title of the audio data.
        </DialogContentText>
        <TextField
          autoFocus
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancelCreate}
          color="primary"
          startIcon={<DeleteIcon />}
        >
          DROP
        </Button>
        <Button
          disabled={title.length === 0}
          startIcon={<SaveIcon />}
          onClick={() => {
            onCreatedFile(title);
          }}
          color="primary"
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
