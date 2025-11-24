import express from 'express';
import mongoose from 'mongoose';
import Song from '../models/Song';
import User from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

// Obtener todas las canciones (con paginación y filtros)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      genre,
      artist,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter: any = { isPublic: true };

    if (genre) filter.genre = { $in: [genre] };
    if (artist) filter.artist = artist;
    if (search) {
      filter.$text = { $search: search };
    }

    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const songs = await Song.find(filter)
      .populate('artist', 'username profile')
      .sort(sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Song.countDocuments(filter);

    res.json({
      songs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error obteniendo canciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener canción por ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate('artist', 'username profile social');

    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }

    // Incrementar contador de reproducciones
    song.statistics.plays += 1;
    await song.save();

    res.json(song);
  } catch (error) {
    console.error('Error obteniendo canción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Subir nueva canción (requiere autenticación)
router.post('/', auth, async (req: any, res) => {
  try {
    const {
      title,
      duration,
      genre,
      lyrics,
      bpm,
      key,
      mood,
      explicit
    } = req.body;

    const song = new Song({
      title,
      artist: req.userId,
      duration,
      genre: Array.isArray(genre) ? genre : [genre],
      lyrics,
      audioFile: req.body.audioFile, // URL del archivo subido
      coverArt: req.body.coverArt,
      metadata: {
        bpm,
        key,
        mood: Array.isArray(mood) ? mood : [mood],
        explicit: explicit || false
      }
    });

    await song.save();
    
    // Actualizar usuario para marcar como artista
    await User.findByIdAndUpdate(req.userId, {
      'social.isArtist': true
    });

    res.status(201).json(song);
  } catch (error) {
    console.error('Error subiendo canción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Buscar canciones
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const songs = await Song.find(
      { $text: { $search: query }, isPublic: true },
      { score: { $meta: 'textScore' } }
    )
    .populate('artist', 'username profile')
    .sort({ score: { $meta: 'textScore' } })
    .limit(Number(limit));

    res.json(songs);
  } catch (error) {
    console.error('Error buscando canciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
