'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2, Clock } from 'lucide-react';
import { RootState } from '@/lib/store';
import { setSelectedVideo, loadVideoDetails, clearError } from '@/lib/features/video/videoSlice';
import { VideoPlayer } from '@/components/VideoPlayer';

export function VideoPlayerScreen() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useDispatch();
  const { videos, selectedVideo, loading, error } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    const video = videos.find(v => v.id === id);
    if (video) {
      dispatch(setSelectedVideo(video));
      dispatch(loadVideoDetails(video));
    } else {
      router.replace('/');
    }

    return () => {
      dispatch(clearError());
    };
  }, [id, videos, dispatch, router]);

  const handleVideoError = (error: Error) => {
    console.error('Video player error:', error);
  };

  if (!selectedVideo) {
    return (
      <div className="flex flex--center min-h-screen">
        <Loader2 className="loader loader--primary" />
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <div className="container">
        <Link href="/" className="video-player-page__back">
          <ArrowLeft />
          Back to Videos
        </Link>

        <div className="video-player-page__content">
          <div className="video-player-page__main">
            <div className="video-player">
              {loading ? (
                <div className="video-player__loading">
                  <Loader2 className="loader loader--primary" />
                </div>
              ) : (
                <VideoPlayer 
                  video={selectedVideo} 
                  onError={handleVideoError}
                />
              )}
              <div className="video-player__info">
                <h1 className="h1">{selectedVideo.title}</h1>
                <p className="text-muted">{selectedVideo.description}</p>
                <div className="flex flex--center flex--gap text-sm text-muted">
                  <Clock />
                  {selectedVideo.duration}
                </div>
              </div>
            </div>
          </div>

          <div className="video-player-page__sidebar">
            <div className="video-player-page__questions">
              <h2 className="h2">Questions</h2>
              <div className="video-player-page__questions-list">
                {selectedVideo.questions.map((question, index) => (
                  <div key={index} className="video-player-page__questions-item">
                    <div className="text-sm text-muted">
                      {Math.floor(question.timestamp / 60)}:{(question.timestamp % 60).toString().padStart(2, '0')}
                    </div>
                    <div>{question.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}