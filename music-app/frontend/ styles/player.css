import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2 } from 'lucide-react';

interface Song {
  _id: string;
  title: string;
  artist: {
    _id: string;
    username: string;
    profile: {
      displayName: string;
    };
  };
  duration: number;
  coverArt: string;
  audioFile: string;
}

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike: (songId: string) => void;
}

const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onLike
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <div className="player-container empty">
        <div className="player-placeholder">
          <p>Selecciona una canción para reproducir</p>
        </div>
      </div>
    );
  }

  const progress = (currentTime / currentSong.duration) * 100;

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={currentSong.audioFile}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      
      <div className="player-content">
        {/* Información de la canción */}
        <div className="song-info">
          <img 
            src={currentSong.coverArt || '/default-cover.jpg'} 
            alt={currentSong.title}
            className="cover-art"
          />
          <div className="song-details">
            <h4 className="song-title">{currentSong.title}</h4>
            <p className="artist-name">
              {currentSong.artist.profile.displayName}
            </p>
          </div>
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => {
              setIsLiked(!isLiked);
              onLike(currentSong._id);
            }}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Controles principales */}
        <div className="player-controls">
          <button className="control-btn" onClick={onPrevious}>
            <SkipBack size={24} />
          </button>
          
          <button className="play-pause-btn" onClick={onPlayPause}>
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          
          <button className="control-btn" onClick={onNext}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="progress-container">
          <span className="time-current">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={currentSong.duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #1db954 0%, #1db954 ${progress}%, #535353 ${progress}%, #535353 100%)`
            }}
          />
          <span className="time-total">{formatTime(currentSong.duration)}</span>
        </div>

        {/* Control de volumen */}
        <div className="volume-control">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
