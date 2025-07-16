type APOD = {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
  hdurl?: string;
  loading?: boolean;
  error?: string;
  thumbnail_url?: string;
};

