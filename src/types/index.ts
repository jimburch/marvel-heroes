export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface HeroResults {
  results: Hero[];
  count: number;
  limit: number;
  offset: number;
  total: number;
}
