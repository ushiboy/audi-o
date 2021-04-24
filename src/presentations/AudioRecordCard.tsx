import React from 'react';
import {
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { AudioRecordData } from '../domains';

type Props = {
  record: AudioRecordData;
  onDeleteClick: (record: AudioRecordData) => void;
};

export const AudioRecordCard: React.FC<Props> = ({
  record,
  onDeleteClick,
}: Props) => {
  const { title, url } = record;
  return (
    <Card>
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
      <CardActions>
        <audio src={url} controls />
        <IconButton
          aria-label="delete"
          onClick={() => {
            onDeleteClick(record);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
