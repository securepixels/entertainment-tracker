import axios from 'axios';

export const searchTMDB = async (query: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
      }
    });

    // Transform TMDB response to your SearchResult type
    return response.data.results.map((item: { id: number; title?: string; name?: string; media_type: string; overview: string; poster_path: string | null }) => ({
      id: item.id,
      title: item.title || item.name,
      type: item.media_type === 'tv' ? 'tv' : 
             item.media_type === 'movie' ? 'movie' : 
             'book',
      overview: item.overview,
      coverImage: item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null
    }));
  } catch (error) {
    console.error('TMDB Search Error:', error);
    throw error;
  }
};