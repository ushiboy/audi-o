import Dexie from 'dexie';

import {
  AudioRecord,
  AudioRecordOutline,
  RepositoryInterface,
} from '../domains';

export class AppDatabase extends Dexie {
  audioRecords: Dexie.Table<AudioRecord, number>;

  constructor() {
    super('AudiODatabase');
    this.version(1).stores({
      audioRecords: '++id, title, data, createdAt',
    });

    this.audioRecords = this.table('audioRecords');
  }
}

export class LocalRepository implements RepositoryInterface {
  private db: AppDatabase = new AppDatabase();
  async fetchAudioRecords(): Promise<AudioRecordOutline[]> {
    const records = await this.db.audioRecords.orderBy('createdAt').toArray();
    return records.map(({ id, title, createdAt }) => {
      if (id === undefined) {
        throw new Error('id is undefined');
      }
      return {
        id,
        title,
        createdAt,
      };
    });
  }

  async fetchAudioRecord(id: number): Promise<AudioRecord> {
    const r = await this.db.audioRecords.get(id);
    if (r === undefined) {
      throw new Error(`Audio Record Not Found. [${id}]`);
    }
    return r;
  }

  async createAudioRecord(
    title: string,
    data: Blob
  ): Promise<AudioRecordOutline> {
    const createdAt = new Date();
    const id = await this.db.audioRecords.add({
      title,
      data,
      createdAt,
    });
    return {
      id,
      title,
      createdAt,
    };
  }

  async deleteAudioRecord(id: number): Promise<void> {
    await this.db.audioRecords.delete(id);
  }

  async deleteAllAudioRecord(): Promise<void> {
    await this.db.audioRecords.clear();
  }
}
