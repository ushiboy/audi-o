import { AudioRecordOutline, AudioRecord } from './AudioRecord';

export interface RepositoryInterface {
  fetchAudioRecords(): Promise<AudioRecordOutline[]>;
  fetchAudioRecord(id: number): Promise<AudioRecord>;
  createAudioRecord(title: string, data: Blob): Promise<AudioRecordOutline>;
  deleteAudioRecord(id: number): Promise<void>;
  deleteAllAudioRecord(): Promise<void>;
}
