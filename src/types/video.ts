export interface Question {
  timestamp: number;
  text: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  questions: Question[];
}