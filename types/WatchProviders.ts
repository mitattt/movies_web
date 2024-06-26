export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface ProviderInfo {
  link: string;
  flatrate?: Provider[];
  buy?: Provider[];
  rent?: Provider[];
}

export interface WatchProviderResponse {
  id: number;
  results: {
    [countryCode: string]: ProviderInfo;
  };
}
