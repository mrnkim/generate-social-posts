export interface Video {
  _id: string;
  created_at: string;
  indexed_at: string;
  metadata: {
    duration: number;
    engine_ids: string[];
    filename: string;
    fps: number;
    height: number;
    size: number;
    video_title: string;
    width: number;
  };
  hls: {
    video_url: string;
    thumbnail_urls: string[];
    status: string;
    updated_at: string;
  };
}