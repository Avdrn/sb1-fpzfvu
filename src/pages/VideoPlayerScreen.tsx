import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2, Clock } from 'lucide-react';
import { RootState } from '../store/store';
import { setSelectedVideo, loadVideoDetails, clearError } from '../store/videoSlice';
import VideoPlayer from '../components/VideoPlayer';

const VideoPlayerScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videos, selectedVideo, loading, error } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    const video = videos.find(v => v.id === id);
    if (video) {
      dispatch(setSelectedVideo(video));
      dispatch(loadVideoDetails(video));
    } else {
      navigate('/', { replace: true });
    }

    return () => {
      dispatch(clearError());
    };
  }, [id, videos, dispatch, navigate]);

  const handleVideoError = (error: Error) => {
    console.error('Video player error:', error);
  };

  if (!selectedVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Videos
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {loading ? (
                <div className="aspect-video flex items-center justify-center bg-gray-100">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <VideoPlayer 
                  video={selectedVideo} 
                  onError={handleVideoError}
                />
              )}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900">{selectedVideo.title}</h1>
                <p className="mt-4 text-gray-600">{selectedVideo.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {selectedVideo.duration}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questions</h2>
              <div className="space-y-4">
                {selectedVideo.questions.map((question, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      {Math.floor(question.timestamp / 60)}:{(question.timestamp % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-900">{question.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerScreen;