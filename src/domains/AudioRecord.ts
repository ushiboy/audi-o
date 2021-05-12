export type AudioRecordDraft = {
  title: string;
  data: Blob;
};

export type AudioRecordOutline = {
  id: number;
  title: string;
  createdAt: Date;
};

export type AudioRecord = {
  id?: number;
  title: string;
  data: Blob;
  createdAt: Date;
};
