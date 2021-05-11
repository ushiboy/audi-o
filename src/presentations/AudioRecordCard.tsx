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
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { AudioRecordDraft } from '../domains';

type Props = {
  record: AudioRecordDraft;
  onPlayClick: (record: AudioRecordDraft) => void;
  onDeleteClick: (record: AudioRecordDraft) => void;
};

export const AudioRecordCard: React.FC<Props> = ({
  record,
  onPlayClick,
  onDeleteClick,
}: Props) => {
  const { title, data } = record;
  return (
    <Card>
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="play">
          <IconButton
            aria-label="play"
            onClick={() => {
              onPlayClick(record);
            }}
          >
            <PlayCircleFilledIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="download">
          <IconButton
            aria-label="download"
            onClick={() => {
              const a = document.createElement('a');
              a.download = `${title}.ogg`;
              const url = URL.createObjectURL(data);
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
