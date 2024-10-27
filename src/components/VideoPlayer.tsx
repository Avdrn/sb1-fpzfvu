import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Loader2 } from 'lucide-react';
import { Video } from '@/types/video';

interface VideoPlayerProps {
  video: Video;
  className?: string;
  onError?: (error: Error) => void;
}

export function VideoPlayer({ video, className, onError }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerError, setPlayerError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setPlayerError(null);
  }, [video.youtubeId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkQuestions = async () => {
      if (!playerRef.current?.internalPlayer) return;

      try {
        const currentTime = await playerRef.current.internalPlayer.getCurrentTime();
        const question = video.questions.find(q => 
          Math.abs(q.timestamp - currentTime) < 1 && 
          !window.localStorage.getItem(`question-${video.id}-${q.timestamp}`)
        );

        if (question) {
          window.localStorage.setItem(`question-${video.id}-${q.timestamp}`, 'shown');
          if (window.Notification && Notification.permission === "granted") {
            new Notification("Question Time!", { body: question.text });
          } else {
            alert(question.text);
          }
        }
      } catch (error) {
        console.error('Error checking video time:', error);
      }
    };

    interval = setInterval(checkQuestions, 1000);

    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    return () => {
      clearInterval(interval);
      video.questions.forEach(q => {
        window.localStorage.removeItem(`question-${video.id}-${q.timestamp}`);
      });
    };
  }, [video]);

  const handleReady = () => {
    setIsLoading(false);
    setPlayerError(null);
  };

  const handleError = (event: any) => {
    const error = new Error('Failed to load video player');
    setPlayerError(error);
    setIsLoading(false);
    if (onError) {
      onError(error);
    }
  };

  if (playerError) {
    return (
      <div className={`video-player__error ${className}`}>
        <div className="text-center">
          <p>Failed to load video player</p>
          <button 
            onClick={() => setPlayerError(null)}
            className="btn btn--primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`video-player__container ${className}`}>
      {isLoading && (
        <div className="video-player__loading">
          <Loader2 className="loader loader--primary" />
        </div>
      )}
      <YouTube
        videoId={video.youtubeId}
        ref={playerRef}
        className="w-full"
        onReady={handleReady}
        onError={handleError}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
    </div>
  );
}