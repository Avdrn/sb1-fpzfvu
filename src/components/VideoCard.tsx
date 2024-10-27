import { Play } from 'lucide-react';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  isActive?: boolean;
}

export function VideoCard({ video, onClick, isActive }: VideoCardProps) {
  return (
    <div 
      className={`video-card ${isActive ? 'video-card--active' : ''}`}
      onClick={onClick}
    >
      <div className="video-card__thumbnail">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          loading="lazy"
        />
        <div className="video-card__thumbnail-overlay">
          <Play className="text-white" />
        </div>
      </div>
      <div className="video-card__content">
        <h3 className="video-card__title">{video.title}</h3>
        <p className="video-card__description">{video.description}</p>
        <div className="video-card__duration">{video.duration}</div>
      </div>
    </div>
  );
}