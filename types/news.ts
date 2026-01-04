export interface NewsAsset {
  public_id: string;
  url: string;
  mime_type: string;
  byte_size: number;
  width: number;
  height: number;
}

export interface NewsContentAsset {
  position: number;
  caption: string | null;
  asset: NewsAsset;
}

export interface News {
  public_id?: string;
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  shortDescription?: string;
  content_html?: string;
  content?: string;
  body?: string;
  description?: string;
  text?: string;
  html?: string;
  meta_title?: string;
  meta_description?: string;
  content_assets?: NewsContentAsset[];
  thumbnail?: string;
  date?: string;
  created_at?: string;
  published_at?: string;
  updated_at?: string;
  createdAt?: string;
  publishedAt?: string;
  author?: string;
}

export interface NewsListResponse {
  items: News[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface NewsDetailResponse extends News {}