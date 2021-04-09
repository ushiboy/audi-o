import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  onRecordClick: () => void;
  onStopClick: () => void;
};

export const Recorder: React.FC<Props> = ({
  onRecordClick,
  onStopClick,
}: Props) => {
  return (
    <div>
      <Button color="primary" onClick={onRecordClick}>
        Record
      </Button>
      <Button color="primary" onClick={onStopClick}>
        Stop
      </Button>
    </div>
  );
};
