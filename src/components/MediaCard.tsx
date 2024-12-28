import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';


interface MediaCardProps {
  title: string;
  type: 'movie' | 'tv' | 'book';
  status: 'want_to_watch' | 'watching' | 'completed';
  rating?: number;
  coverImage?: string;
  description?: string;
  onStatusChange: (status: string) => void;
  onRatingChange: (rating: number) => void;
  onDelete: () => void; // Add this prop
}

export default function MediaCard({
  title,
  type,
  status,
  rating = 0,
  coverImage,
  description,
  onStatusChange,
  onRatingChange,
  onDelete
}: MediaCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group relative">
      {/* Delete Button - Appears on hover */}
      <Button
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full">
  <Image
    src={coverImage || '/placeholder.jpg'}
    alt={title}
    fill
    className="object-cover"
  />
</div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="capitalize">{type}</span>
          <select 
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border rounded p-1"
          >
            <option value="want_to_watch">Want to Watch</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              onClick={() => onRatingChange(star)}
              className="p-1"
            >
              <Star
                className={`h-5 w-5 ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}