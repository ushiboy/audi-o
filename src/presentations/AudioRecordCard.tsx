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
import { format } from 'date-fns';

import { AudioRecordOutline } from '../domains';

import { useRepository } from './Context';

type Props = {
  record: AudioRecordOutline;
  onPlayClick: (record: AudioRecordOutline) => void;
  onDeleteClick: (record: AudioRecordOutline) => void;
};

export const AudioRecordCard: React.FC<Props> = ({
  record,
  onPlayClick,
  onDeleteClick,
}: Props) => {
  const { id, title, modifiedAt } = record;
  const repository = useRepository();
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
            onClick={async () => {
              const r = await repository.fetchAudioRecord(id);
              const a = document.createElement('a');
              a.download = `${title}.ogg`;
              const url = URL.createObjectURL(r.data);
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
        <Typography>{format(modifiedAt, 'yyyy/MM/dd HH:mm:ss')}</Typography>
      </CardActions>
    </Card>
  );
};
