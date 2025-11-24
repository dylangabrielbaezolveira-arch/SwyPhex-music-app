import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylist extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  songs: mongoose.Types.ObjectId[];
  coverArt: string;
  isPublic: boolean;
  isCollaborative: boolean;
  collaborators: mongoose.Types.ObjectId[];
  statistics: {
    plays: number;
    likes: number;
    shares: number;
  };
  settings: {
    allowDownloads: boolean;
    showInSearch: boolean;
    autoUpdate: boolean;
  };
}

const playlistSchema = new Schema<IPlaylist>({
  name: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  coverArt: { type: String, default: '' },
  isPublic: { type: Boolean, default: true },
  isCollaborative: { type: Boolean, default: false },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  statistics: {
    plays: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },
  settings: {
    allowDownloads: { type: Boolean, default: false },
    showInSearch: { type: Boolean, default: true },
    autoUpdate: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export default mongoose.model<IPlaylist>('Playlist', playlistSchema);
