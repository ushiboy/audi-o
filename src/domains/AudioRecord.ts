export type AudioRecordDraft = {
  title: string;
  url: string;
};

export type AudioRecord = {
  id?: number;
  title: string;
  data: Blob;
  createdAt: Date;
};

export type AudioRecordOutline = {
  id?: number;
  title: string;
  createdAt: Date;
};
