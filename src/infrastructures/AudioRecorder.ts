export interface AudioRecorderInterface {
  start(): Promise<void>;
  stop(): Promise<Blob>;
}

export class AudioRecorder implements AudioRecorderInterface {
  chunks: Blob[];
  mediaRecorder: MediaRecorder | null;

  constructor() {
    this.chunks = [];
    this.mediaRecorder = null;
  }

  start(): Promise<void> {
    return navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
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
}
