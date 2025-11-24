import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { songsAPI } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [songsResponse] = await Promise.all([
        songsAPI.getSongs({ sortBy: 'statistics.plays', limit: 10 })
      ]);
      
      setFeaturedSongs(songsResponse.data.songs);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.songCard}
      onPress={() => navigation.navigate('Player', { song: item })}
    >
      <Image 
        source={{ uri: item.coverArt || 'https://via.placeholder.com/100' }}
        style={styles.songImage}
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.artist.profile.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Buenos días</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tendencias</Text>
        <FlatList
          data={featuredSongs}
          renderItem={renderSongItem}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
        <View style={styles.recommendationsGrid}>
          {featuredSongs.slice(0, 4).map(song => (
            <TouchableOpacity 
              key={song._id}
              style={styles.recommendationCard}
              onPress={() => navigation.navigate('Player', { song })}
            >
              <Image 
                source={{ uri: song.coverArt || 'https://via.placeholder.com/150' }}
                style={styles.recommendationImage}
              />
              <Text style={styles.recommendationTitle} numberOfLines={2}>
                {song.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  songCard: {
    width: 150,
    marginLeft: 10,
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 10,
  },
  songImage: {
    width: 130,
    height: 130,
    borderRadius: 4,
  },
  songInfo: {
    marginTop: 8,
  },
  songTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 12,
    marginTop: 4,
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  recommendationCard: {
    width: '48%',
    marginBottom: 15,
  },
  recommendationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  recommendationTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
