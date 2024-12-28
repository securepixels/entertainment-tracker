import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from 'lucide-react';
import { searchTMDB } from '@/lib/tmdb';

interface SearchResult {
  id: number;
  title: string;
  type: string;
  overview: string;
  coverImage: string | null;
}

interface AddMediaDialogProps {
  onAdd: (item: {
    title: string;
    type: "movie" | "tv" | "book";
    status: "want_to_watch" | "watching" | "completed"; 
    description?: string;
    coverImage?: string;
  }) => void;
}

export default function AddMediaDialog({ onAdd }: AddMediaDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchTMDB(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (result: SearchResult) => {
    onAdd({
      title: result.title,
      type: result.type,
      status: 'want_to_watch',
      description: result.overview,
      coverImage: result.coverImage || undefined
    });
    setOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
          <Plus className="mr-2 h-5 w-5" />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add to Your Library</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search for movies or TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-12 text-lg"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="w-24"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {searchResults.map((result) => (
                <div
                    key={result.id}
                    className="group relative border rounded-lg overflow-hidden hover:border-blue-500 cursor-pointer transition-all"
                    onClick={() => handleAdd(result)}
                >
                    {result.coverImage && (
                        <img
                            src={result.coverImage}
                            alt={result.title}
                            className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600">
                            {result.title}
                        </h3>
                        <p className="text-sm text-black-600 line-clamp-2">
                            {result.overview}
                        </p>
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                            {result.type}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">Click to Add</span>
                    </div>
                </div>
            ))}
          </div>

          {searchResults.length === 0 && !loading && searchQuery && (
            <div className="text-center py-8 text-gray-500">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}