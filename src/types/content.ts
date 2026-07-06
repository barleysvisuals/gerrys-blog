export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  country: string;
  region?: string;
  destinationSlug: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  featured?: boolean;
  gallery?: GalleryImage[];
};

export type DestinationFrontmatter = {
  title: string;
  slug: string;
  country: string;
  region?: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  featured?: boolean;
  travelTime?: string;
  duration?: string;
  tips?: string[];
  coordinates?: Coordinates;
  gallery?: GalleryImage[];
};

export type ContentEntry<T> = T & {
  content: string;
};
