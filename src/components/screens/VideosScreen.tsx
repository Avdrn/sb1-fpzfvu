'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ExternalLink, Loader2, Copy, Check } from 'lucide-react';
import { RootState } from '@/lib/store';
import { setSelectedVideo, loadVideoDetails } from '@/lib/features/video/videoSlice';
import { VideoCard } from '@/components/VideoCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import type { Video } from '@/types/video';

export function VideosScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { videos, selectedVideo, loading, error } = useSelector((state: RootState) => state.video);
  const [copied, setCopied] = useState(false);

  const handleVideoSelect = async (video: Video) => {
    dispatch(setSelectedVideo(video));
    dispatch(loadVideoDetails(video));
  };

  const handleCopyUrl = async () => {
    if (!selectedVideo) return;
    
    const url = `${window.location.origin}/video/${selectedVideo.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="videos-page">
      <div className="container">
        <div className={`videos-page__content ${selectedVideo ? 'videos-page__content--split' : ''}`}>
          <div className="videos-page__grid">
            <div className="grid grid--videos">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoSelect(video)}
                  isActive={selectedVideo?.id === video.id}
                />
              ))}
            </div>
          </div>

          {selectedVideo && (
            <div className="videos-page__player">
              {loading ? (
                <div className="video-player__loading">
                  <Loader2 className="loader loader--primary" />
                </div>
              ) : (
                <>
                  <VideoPlayer video={selectedVideo} />
                  <div className="video-player__info">
                    <h2 className="h2">{selectedVideo.title}</h2>
                    <p className="text-muted">{selectedVideo.description}</p>
                    
                    <div className="videos-page__url-container">
                      <div className="videos-page__url-container-input">
                        <span className="truncate">
                          {window.location.origin}/video/{selectedVideo.id}
                        </span>
                        <button
                          onClick={handleCopyUrl}
                          className="btn btn--icon"
                          title="Copy URL"
                        >
                          {copied ? (
                            <Check className="loader loader--primary" />
                          ) : (
                            <Copy />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => router.push(`/video/${selectedVideo.id}`)}
                        className="btn btn--primary"
                      >
                        <ExternalLink />
                        Go
                      </button>
                    </div>
                  </div>
                </>
              )}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}