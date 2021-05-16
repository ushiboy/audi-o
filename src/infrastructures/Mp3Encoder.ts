import lamejs from 'lamejs';

export interface MP3EncoderInterface {
  encode(src: Blob): Promise<Blob>;
}

export class LameMP3Encoder implements MP3EncoderInterface {
  async encode(src: Blob): Promise<Blob> {
    const mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
    const b = await src.arrayBuffer();
    const samples = new Int16Array(b);
    const blockSize = 1152;
    const data: Int8Array[] = [];

    for (let i = 0; i < samples.length; i += blockSize) {
      const chunk = samples.subarray(i, i + blockSize);
      const buf = mp3encoder.encodeBuffer(chunk);
      if (buf.length > 0) {
        data.push(new Int8Array(buf));
      }
    }
    const buf = mp3encoder.flush();
    if (buf.length > 0) {
      data.push(new Int8Array(buf));
    }

    return new Blob(data, { type: 'audio/mp3' });
  }
}
