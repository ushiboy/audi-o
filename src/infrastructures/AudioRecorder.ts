export interface AudioRecorderInterface {
  start(): Promise<void>;
  stop(): Promise<Blob>;
  getData(): Uint8Array;
  getBufferSize(): number;
}

export class AudioRecorder implements AudioRecorderInterface {
  chunks: Blob[];
  mediaRecorder: MediaRecorder | null;
  analyser: AnalyserNode | null;

  constructor() {
    this.chunks = [];
    this.mediaRecorder = null;
    this.analyser = null;
  }

  start(): Promise<void> {
    this.chunks = [];
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = 2048;
        source.connect(this.analyser);

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };
        this.mediaRecorder.start();
      });
  }

  async stop(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder == null) {
        throw new Error('Recorder does not started');
      }
      this.mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(this.chunks, {
            type: 'audio/ogg; codecs=opus',
          });
          resolve(blob);
        } catch (err) {
          reject(err);
        }
      };
      this.mediaRecorder.stop();
    });
  }

  getData(): Uint8Array {
    if (this.analyser == null) {
      throw new Error('Recorder does not started');
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  getBufferSize(): number {
    if (this.analyser == null) {
      throw new Error('Recorder does not started');
    }
    return this.analyser.frequencyBinCount;
  }
}
