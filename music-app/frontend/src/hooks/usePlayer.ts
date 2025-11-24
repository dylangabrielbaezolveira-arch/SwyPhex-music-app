import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface PlayerState {
  // Estado actual
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  
  // Cola de reproducción
  queue: Song[];
  currentIndex: number;
  repeatMode: 'off' | 'one' | 'all';
  shuffle: boolean;
  
  // Acciones
  play: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  addToQueue: (songs: Song | Song[]) => void;
  clearQueue: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  removeFromQueue: (index: number) => void;
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentSong: null,
      isPlaying: false,
      volume: 1,
      currentTime: 0,
      queue: [],
      currentIndex: -1,
      repeatMode: 'off',
      shuffle: false,

      // Acciones
      play: (song: Song) => {
        const state = get();
        const isNewSong = state.currentSong?._id !== song._id;
        
        if (isNewSong) {
          set({
            currentSong: song,
            isPlaying: true,
            currentTime: 0,
            currentIndex: 0,
            queue: [song]
          });
        } else {
          set({ isPlaying: true });
        }
      },

      pause: () => set({ isPlaying: false }),

      resume: () => set({ isPlaying: true }),

      next: () => {
        const state = get();
        const { queue, currentIndex, repeatMode, shuffle } = state;

        if (queue.length === 0) return;

        let nextIndex: number;

        if (shuffle) {
          nextIndex = Math.floor(Math.random() * queue.length);
        } else {
          nextIndex = currentIndex + 1;
          
          if (nextIndex >= queue.length) {
            if (repeatMode === 'all') {
              nextIndex = 0;
            } else {
              set({ isPlaying: false });
              return;
            }
          }
        }

        set({
          currentSong: queue[nextIndex],
          currentIndex: nextIndex,
          currentTime: 0,
          isPlaying: true
        });
      },

      previous: () => {
        const state = get();
        const { queue, currentIndex } = state;

        if (queue.length === 0 || currentIndex <= 0) return;

        const prevIndex = currentIndex - 1;
        set({
          currentSong: queue[prevIndex],
          currentIndex: prevIndex,
          currentTime: 0,
          isPlaying: true
        });
      },

      addToQueue: (songs: Song | Song[]) => {
        const state = get();
        const newSongs = Array.isArray(songs) ? songs : [songs];
        
        set({
          queue: [...state.queue, ...newSongs]
        });
      },

      clearQueue: () => set({ queue: [], currentIndex: -1, currentSong: null }),

      setVolume: (volume: number) => set({ volume }),

      setCurrentTime: (currentTime: number) => set({ currentTime }),

      toggleRepeat: () => {
        const state = get();
        const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
        const currentModeIndex = modes.indexOf(state.repeatMode);
        const nextModeIndex = (currentModeIndex + 1) % modes.length;
        
        set({ repeatMode: modes[nextModeIndex] });
      },

      toggleShuffle: () => {
        const state = get();
        set({ shuffle: !state.shuffle });
      },

      removeFromQueue: (index: number) => {
        const state = get();
        const newQueue = state.queue.filter((_, i) => i !== index);
        
        set({ 
          queue: newQueue,
          currentIndex: state.currentIndex >= index ? state.currentIndex - 1 : state.currentIndex
        });
      }
    }),
    {
      name: 'music-player-storage',
      partialize: (state) => ({
        volume: state.volume,
        repeatMode: state.repeatMode,
        shuffle: state.shuffle
      })
    }
  )
);
