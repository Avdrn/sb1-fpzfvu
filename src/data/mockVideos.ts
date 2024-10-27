import { Video } from '../types/video';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    description: 'A comprehensive guide to React Hooks and their practical applications in modern web development.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    youtubeId: 'dpw9EHDh2bM',
    duration: '15:30',
    questions: [
      { timestamp: 180, text: 'What is the main purpose of useState?' },
      { timestamp: 360, text: 'How does useEffect differ from componentDidMount?' }
    ]
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript patterns and best practices for large-scale applications.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    youtubeId: 'F2JCjVSZlG0',
    duration: '20:45',
    questions: [
      { timestamp: 240, text: 'What are generic types in TypeScript?' },
      { timestamp: 480, text: 'How do you implement type guards?' }
    ]
  },
  {
    id: '3',
    title: 'Modern CSS Techniques',
    description: 'Explore modern CSS techniques including Grid, Flexbox, and CSS Variables.',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60',
    youtubeId: '1Rs2ND1ryYc',
    duration: '18:15',
    questions: [
      { timestamp: 300, text: 'What are the key differences between Grid and Flexbox?' },
      { timestamp: 540, text: 'How do you implement responsive layouts with CSS Grid?' }
    ]
  }
];