import React from 'react';
import {
  IconButton,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Typography,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
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
        <Tooltip title="download">
          <IconButton
            aria-label="download"
            onClick={() => {
              const a = document.createElement('a');
              a.download = `${title}.ogg`;
              a.href = url;
              a.click();
            }}
          >
            <GetAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteClick(record);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
