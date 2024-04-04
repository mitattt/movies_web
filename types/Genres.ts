export interface Genres {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface FormattedGenre {
  value: number;
  label: string;
}
