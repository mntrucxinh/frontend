
export type Asset = { 
  id: number; 
  src: string; 
};

export type VideoEmbed = {
  id: number;
  provider: 'youtube' | 'facebook';
  url: string;
  thumbnail_url: string;
  title: string;
};

export type AlbumItem = { 
  asset: Asset; 
  position: number; 
  caption: string; 
};

export type AlbumVideo = { 
  video: VideoEmbed; 
  position: number; 
};

export type Album = {
  id: number;
  public_id: string;
  title: string;
  slug: string;
  description: string;
  cover_asset: Asset;
  status: 'published' | 'draft' | 'archived';
  items: AlbumItem[];
  videos: AlbumVideo[];
};

export type View = 'images' | 'videos' | 'albums';
