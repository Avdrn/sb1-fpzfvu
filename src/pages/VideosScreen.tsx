import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Loader2, Copy, Check } from 'lucide-react';
import { RootState } from '../store/store';
import { setSelectedVideo, loadVideoDetails } from '../store/videoSlice';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import type { Video } from '../types/video';

const VideosScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50">
      <div className={`max-w-[1920px] mx-auto p-8 ${selectedVideo ? 'flex gap-8' : ''}`}>
        <div className={selectedVideo ? 'w-1/3' : 'w-full'}>
          <div className={`grid ${selectedVideo ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
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
          <div className="w-2/3">
            <div className="bg-white rounded-xl shadow-lg">
              {loading ? (
                <div className="aspect-video flex items-center justify-center bg-gray-100">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <>
                  <VideoPlayer video={selectedVideo} />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                    <p className="mt-2 text-gray-600">{selectedVideo.description}</p>
                    
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg relative group flex items-center">
                          <span className="text-gray-600 block truncate flex-1">
                            {window.location.origin}/video/{selectedVideo.id}
                          </span>
                          <button
                            onClick={handleCopyUrl}
                            className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            title="Copy URL"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <div className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-900 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {window.location.origin}/video/{selectedVideo.id}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/video/${selectedVideo.id}`)}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Go
                      </button>
                    </div>
                  </div>
                </>
              )}
              {error && (
                <div className="p-4 m-6 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosScreen;