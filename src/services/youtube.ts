import { Video } from '../types/video';

// Using a mock service since the API key is not valid
export async function fetchVideoDetails(videoId: string): Promise<Partial<Video>> {
  try {
    // Simulating API response time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return the video details directly from our data
    return {
      youtubeId: videoId,
      title: '', // Will be merged with existing data
      description: '', // Will be merged with existing data
      thumbnail: '', // Will be merged with existing data
      duration: '', // Will be merged with existing data
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Failed to load video details. Please try again later.');
  }
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  if (hours) parts.push(hours.padStart(2, '0'));
  parts.push((minutes || '0').padStart(2, '0'));
  parts.push((seconds || '0').padStart(2, '0'));

  return parts.join(':');
}