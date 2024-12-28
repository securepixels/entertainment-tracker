const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBSearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  overview: string;
  media_type: 'movie' | 'tv';
  first_air_date?: string;
  release_date?: string;
}

export async function searchTMDB(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error('TMDB search failed');
    }

    const data = await response.json();
    
    return data.results
      .filter((item: TMDBSearchResult) => 
        (item.media_type === 'movie' || item.media_type === 'tv') &&
        (item.title || item.name)
      )
      .map((item: TMDBSearchResult) => ({
        id: item.id,
        title: item.title || item.name,
        type: item.media_type,
        overview: item.overview,
        coverImage: item.poster_path 
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : null,
        releaseDate: item.release_date || item.first_air_date
      }));
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
}