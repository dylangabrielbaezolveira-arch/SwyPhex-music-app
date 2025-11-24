import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    displayName: string;
    bio: string;
    avatar: string;
    favoriteGenres: string[];
  };
  statistics: {
    songsPlayed: number;
    timeListened: number;
    favoriteArtists: string[];
  };
  social: {
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    isArtist: boolean;
    artistProfile?: {
      verified: boolean;
      monthlyListeners: number;
      socialLinks: Map<string, string>;
    };
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    displayName: String,
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    favoriteGenres: [{ type: String }]
  },
  statistics: {
    songsPlayed: { type: Number, default: 0 },
    timeListened: { type: Number, default: 0 }, // en segundos
    favoriteArtists: [{ type: String }]
  },
  social: {
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isArtist: { type: Boolean, default: false },
    artistProfile: {
      verified: { type: Boolean, default: false },
      monthlyListeners: { type: Number, default: 0 },
      socialLinks: { type: Map, of: String }
    }
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Comparar password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
