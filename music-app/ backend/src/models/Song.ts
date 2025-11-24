import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: mongoose.Types.ObjectId;
  album?: mongoose.Types.ObjectId;
  duration: number; // en segundos
  genre: string[];
  audioFile: string;
  coverArt: string;
  lyrics?: string;
  statistics: {
    plays: number;
    likes: number;
    shares: number;
  };
  metadata: {
    bpm: number;
    key: string;
    mood: string[];
    explicit: boolean;
    releaseDate: Date;
  };
  isPublic: boolean;
}

const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  duration: { type: Number, required: true },
  genre: [{ type: String }],
  audioFile: { type: String, required: true },
  coverArt: { type: String, default: '' },
  lyrics: String,
  statistics: {
    plays: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },
  metadata: {
    bpm: Number,
    key: String,
    mood: [{ type: String }],
    explicit: { type: Boolean, default: false },
    releaseDate: { type: Date, default: Date.now }
  },
  isPublic: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Índices para búsqueda eficiente
songSchema.index({ title: 'text', genre: 'text' });
songSchema.index({ 'statistics.plays': -1 });
songSchema.index({ 'metadata.releaseDate': -1 });

export default mongoose.model<ISong>('Song', songSchema);
