'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import MediaCard from '@/components/MediaCard';
import AddMediaDialog from '@/components/AddMediaDialog';

interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'book';
  status: 'want_to_watch' | 'watching' | 'completed';
  rating?: number;
  coverImage?: string;
  description?: string;
}

export default function Home() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const savedItems = localStorage.getItem('mediaItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mediaItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem: Omit<MediaItem, 'id' | 'rating'>) => {
    setItems(prev => [...prev, { 
      ...newItem, 
      id: Date.now().toString(), 
      rating: 0,
      coverImage: newItem.coverImage || '/placeholder.jpg'
    }]);
  };

  const handleStatusChange = (id: string, status: string) => {
    setItems(prev => 
      prev.map(item => 
      item.id === id
       ? { ...item, status } as MediaItem
       : item
    ));
  };

  const handleRatingChange = (id: string, rating: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, rating } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white-900">
            Entertainment Tracker
          </h1>
          <AddMediaDialog onAdd={handleAddItem} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg rounded-full border-2 focus:border-blue-500"
          />
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MediaCard
              key={item.id}
              {...item}
              onStatusChange={(status) => handleStatusChange(item.id, status)}
              onRatingChange={(rating) => handleRatingChange(item.id, rating)}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
        </div>


        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black-500 text-lg">
              {searchQuery 
                ? "No items match your search"
                : "Your library is empty. Add some items to get started!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}