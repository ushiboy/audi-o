import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';

import { AudioRecordData } from '../domains';

type Props = {
  record: AudioRecordData;
};

export const AudioRecordCard: React.FC<Props> = ({ record }: Props) => {
  const { title, url } = record;
  return (
    <Card>
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
      <CardActions>
        <audio src={url} controls />
      </CardActions>
    </Card>
  );
};
